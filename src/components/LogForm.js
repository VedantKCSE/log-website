import React, { useState } from 'react';
import { Button, TextField, MenuItem, Box } from '@mui/material';

const categories = ['Learning', 'Courses', 'Project','Self-Development'];

const LogForm = ({ addLog }) => {
  const [log, setLog] = useState('');
  const [category, setCategory] = useState('');
  const [resourceLink, setResourceLink] = useState('');  // New state for resource link

  const handleSubmit = (e) => {
    e.preventDefault();
    const newLog = {
      log,
      category,
      date: new Date().toLocaleString(),
      resourceLink,  // Include resource link in the new log entry
    };
    addLog(newLog);
    setLog('');  // Clear form after submission
    setCategory('');
    setResourceLink('');  // Clear resource link after submission
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
      <TextField
        label="Resource Link (optional)"
        variant="outlined"
        value={resourceLink}
        onChange={(e) => setResourceLink(e.target.value)}
        fullWidth
      />
      <Button type="submit" variant="outlined" color="FFB52E">
        Add Log
      </Button>
    </Box>
  );
};

export default LogForm;
