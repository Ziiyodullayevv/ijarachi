import type { DialogProps } from '@mui/material/Dialog';

import { useBoolean } from 'minimal-shared/hooks';
import { useRef, useState, useEffect, useCallback } from 'react';

import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import { Iconify } from 'src/components/iconify';

import Amenities from './amenities';
import PriceRange from './price-range';
import TypeOfPlace from './type-of-place';
import SelectedComponents from './selected';
import { useFilter } from './context/filter-context';

const FILTER_COMPONENTS = [
  { name: 'Type of place', component: <TypeOfPlace /> },
  { name: 'Price range', component: <PriceRange /> },
  { name: 'Amenities', component: <Amenities /> },
];

export function FilterDialog() {
  const openDialog = useBoolean();
  const descriptionElementRef = useRef<HTMLElement>(null);
  const [scroll, setScroll] = useState<DialogProps['scroll']>('paper');
  const [showShadow, setShowShadow] = useState(false);

  const handleClickOpen = useCallback(
    (scrollType: DialogProps['scroll']) => () => {
      openDialog.onTrue();
      setScroll(scrollType);
    },
    [openDialog, setScroll]
  );

  // Scroll paytida soyani boshqarish
  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;
    setShowShadow(scrollTop + clientHeight < scrollHeight);
  };

  useEffect(() => {
    if (openDialog.value) {
      descriptionElementRef.current?.focus();
    }
  }, [openDialog.value]);

  const { selectedFilters } = useFilter();

  return (
    <>
      <Badge
        sx={{
          '& .MuiBadge-badge': {
            backgroundColor: 'black',
            color: 'white',
            top: 6, // yuqoridan 2px
            right: 6, // o'ngdan 10px
            boxShadow: '0 0 0 2px white',
          },
        }}
        badgeContent={selectedFilters.length > 0 ? selectedFilters.length : undefined}
      >
        <Button
          onClick={handleClickOpen('paper')}
          sx={{
            px: 2,
            borderRadius: '100px',
            minHeight: '40px',
            backgroundColor: 'white',
          }}
          variant="outlined"
          startIcon={<Iconify icon="solar:mi-filter" width={16} />}
          size="medium"
        >
          Filters
        </Button>
      </Badge>

      <Dialog
        sx={{ maxWidth: 568, margin: '0 auto' }}
        open={openDialog.value}
        onClose={openDialog.onFalse}
        scroll={scroll}
        slotProps={{
          paper: {
            sx: {
              borderRadius: '30px',
              position: 'relative',
              overflow: 'hidden',
            },
          },
        }}
      >
        <IconButton
          color="black"
          onClick={openDialog.onFalse}
          size="small"
          sx={{ position: 'absolute', right: 18, top: 18 }}
        >
          <Iconify icon="carbon:close" width={24} />
        </IconButton>

        <DialogTitle
          sx={{
            pb: 2,
            borderBottom: 1,
            borderColor: 'var(--palette-grey-300)',
            display: 'flex',
            justifyContent: 'center',
            fontWeight: 700,
          }}
        >
          Filter
        </DialogTitle>

        <DialogContent
          dividers={scroll === 'paper'}
          onScroll={handleScroll}
          sx={{
            overflowY: 'auto',
            transition: 'box-shadow 0.3s ease',
            paddingY: 4,
          }}
        >
          <SelectedComponents />
          {FILTER_COMPONENTS.map((item, index) => (
            <>
              <Typography sx={{ fontSize: 10, fontWeight: 700, mb: 2 }} variant="h6">
                {item.name}
              </Typography>

              {item.component}

              {selectedFilters && index !== FILTER_COMPONENTS.length - 1 && (
                <Divider sx={{ my: 3 }} />
              )}
            </>
          ))}
        </DialogContent>

        <DialogActions
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            position: 'sticky',
            bottom: 0,
            backgroundColor: 'white',
            boxShadow: showShadow ? '0 -4px 20px rgba(0,0,0,0.15)' : '0 0 0 rgba(0,0,0,0)',
            transition: 'box-shadow 0.3s ease-in-out',
            zIndex: 10,
          }}
        >
          <Button size="large" onClick={openDialog.onFalse}>
            Clear all
          </Button>
          <Button size="large" variant="contained" onClick={openDialog.onFalse}>
            Show 1,000+ places
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
