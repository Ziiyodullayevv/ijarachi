import React, { useRef, useMemo, useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Alert from '@mui/material/Alert';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { loadYandexMaps } from 'src/lib/yandex-maps';

type PickedLocation = {
  address: string;
  coords: [number, number]; // Yandex: [lon, lat]
};

type Props = {
  apiKey: string;
  initialCenter?: [number, number]; // [lon, lat]
  initialZoom?: number;
  onLocationChange?: (loc: PickedLocation | null) => void;
};

function createSafeId(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
}

function prettifyPhoneLikeCoords(coords: [number, number]) {
  return `[${coords[0].toFixed(6)}, ${coords[1].toFixed(6)}] (lon, lat)`;
}

export const YandexLocationPicker: React.FC<Props> = ({
  apiKey,
  initialCenter = [69.2401, 41.2995],
  initialZoom = 11,
  onLocationChange,
}) => {
  // ✅ stable ids (SuggestView bilan muammosiz)
  const idsRef = useRef<{ inputId: string; mapId: string } | null>(null);
  if (!idsRef.current) {
    idsRef.current = { inputId: createSafeId('y-suggest'), mapId: createSafeId('y-map') };
  }
  const { inputId, mapId } = idsRef.current;

  const mapRef = useRef<any>(null);
  const ymapsRef = useRef<any>(null);
  const placemarkRef = useRef<any>(null);
  const suggestRef = useRef<any>(null);

  const [value, setValue] = useState('');
  const [picked, setPicked] = useState<PickedLocation | null>(null);
  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ✅ initialCenter array dependency muammosini yo‘qotish
  const stableCenter = useMemo<[number, number]>(() => initialCenter, [initialCenter]);

  const setPlacemark = useCallback(
    (coords: [number, number], hint?: string) => {
      const ymaps = ymapsRef.current;
      const map = mapRef.current;
      if (!ymaps || !map) return;

      if (!placemarkRef.current) {
        const placemark = new ymaps.Placemark(
          coords,
          { hintContent: hint ?? 'Tanlangan joy' },
          { draggable: true }
        );

        map.geoObjects.add(placemark);
        placemarkRef.current = placemark;

        // Marker sudralganda koordinatani yangilash
        placemark.events.add('dragend', () => {
          const c = placemark.geometry.getCoordinates() as [number, number];
          const next: PickedLocation = {
            address: hint ?? picked?.address ?? value ?? 'Custom point',
            coords: c,
          };
          setPicked(next);
          onLocationChange?.(next);
        });
      } else {
        placemarkRef.current.geometry.setCoordinates(coords);
      }

      map.setCenter(coords, Math.max(map.getZoom(), 14), { duration: 250 });
    },
    [onLocationChange, picked?.address, value]
  );

  const geocodeAndPick = useCallback(
    async (query: string) => {
      const ymaps = ymapsRef.current;
      if (!ymaps) return;

      const q = query.trim();
      if (!q) return;

      try {
        const res = await ymaps.geocode(q);
        const first = res.geoObjects.get(0);

        if (!first) {
          setError('Joy topilmadi. Boshqa so‘z bilan urinib ko‘ring.');
          return;
        }

        const coords = first.geometry.getCoordinates() as [number, number];
        const address = first.getAddressLine?.() || first.properties?.get?.('text') || q;

        const loc: PickedLocation = { address, coords };
        setPicked(loc);
        onLocationChange?.(loc);
        setPlacemark(coords, address);
        setError(null);
      } catch {
        setError('Geocode xatosi. Keyinroq urinib ko‘ring.');
      }
    },
    [onLocationChange, setPlacemark]
  );

  const clearAll = useCallback(() => {
    setValue('');
    setPicked(null);
    onLocationChange?.(null);
    setError(null);

    const map = mapRef.current;
    if (map && placemarkRef.current) {
      map.geoObjects.remove(placemarkRef.current);
      placemarkRef.current = null;
    }
  }, [onLocationChange]);

  useEffect(() => {
    let disposed = false;

    (async () => {
      setLoading(true);
      setError(null);

      try {
        const ymaps = await loadYandexMaps(apiKey, 'uz_UZ');
        if (disposed) return;

        ymapsRef.current = ymaps;
        await new Promise<void>((resolve) => ymaps.ready(resolve));
        if (disposed) return;

        // ✅ DOM elementlar borligini tekshiramiz
        const inputEl = document.getElementById(inputId);
        const mapEl = document.getElementById(mapId);
        if (!inputEl) throw new Error('Suggest input topilmadi.');
        if (!mapEl) throw new Error('Map container topilmadi.');

        // Map init
        mapRef.current = new ymaps.Map(mapId, {
          center: stableCenter,
          zoom: initialZoom,
          controls: ['zoomControl'],
        });

        // Suggest init
        suggestRef.current = new ymaps.SuggestView(inputId);

        // Suggest tanlanganda
        suggestRef.current.events.add('select', (e: any) => {
          const item = e.get('item');
          const display = item?.displayName || item?.value || '';
          if (display) {
            setValue(display);
            void geocodeAndPick(display);
          }
        });

        // Map click select
        mapRef.current.events.add('click', (e: any) => {
          const coords = e.get('coords') as [number, number];
          const loc: PickedLocation = { address: 'Mapdan tanlandi', coords };
          setPicked(loc);
          onLocationChange?.(loc);
          setPlacemark(coords, loc.address);
          setError(null);
        });

        setReady(true);
      } catch (err: any) {
        setReady(false);
        setError(err?.message || 'Yandex Maps yuklanmadi');
      } finally {
        if (!disposed) setLoading(false);
      }
    })();

    return () => {
      disposed = true;

      try {
        if (suggestRef.current) {
          suggestRef.current.destroy?.();
          suggestRef.current = null;
        }
      } catch {
        // ignore
      }

      try {
        if (mapRef.current) {
          mapRef.current.destroy?.();
          mapRef.current = null;
        }
      } catch {
        // ignore
      }

      placemarkRef.current = null;
      ymapsRef.current = null;
    };
  }, [
    apiKey,
    inputId,
    mapId,
    stableCenter,
    initialZoom,
    geocodeAndPick,
    onLocationChange,
    setPlacemark,
  ]);

  return (
    <Stack spacing={2}>
      <Paper variant="outlined">
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} alignItems="center">
          <TextField
            id={inputId}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') void geocodeAndPick(value);
            }}
            placeholder="Manzil kiriting (autocomplete ishlaydi)"
            fullWidth
          />
        </Stack>

        {error && (
          <Box sx={{ mt: 2 }}>
            <Alert severity="error">{error}</Alert>
          </Box>
        )}

        {picked && (
          <>
            <Divider sx={{ my: 2 }} />
            <Typography variant="subtitle2">Tanlangan joy:</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {picked.address}
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              {prettifyPhoneLikeCoords(picked.coords)}
            </Typography>
          </>
        )}
      </Paper>

      <Paper
        variant="outlined"
        sx={{
          borderRadius: 2,
          overflow: 'hidden',
          height: 520,
          bgcolor: 'grey.100',
          position: 'relative',
        }}
      >
        <Box id={mapId} sx={{ width: 1, height: 1 }} />

        {loading && (
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              display: 'grid',
              placeItems: 'center',
              bgcolor: 'rgba(255,255,255,0.6)',
              backdropFilter: 'blur(6px)',
            }}
          >
            <Typography variant="body2">Yandex Mapssss yuklanmoqda…</Typography>
          </Box>
        )}
      </Paper>
    </Stack>
  );
};
