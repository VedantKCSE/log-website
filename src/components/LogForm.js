import React, { useState } from 'react';
import { Button, TextField, MenuItem, Box } from '@mui/material';

const categories = ['Learning', 'Courses', 'Work'];

const LogForm = ({ addLog }) => {
  const [log, setLog] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newLog = {
      log,
      category,
      date: new Date().toLocaleString(),
    };
    addLog(newLog);
    setLog('');  // Clear form after submission
    setCategory('');
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' }, // Stack on small screens, row on larger screens
        gap: 2,
        maxWidth: 800,
        margin: 'auto',
        padding: 2,
        backgroundColor: 'background.paper',
        borderRadius: 1,
      }}
    >
      <TextField
        label="Log Entry"
        variant="outlined"
        value={log}
        onChange={(e) => setLog(e.target.value)}
        fullWidth
        required
      />
      <TextField
        select
        label="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        fullWidth
        required
      >
        {categories.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
      <Button type="submit" variant="contained" color="primary">
        Add Log
      </Button>
    </Box>
  );
};

export default LogForm;
