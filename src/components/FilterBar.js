import React, { useEffect, useState } from 'react';
import { Typography, Paper, Stack, Chip, TextField } from '@mui/material';
import dayjs from 'dayjs';

const FilterBar = ({ selectedCategory, setSelectedCategory, selectedMonth, setSelectedMonth, selectedYear, setSelectedYear, searchTerm, setSearchTerm, logs }) => {
  const [categories, setCategories] = useState([]);
  const [months, setMonths] = useState([]);
  const [years, setYears] = useState([]);

  useEffect(() => {
    const logs = JSON.parse(localStorage.getItem('logs') || '[]');
    const uniqueCategories = ['All', ...new Set(logs.map(log => log.category))];
    const uniqueMonths = ['All', ...new Set(logs.map(log => dayjs(log.date, 'MM/DD/YYYY, hh:mm:ss A').format('MM')))];

    const uniqueYears = ['All', ...new Set(logs.map(log => dayjs(log.date, 'MM/DD/YYYY, hh:mm:ss A').format('YYYY')))];
    setCategories(uniqueCategories);
    setMonths(uniqueMonths);
    setYears(uniqueYears);
  }, [logs]);

  const handleChipClick = (type, value) => {
    if (type === 'category') {
      setSelectedCategory(value);
    } else if (type === 'month') {
      setSelectedMonth(value);
    } else if (type === 'year') {
      setSelectedYear(value);
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        padding: 1,
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid #FFB52E',
        borderRadius: '12px',
        backgroundColor: 'rgba(41, 41, 41, 0.8)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)'
      }}
    >
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
        🔎 Filters
      </Typography>

      {/* Search Input */}
      <TextField
        variant="outlined"
        placeholder="Search logs..."
        sx={{
          '& .MuiOutlinedInput-root': {
            padding: '0px', // Set padding to 0 to reduce height
            height: '30px', // Set desired height
            '& input': {
              padding: '0px 8px', // Adjust input padding for better appearance
            },
          },
        }}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Category Filter */}
      <Typography variant="subtitle1" gutterBottom>
        Category:
      </Typography>
      <Stack direction="row" gap={1} spacing={1} sx={{ flexWrap: 'wrap' }}>
        {categories.map((category) => (
          <Chip
            key={category}
            label={category}
            onClick={() => handleChipClick('category', category)}
            color={selectedCategory === category ? 'primary' : 'default'}
          />
        ))}
      </Stack>

      {/* Month Filter */}
      <Typography variant="subtitle1" gutterBottom>
        Month:
      </Typography>
      <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
        {months.map((month) => (
          <Chip
            key={month}
            label={month === 'All' ? 'All' : dayjs(`2024-${month}-01`).format('MMMM')}
            onClick={() => handleChipClick('month', month)}
            color={selectedMonth === month ? 'primary' : 'default'}
          />
        ))}
      </Stack>

      {/* Year Filter */}
      <Typography variant="subtitle1" gutterBottom>
        Year:
      </Typography>
      <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap' }}>
        {years.map((year) => (
          <Chip
            key={year}
            label={year}
            onClick={() => handleChipClick('year', year)}
            color={selectedYear === year ? 'primary' : 'default'}
          />
        ))}
      </Stack>
    </Paper>
  );
};

export default FilterBar;
