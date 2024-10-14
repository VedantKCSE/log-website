import React, { useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from './components/Navbar';
import LogForm from './components/LogForm';
import LogList from './components/LogList';
import FilterBar from './components/FilterBar';
import { Button, Box } from '@mui/material';
import { jsPDF } from 'jspdf';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#90caf9' }, // Blue color
    secondary: { main: '#f48fb1' },
    background: { default: '#121212', paper: '#1e1e1e' },
    text: { primary: '#ffffff', secondary: '#b0b0b0' },
  },
});

function App() {
  const [logs, setLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedMonth, setSelectedMonth] = useState('All');
  const [selectedYear, setSelectedYear] = useState('All');

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

  // Export logs to PDF with improved formatting
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.setTextColor(0, 0, 255); // Primary color (blue)
    doc.text('Activity Logs', 105, 20, { align: 'center' });
    doc.setFontSize(12);
    doc.setTextColor(100); // Gray subtitle color
    doc.text(`Category: ${selectedCategory}`, 105, 30, { align: 'center' });
    doc.setFontSize(12);
    let yPosition = 40;

    if (filteredLogs.length === 0) {
        doc.text('No logs available to display.', 10, yPosition);
    } else {
        filteredLogs.forEach((log) => {
            const logText = `-> ${log.log}  ~   ${log.date}`;
            const logTextWidth = doc.getTextWidth(logText); // Get the width of the log text
            const pageWidth = doc.internal.pageSize.getWidth(); // Get the total page width
            const categoryX = pageWidth - 10 - doc.getTextWidth(log.category); // Calculate x position for category
            
            doc.setTextColor(0, 0, 255); // Blue for log and date
            doc.text(logText, 10, yPosition);
            doc.setTextColor(255, 0, 0); // Red for category
            doc.text(log.category, categoryX, yPosition); // Place category inline at the end
            yPosition += 6; // Adjust spacing for the next log
        });
    }

    doc.save('logs.pdf');
};


  // Export logs as JSON
  const exportLogs = () => {
    const jsonLogs = JSON.stringify(logs);
    const blob = new Blob([jsonLogs], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'logs.json';
    link.click();
  };

  // Import logs from JSON
  const importLogs = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const importedLogs = JSON.parse(e.target.result);
        const updatedLogs = [...importedLogs, ...logs]; // Append imported logs to existing logs
        setLogs(updatedLogs);
        localStorage.setItem('logs', JSON.stringify(updatedLogs));
      };
      reader.readAsText(file);
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Navbar />
      <LogForm addLog={addLog} />
      <FilterBar
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
      />

      {/* Export to PDF Button */}
      <Box sx={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
        <Button variant="contained" onClick={exportToPDF} sx={{ marginBottom: '20px', marginRight: '10px' }}>
          Export to PDF
        </Button>
        <Button variant="contained" onClick={exportLogs} sx={{ marginBottom: '20px', marginRight: '10px' }}>
          Export Logs
        </Button>
        <input
          type="file"
          accept=".json"
          onChange={importLogs}
          style={{ display: 'none' }}
          id="import-logs"
        />
        <label htmlFor="import-logs">
          <Button variant="contained" component="span" sx={{ marginBottom: '20px' }}>
            Import Logs
          </Button>
        </label>
      </Box>

      <LogList logs={filteredLogs} />
    </ThemeProvider>
  );
}

export default App;
