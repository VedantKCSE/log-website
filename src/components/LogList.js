import React from 'react';
import { List, ListItem, ListItemText, Paper, Typography } from '@mui/material';

const LogList = ({ logs }) => {
  return (
    <Paper
      sx={{
        margin: '20px auto',
        padding: 3,
        maxWidth: 600,
        borderRadius: 2,
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)'
      }}>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', letterSpacing: '0.03em' }}>
        Logs
      </Typography>
      <List>
        {logs.length === 0 ? (
          <Typography>No logs added yet</Typography>
        ) : (
          logs.map((log, index) => (
            <ListItem
              key={index}
              sx={{
                padding: 2,
                borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
                ':last-child': { borderBottom: 'none' }
              }}>
              <ListItemText
                primary={log.log}
                secondary={`${log.category} | ${log.date}`}
                primaryTypographyProps={{ fontWeight: '500', color: 'white' }}
                secondaryTypographyProps={{ color: 'rgba(255, 255, 255, 0.6)' }}
              />
            </ListItem>
          ))
        )}
      </List>
    </Paper>
  );
};

export default LogList;
