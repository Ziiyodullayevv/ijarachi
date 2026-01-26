import type { BoxProps } from '@mui/material/Box';
import type { ButtonProps } from '@mui/material/Button';

import { useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { useFilter } from './context/filter-context'; // 🔸 Context

export default function PriceRange() {
  const DEFAULT_RANGE = [5, 88];
  const [price, setPrice] = useState<number[]>(DEFAULT_RANGE);
  const [touched, setTouched] = useState(false);

  const { selectedFilters, addFilter, removeFilter } = useFilter();

  const handleChangePrice = useCallback((event: Event, newValue: number | number[]) => {
    setPrice(newValue as number[]);
    setTouched(true);
  }, []);

  const formatPriceRange = (range: number[]) => {
    const [min, max] = range;
    const minPrice = `$${min * 10}`;
    const maxPrice = max >= 88 ? `$${max * 10}+` : `$${max * 10}`;
    return `${minPrice} - ${maxPrice}`;
  };

  // 🔸 qiymat o‘zgarganda filter qo‘shish
  useEffect(() => {
    if (!touched) return;

    const existing = selectedFilters.find((f) => f.id === 'price-range');
    const title = formatPriceRange(price);

    const filter = {
      id: 'price-range',
      title,
      type: 'price',
    };

    if (existing) {
      removeFilter('price-range');
    }
    addFilter(filter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [price, touched]);

  // 🔸 Contextdan o‘chirilsa — sliderni reset qilamiz
  useEffect(() => {
    const exists = selectedFilters.find((f) => f.id === 'price-range');
    if (!exists && touched) {
      setPrice(DEFAULT_RANGE);
      setTouched(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFilters]);

  return (
    <>
      <Typography sx={{ mt: -2, mb: 4 }} variant="body2">
        Trip price, includes all fees
      </Typography>

      <Slider
        min={5}
        max={88}
        step={1}
        value={price}
        onChange={handleChangePrice}
        getAriaValueText={() => ''}
        valueLabelDisplay="auto"
      />

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <PriceGroup component="span">
          <Typography variant="caption">Minimum</Typography>
          <CustomButton disableRipple size="large" variant="outlined">
            {`$${price[0] * 10}`}
          </CustomButton>
        </PriceGroup>

        <PriceGroup component="span">
          <Typography variant="caption">Maximum</Typography>
          <CustomButton disableRipple size="large" variant="outlined">
            {price[1] >= 88 ? `$${price[1] * 10}+` : `$${price[1] * 10}`}
          </CustomButton>
        </PriceGroup>
      </Box>
    </>
  );
}

const PriceGroup = styled(Box)<BoxProps>({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 1,
});

const CustomButton = styled(Button)<ButtonProps>({
  borderRadius: '100px',
  cursor: 'text',
  minWidth: '80px',
});
