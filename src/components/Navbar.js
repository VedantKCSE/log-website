import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Drawer, List, ListItem, ListItemText, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';

const Navbar = ({ exportToPDF, exportLogs, importLogsHandler }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Detects if the screen is small (mobile)
  const [drawerOpen, setDrawerOpen] = useState(false); // State for drawer

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const drawerItems = (
    <List>
      <ListItem button onClick={exportToPDF}>
        <ListItemText primary="Export to PDF 📄" />
      </ListItem>
      <ListItem button onClick={exportLogs}>
        <ListItemText primary="Export Logs 💾" />
      </ListItem>
      <ListItem button>
        <label htmlFor="import-logs-drawer">
          <ListItemText primary="Import Logs 📥" />
        </label>
        <input
          type="file"
          accept=".json"
          onChange={importLogsHandler}
          style={{ display: 'none' }}
          id="import-logs-drawer"
        />
      </ListItem>
    </List>
  );

  return (
    <AppBar position="static">
      <Toolbar>
        {/* Logo or title */}
        <Typography variant="h5" component="div" sx={{ flexGrow: 1, fontWeight: 'bold', }}>
         🕹️ Activity Logger 🖥️
        </Typography>


        {isMobile ? (
          // Mobile view - Show a menu icon and open drawer
          <>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
              {drawerItems}
            </Drawer>
          </>
        ) : (
          // Desktop view - Show buttons directly in the navbar
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button color="inherit" onClick={exportToPDF}>
              Export to PDF 📄
            </Button>
            <Button color="inherit" onClick={exportLogs}>
              Export Logs 💾
            </Button>
            <input
              type="file"
              accept=".json"
              onChange={importLogsHandler}
              style={{ display: 'none' }}
              id="import-logs-navbar"
            />
            <label htmlFor="import-logs-navbar">
              <Button color="inherit" component="span">
                Import Logs 📥
              </Button>
            </label>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
