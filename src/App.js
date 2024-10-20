import React, { useState, useEffect } from 'react';
import { ThemeProvider, CssBaseline, Button, Box, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import Navbar from './components/Navbar';
import LogForm from './components/LogForm';
import LogList from './components/LogList';
import FilterBar from './components/FilterBar';
import { darkTheme } from './styles/theme';
import { exportToPDF, exportLogs, importLogs } from './utils/exportUtils';

function App() {
  const [logs, setLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedMonth, setSelectedMonth] = useState('All');
  const [selectedYear, setSelectedYear] = useState('All');
  const [openLogForm, setOpenLogForm] = useState(false); // Modal control state

  useEffect(() => {
    const storedLogs = localStorage.getItem('logs');
    if (storedLogs) {
      setLogs(JSON.parse(storedLogs));
    }
  }, []);

  const addLog = (newLog) => {
    const updatedLogs = [newLog, ...logs];
    setLogs(updatedLogs);
    localStorage.setItem('logs', JSON.stringify(updatedLogs));
    setOpenLogForm(false); // Close modal after log is added
  };

  useEffect(() => {
    let filtered = logs;

    if (selectedCategory !== 'All') {
      filtered = filtered.filter((log) => log.category === selectedCategory);
    }
    if (selectedMonth !== 'All') {
      filtered = filtered.filter((log) => new Date(log.date).getMonth() + 1 === parseInt(selectedMonth));
    }
    if (selectedYear !== 'All') {
      filtered = filtered.filter((log) => new Date(log.date).getFullYear() === parseInt(selectedYear));
    }

    setFilteredLogs(filtered);
  }, [selectedCategory, selectedMonth, selectedYear, logs]);

  const handleImportLogs = (e) => {
    importLogs(e, setLogs, logs);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Navbar />

      {/* Grid layout for FilterBar and LogList */}
      <Box sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: '250px 1fr' }, // Stacked on small screens, sidebar on larger screens
        gridTemplateRows: { xs: 'auto 1fr', md: '1fr' }, // Auto height for FilterBar on mobile, full height on larger screens
        gridGap: '20px',
        height: 'calc(100vh - 64px)', // Full screen height minus navbar
        padding: '20px',
        overflow: 'hidden', // Prevent overflow when content is too large
      }}>
        {/* Sidebar FilterBar with flexible height */}
        <Box sx={{
          height: { xs: 'auto', md: '100%' }, // Auto height on mobile, full height on larger screens
          overflowY: 'auto',
        }}>
          <FilterBar
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedMonth={selectedMonth}
            setSelectedMonth={setSelectedMonth}
            selectedYear={selectedYear}
            setSelectedYear={setSelectedYear}
          />
        </Box>

        {/* LogList should occupy remaining space */}
        <Box sx={{
          height: { xs: 'auto', md: '100%' }, // Auto on mobile, full height on larger screens
          overflowY: 'auto',
        }}>
          <LogList logs={filteredLogs} />
        </Box>
      </Box>

      <Box sx={{
        position: 'fixed',
        bottom: 16,
        right: 16,
      }}>
        <Button style={{
          color: 'black',
          backgroundColor: 'white',
          width: '70px',
          height: '70px',
          fontSize: '50px',
          fontWeight: 'bold',
          borderRadius: '50%'
        }} variant="contained" color="primary" onClick={() => setOpenLogForm(true)}>
          +
        </Button>
      </Box>

      <Dialog open={openLogForm} onClose={() => setOpenLogForm(false)}>
        <DialogTitle>Add a new Log</DialogTitle>
        <DialogContent>
          <LogForm addLog={addLog} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenLogForm(false)} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
}

export default App;
