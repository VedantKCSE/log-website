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

      {/* Pass necessary props to Navbar */}
      <Navbar
        exportToPDF={() => exportToPDF(filteredLogs, selectedCategory)}
        exportLogs={() => exportLogs(logs)}
        importLogsHandler={handleImportLogs}
      />

      {/* Button to open the modal */}
      <Box sx={{
        // right bottom css
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

      {/* Modal for the LogForm */}
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

      <FilterBar
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
      />

      <LogList logs={filteredLogs} />
    </ThemeProvider>
  );
}

export default App;
