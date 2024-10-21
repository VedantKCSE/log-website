import React from 'react';
import { List, ListItem, ListItemText, Paper, Typography, Button, Box, Divider } from '@mui/material';

const LogList = ({ logs }) => {
  return (
    <Paper sx={{ padding: 3, height: '100%' }}>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
        Your Activity 🎯
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
                      borderRadius: '50%',        // Circular shape
                      backgroundColor: 'black',    // Black background
                      minWidth: '45px',            // Ensures it's a perfect circle
                      minHeight: '45px',
                      padding: 0,                  // Remove default padding for a compact button
                      color: 'white',              // White text (or emoji) on black
                      fontSize: '1.5rem',          // Adjust text size (increase font size)
                      '&:hover': {
                        backgroundColor: 'black',  // Keep background black on hover
                      },
                    }}
                  >
                    🔗
                  </Button>
                  )}
                </Box>
              </ListItem>
              {/* Divider to separate each log */}
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
