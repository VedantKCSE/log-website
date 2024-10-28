import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, Typography, Paper } from '@mui/material';

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
    <Paper
      elevation={3}
      sx={{
        padding: 2,
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid #FFB52E',
        borderRadius: '12px',
        backgroundColor: 'rgba(41, 41, 41, 0.8)', // Semi-transparent background
        backdropFilter: 'blur(10px)',  // Glassmorphism blur effect
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)' // Subtle shadow for depth
      }}
    >
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
        🔎 Filters
      </Typography>
      <FormControl sx={{ minWidth: 120, marginBottom: 2 }}>
        <InputLabel>Category</InputLabel>
        <Select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Learning">Learning</MenuItem>
          <MenuItem value="Courses">Courses</MenuItem>
          <MenuItem value="Project">Project</MenuItem>
          <MenuItem value="Self-Development">Self-Development</MenuItem>
        </Select>
      </FormControl>

      <FormControl sx={{ minWidth: 120, marginBottom: 2 }}>
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
    </Paper>
  );
};

export default FilterBar;
