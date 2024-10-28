import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemText, Paper, Typography, Button, Box, Divider } from '@mui/material';

const LogList = () => {
  const [logs, setLogs] = useState([]);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);

  useEffect(() => {
    // Retrieve logs from local storage
    const storedLogs = JSON.parse(localStorage.getItem('logs')) || [];
    setLogs(storedLogs);
    calculateStreak(storedLogs);
  }, []);

  const calculateStreak = (logs) => {
    // Create a Set to hold unique dates from logs
    const uniqueDates = new Set(logs.map(log => new Date(log.date).toLocaleDateString()));
    const sortedDates = Array.from(uniqueDates).sort((a, b) => new Date(b) - new Date(a));

    let currentStreak = 0;
    let previousDate = null;

    // Iterate through the sorted unique dates to calculate the current streak
    for (let i = 0; i < sortedDates.length; i++) {
      const date = new Date(sortedDates[i]);

      // Check if the previous date is one day before the current date
      if (previousDate === null || previousDate.getTime() === date.getTime() + 86400000) {
        currentStreak++; // Increment current streak
      } else {
        break; // Streak is broken
      }

      previousDate = date; // Update the previous date to the current date
    }

    // Retrieve the stored maximum streak from localStorage
    const storedMaxStreak = parseInt(localStorage.getItem('maxStreak')) || 0;

    // Update the maximum streak if the current streak exceeds the previous max streak
    if (currentStreak > storedMaxStreak) {
      localStorage.setItem('maxStreak', currentStreak); // Update max streak in localStorage
      setMaxStreak(currentStreak); // Update max streak state
    } else {
      setMaxStreak(storedMaxStreak); // Keep the previous max streak
    }

    // Set the current streak in state
    setStreak(currentStreak);
  };


  return (
    <Paper sx={{ height: '100%', background: '#121212' }}>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            position: 'sticky',
            top: 0,
            backgroundColor: 'rgba(41, 41, 41, 0.8)',
            backdropFilter: 'blur(10px)',
            padding: '16px',
            borderRadius: '12px',
            zIndex: 1,
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
            border: '1px solid #FFB52E',
          }}
        >
          <span>Your Activity 🎯</span>
          <span>
            {streak > 0 && <span> {streak} 🔥 </span>}
          </span>
        </Box>
      </Typography>
      <Typography
        align="center" // Center the text
        sx={{
          color: 'white', // Change color to match theme
          fontStyle: 'italic', // Italicize for emphasis
          marginY: 2, // Add vertical margin for spacing
        }}
      >
        Your Max Streak: {maxStreak} 🔥
      </Typography>

      <List>
        {logs.length === 0 ? (
          <Typography>No Activity added yet 🥺</Typography>
        ) : (
          logs.map((log, index) => (
            <React.Fragment key={index}>
              <ListItem>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: '100%',
                  }}
                >
                  <ListItemText
                    primary={log.log}
                    secondary={`🕹️ ${log.category} | ⌚ ${log.date}`}
                  />
                  {log.resourceLink && (
                    <Button
                      variant="outlined"
                      color='secondary'
                      href={log.resourceLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        ml: 2,
                        borderRadius: '50%',
                        backgroundColor: 'black',
                        minWidth: '45px',
                        minHeight: '45px',
                        padding: 0,
                        color: 'white',
                        fontSize: '1.5rem',
                        '&:hover': {
                          backgroundColor: 'black',
                        },
                      }}
                    >
                      🔗
                    </Button>
                  )}
                </Box>
              </ListItem>
              {index < logs.length - 1 && (
                <Divider sx={{ borderColor: '#FFB52E' }} />
              )}
            </React.Fragment>
          ))
        )}
      </List>
    </Paper>
  );
};

export default LogList;
