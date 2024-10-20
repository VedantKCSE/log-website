import React from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const months = [
  { value: '01', label: 'January' },
  { value: '02', label: 'February' },
  { value: '03', label: 'March' },
  { value: '04', label: 'April' },
  { value: '05', label: 'May' },
  { value: '06', label: 'June' },
  { value: '07', label: 'July' },
  { value: '08', label: 'August' },
  { value: '09', label: 'September' },
  { value: '10', label: 'October' },
  { value: '11', label: 'November' },
  { value: '12', label: 'December' },
];

const FilterBar = ({ selectedCategory, setSelectedCategory, selectedMonth, setSelectedMonth, selectedYear, setSelectedYear }) => {
  return (
    <Box sx={{ 
      display: 'flex', 
      flexWrap: 'wrap', 
      justifyContent: 'center', 
      margin: '20px 0', 
      gap: 2 
    }}>
      <FormControl sx={{ minWidth: 120 }}>
        <InputLabel>Category</InputLabel>
        <Select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Learning">Learning</MenuItem>
          <MenuItem value="Courses">Courses</MenuItem>
          <MenuItem value="Work">Work</MenuItem>
        </Select>
      </FormControl>

      <FormControl sx={{ minWidth: 120 }}>
        <InputLabel>Month</InputLabel>
        <Select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          <MenuItem value="All">All</MenuItem>
          {months.map((month) => (
            <MenuItem key={month.value} value={month.value}>{month.label}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl sx={{ minWidth: 120 }}>
        <InputLabel>Year</InputLabel>
        <Select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          <MenuItem value="All">All</MenuItem>
          {Array.from(new Array(5), (v, i) => new Date().getFullYear() - i).map((year) => (
            <MenuItem key={year} value={year}>{year}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default FilterBar;
