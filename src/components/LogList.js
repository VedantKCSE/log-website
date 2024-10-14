import React from 'react';
import { List, ListItem, ListItemText, Paper, Typography } from '@mui/material';

const LogList = ({ logs }) => {
  return (
    <Paper sx={{ margin: '20px auto', padding: 2, maxWidth: 600 }}>
      <Typography variant="h5" gutterBottom>
        Logs
      </Typography>
      <List>
        {logs.length === 0 ? (
          <Typography>No logs added yet</Typography>
        ) : (
          logs.map((log, index) => (
            <ListItem key={index}>
              <ListItemText
                primary={log.log}
                secondary={`${log.category} | ${log.date}`}
              />
            </ListItem>
          ))
        )}
      </List>
    </Paper>
  );
};

export default LogList;
