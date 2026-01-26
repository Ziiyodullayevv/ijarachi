import * as React from 'react';
import { Icon } from '@iconify/react';

import { Box, Stack, InputBase, IconButton, Typography, ClickAwayListener } from '@mui/material';

import { Iconify } from 'src/components/iconify';

type MUIEditablePriceProps = {
  /** Controlled qiymat (ixtiyoriy). Berilmasa uncontrolled ishlaydi. */
  value?: number;
  /** Valyuta belgisi */
  currencySymbol?: string;
  /** Qiymat o'zgarganda callback */
  onChange?: (next: number) => void;

  /** Minimum qiymat (default: 10) */
  min?: number;
  /** Maksimum qiymat (default: 10000) */
  max?: number;

  disabled?: boolean;
};

const digitsOnly = (s: string) => s.replace(/[^\d]/g, '');

/**
 * Qoidalar:
 * - Faqat raqam
 * - "00000" -> "" (faqat nol(lar) bo'lishi mumkin emas)
 * - Leading zero kesiladi: "00050" -> "50"
 * - max dan katta yozib bo'lmaydi: "10001" -> "10000"
 */
const normalizeDigits = (raw: string, max: number) => {
  const d = digitsOnly(raw);

  if (d === '') return '';
  if (/^0+$/.test(d)) return ''; // faqat nol(lar) bo'lsa bo'sh

  const noLeadingZeros = d.replace(/^0+(?=\d)/, '');
  const num = Number(noLeadingZeros);

  if (Number.isFinite(num) && num > max) return String(max);
  return noLeadingZeros;
};

const toInt = (s: string) => {
  if (!s) return 0;
  const n = Number(s);
  return Number.isFinite(n) ? Math.max(0, Math.trunc(n)) : 0;
};

const formatMoneyInt = (n: number) =>
  new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(n);

const getErrorText = (v: number, min: number) => {
  if (v === 0) return `Minimum ${min}$ dan boshlab kiritiladi`;
  if (v < min) return `Minimum ${min}$ kiritish mumkin`;
  return '';
};

export function MUIEditablePrice({
  value,
  currencySymbol = '$',
  onChange,
  min = 10,
  max = 10000,
  disabled = false,
}: MUIEditablePriceProps) {
  const isControlled = typeof value === 'number';
  const [internal, setInternal] = React.useState<number>(100);

  const currentValue = isControlled ? (value ?? 0) : internal;

  const [editing, setEditing] = React.useState(false);
  const [draft, setDraft] = React.useState<string>('');

  const inputRef = React.useRef<HTMLInputElement | null>(null);

  // Error faqat min uchun: max typing vaqtida bloklanadi
  const errorText = getErrorText(currentValue, min);
  const hasError = Boolean(errorText);

  const openEdit = () => {
    if (disabled) return;
    // 0 bo'lsa bo'shdan boshlasin
    setDraft(currentValue === 0 ? '' : String(currentValue));
    setEditing(true);
  };

  const commit = () => {
    // draft allaqachon normalize qilingan bo'ladi
    const next = toInt(draft);

    if (!isControlled) setInternal(next);
    onChange?.(next);

    setEditing(false);
  };

  const cancel = () => {
    setDraft(currentValue === 0 ? '' : String(currentValue));
    setEditing(false);
  };

  React.useEffect(() => {
    if (!editing) return;
    requestAnimationFrame(() => {
      inputRef.current?.focus();
      const len = inputRef.current?.value.length ?? 0;
      inputRef.current?.setSelectionRange(len, len);
    });
  }, [editing]);

  const handleDraftChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDraft(normalizeDigits(e.target.value, max));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      commit();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      cancel();
    }
  };

  const fontSize = 96;

  return (
    <Box sx={{ display: 'inline-block' }}>
      <ClickAwayListener onClickAway={() => editing && commit()}>
        <Box
          sx={{
            display: 'inline-flex',
            flexDirection: 'column',
            alignItems: 'flex-center',
            ...(disabled && { opacity: 0.6, pointerEvents: 'none' }),
          }}
        >
          <Stack direction="row" alignItems="center" spacing={1.5}>
            {/* $ belgisi hech qachon o'zgarmaydi */}
            <Typography sx={{ fontSize, fontWeight: 800, lineHeight: 1 }}>
              {currencySymbol}
            </Typography>

            {/* qiymat */}
            {!editing ? (
              <Typography
                onClick={openEdit}
                sx={{
                  fontSize,
                  fontWeight: 800,
                  lineHeight: 1,
                  letterSpacing: 0.5,
                  cursor: 'pointer',
                }}
              >
                {formatMoneyInt(currentValue)}
              </Typography>
            ) : (
              <InputBase
                inputRef={inputRef}
                value={draft}
                onChange={handleDraftChange}
                onKeyDown={handleKeyDown}
                onBlur={commit}
                placeholder="0"
                inputMode="numeric"
                sx={{
                  fontSize,
                  fontWeight: 800,
                  letterSpacing: 0.5,
                  '& input': { padding: 0, fontSize, height: '80px' },
                }}
              />
            )}

            {/* icon */}
            {!editing ? (
              <IconButton
                aria-label="Edit price"
                onClick={openEdit}
                size="large"
                sx={{
                  border: '1px solid',
                  borderColor: 'divider',
                  ml: 1,
                }}
              >
                <Icon icon="mdi:pencil" width={22} height={22} />
              </IconButton>
            ) : null}
          </Stack>

          {/* pastki error text */}
          {hasError && (
            <Typography
              variant="caption"
              color="error"
              sx={{ mt: 1, display: 'flex', alignItems: 'center', gap: '5px' }}
            >
              <Iconify icon="custom-icon:info" width={18} />
              {errorText}
            </Typography>
          )}
        </Box>
      </ClickAwayListener>
    </Box>
  );
}
