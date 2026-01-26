import type { ReactNode } from 'react';

import { useState, useContext, createContext } from 'react';

export type FilterItem = {
  id: string;
  title: string;
  type: string;
  icon?: React.ReactNode;
};

type FilterContextType = {
  selectedFilters: FilterItem[];
  addFilter: (filter: FilterItem) => void;
  removeFilter: (id: string, type?: string) => void;
  toggleFilter: (filter: FilterItem) => void;
  clearFilters: () => void;
};

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider = ({ children }: { children: ReactNode }) => {
  const [selectedFilters, setSelectedFilters] = useState<FilterItem[]>([]);

  const addFilter = (filter: FilterItem) => {
    setSelectedFilters((prev) => [
      ...prev.filter((f) => !(f.id === filter.id && f.type === filter.type)),
      filter,
    ]);
  };

  const removeFilter = (id: string, type?: string) => {
    setSelectedFilters((prev) =>
      prev.filter((f) => !(f.id === id && (type ? f.type === type : true)))
    );
  };

  // 🔹 toggleFilter: bosilganida qo‘shadi yoki o‘chiradi
  const toggleFilter = (filter: FilterItem) => {
    setSelectedFilters((prev) => {
      const exists = prev.some((f) => f.id === filter.id && f.type === filter.type);
      return exists
        ? prev.filter((f) => !(f.id === filter.id && f.type === filter.type))
        : [...prev, filter];
    });
  };

  const clearFilters = () => setSelectedFilters([]);

  return (
    <FilterContext.Provider
      value={{
        selectedFilters,
        addFilter,
        removeFilter,
        toggleFilter,
        clearFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFilter = () => {
  const context = useContext(FilterContext);
  if (!context) throw new Error('useFilter must be used within FilterProvider');
  return context;
};
