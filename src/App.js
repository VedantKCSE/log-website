import React, { useState, useEffect } from 'react';
import { ThemeProvider, CssBaseline, Button, Box, useMediaQuery, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import Navbar from './components/Navbar';
import LogForm from './components/LogForm';
import LogList from './components/LogList';
import FilterBar from './components/FilterBar';
import ActivityChart from './components/ActivityChart';
import { darkTheme } from './styles/theme';
import { exportToPDF, exportLogs, importLogs } from './utils/exportUtils';
import 'chart.js/auto';

function App() {
  const [logs, setLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedMonth, setSelectedMonth] = useState('All');
  const [selectedYear, setSelectedYear] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [openLogForm, setOpenLogForm] = useState(false);
  const [showChart, setShowChart] = useState(false);
  const isDesktop = useMediaQuery('(min-width:600px)');
  const addLog = (newLog) => {
    const updatedLogs = [newLog, ...logs];
    setLogs(updatedLogs);
    localStorage.setItem('logs', JSON.stringify(updatedLogs));
    setOpenLogForm(false); // Close modal after log is added
  };

  useEffect(() => {
    const storedLogs = localStorage.getItem('logs');
    if (storedLogs) {
      setLogs(JSON.parse(storedLogs));
    }
  }, []);

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
    if (searchTerm) {
      filtered = filtered.filter(log => log.log.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    setFilteredLogs(filtered);
  }, [selectedCategory, selectedMonth, selectedYear, logs, searchTerm]);

  const handleImportLogs = (e) => {
    importLogs(e, setLogs, logs);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Navbar
        exportToPDF={() => exportToPDF(filteredLogs, selectedCategory)}
        exportLogs={() => exportLogs(logs)}
        importLogsHandler={handleImportLogs}
      />

      <Box sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: '250px 1fr' },
        gridGap: '20px',
        height: isDesktop ? 'calc(100vh - 64px)' : 'auto',
        padding: '20px',
        overflow: 'hidden',
      }}>
        <Box sx={{ height: { xs: 'auto', md: '100%' }, overflowY: 'auto' }}>
          {isDesktop ? <>
            <Box sx={{ border: '1px solid #FFB52E', borderRadius: '12px', padding: 1, mb: 2 }}>
              <ActivityChart logs={filteredLogs} />
            </Box>
            <FilterBar
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedMonth={selectedMonth}
              setSelectedMonth={setSelectedMonth}
              selectedYear={selectedYear}
              setSelectedYear={setSelectedYear}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              logs={logs} 
            /></> : (
              <Button
                variant="outlined"
                onClick={() => setShowChart(prev => !prev)}
                sx={{ mb: 2, backgroundColor:'black' ,width:'100%'}}
              >
                {showChart ? "Hide Activity Chart & Filter" : "Show Activity Chart & Filter"}
              </Button>
          )}

          {showChart && (
            <Box sx={{ border: '1px solid #FFB52E', borderRadius: '12px', padding: 1, mb: 2 }}>
              <ActivityChart logs={filteredLogs} />
            </Box>
          )}

          {showChart && (
            <FilterBar
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedMonth={selectedMonth}
              setSelectedMonth={setSelectedMonth}
              selectedYear={selectedYear}
              setSelectedYear={setSelectedYear}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              logs={logs} 
            />
          )}
        </Box>

        <Box sx={{ height: { xs: 'auto', md: '100%' }, overflowY: 'auto' }}>
          <LogList logs={filteredLogs} />
        </Box>
      </Box>

      
      {/* Add new activity button */}
      <Box sx={{
        position: 'fixed',
        bottom: 16,
        right: 16,
      }}>
        <Button style={{
          color: 'black',
          backgroundColor: 'black',
          width: '70px',
          height: '70px',
          fontSize: '50px',
          fontWeight: 'bold',
          borderRadius: '50%'
        }} variant="outlined" color="secondary" onClick={() => setOpenLogForm(true)}>
          <div style={{ color: 'transparent', textShadow: '0 0 0 #FFB52E', fontSize: '50px', zIndex: 9999999 }}>
            ➕
          </div>
        </Button>
      </Box>

      <Dialog open={openLogForm} onClose={() => setOpenLogForm(false)}>
        <DialogTitle>Add a new Activity 🕹️</DialogTitle>
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
