import React from 'react';

import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';

import { TABS } from './data';
import { useFilter } from './context/filter-context'; // FilterContext yo'li

export default function TypeOfPlace() {
  const { selectedFilters, addFilter, clearFilters } = useFilter();

  // Tanlangan filter faqat bitta bo'lishi kerak
  const selectedFilter = selectedFilters.find((f) => f.type === 'typeOfPlace');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    // Avvalgi tanlanganni o'chiramiz
    clearFilters(); // yoki faqat typeOfPlace filterni o'chirish
    // Yangi filter qo'shamiz
    const tabFilter = TABS.find((tab) => tab.value === newValue);
    if (tabFilter) {
      addFilter({ id: tabFilter.value, title: tabFilter.label, type: 'typeOfPlace' });
    }
  };

  return (
    <Box>
      <Tabs
        textColor="inherit"
        variant="fullWidth"
        indicatorColor="custom"
        value={selectedFilter?.id || 'one'}
        onChange={handleChange}
        sx={{
          borderRadius: 2,
          minHeight: '54px',
          border: '1px solid var(--palette-grey-300)',
          backgroundColor: 'transparent',
          '& .Mui-selected': {
            fontWeight: 'bold !important',
          },
          '& .MuiTabs-flexContainer': {
            px: '5px',
          },
        }}
        slotProps={{
          indicator: {
            sx: {
              '&::before': {
                content: '""',
                display: 'inline-block',
                width: '100%',
                height: '80%',
                borderRadius: '12px',
                backgroundColor: 'var(--palette-grey-200)',
                boxShadow: 'none',
                transition: 'all 0.3s ease',
                border: '2px solid black',
              },
            },
          },
        }}
      >
        {TABS.map((item) => (
          <Tab
            key={item.value}
            sx={{
              fontWeight: 'bold',
              color: selectedFilter?.id === item.value ? 'white' : 'black',
              transition: 'all 0.3s',
              position: 'relative',
            }}
            value={item.value}
            label={item.label}
          />
        ))}
      </Tabs>
    </Box>
  );
}
