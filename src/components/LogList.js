import React from 'react';
import { List, ListItem, ListItemText, Paper, Typography } from '@mui/material';

const LogList = ({ logs }) => {
  return (
    <Paper sx={{ padding: 3, height: '100%' }}>
      <Typography variant="h5" gutterBottom sx={{fontWeight: 'bold' }}>
        Your Activity 🎯
      </Typography>
      <List>
        {logs.length === 0 ? (
          <Typography>No Activity added yet 🥺</Typography>
        ) : (
          logs.map((log, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={log.log}
                secondary={`🕹️ ${log.category} | ⌚ ${log.date}`}
              />
            </ListItem>
          ))
        )}
      </List>
    </Paper>
  );
};

export default LogList;
