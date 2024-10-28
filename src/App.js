import React, { useState, useEffect } from 'react';
import { ThemeProvider, CssBaseline, Button, Box, Dialog, DialogTitle, DialogContent, DialogActions, Typography, Divider } from '@mui/material';
import Navbar from './components/Navbar';
import LogForm from './components/LogForm';
import LogList from './components/LogList';
import FilterBar from './components/FilterBar';
import { darkTheme } from './styles/theme';
import { exportToPDF, exportLogs, importLogs } from './utils/exportUtils';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

// Helper function to count activities per day for the last 7 actual dates
const countActivitiesByLast7Dates = (logs) => {
  const counts = {};
  const today = new Date();
  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setDate(today.getDate() - 7);

  // Initialize counts for the last 7 dates
  for (let i = 0; i <= 6; i++) {
    const date = new Date();
    date.setDate(today.getDate() - i);
    const dateString = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    counts[dateString] = 0;
  }

  // Count activities for the last 7 dates
  logs.forEach((log) => {
    const logDate = new Date(log.date);
    if (logDate >= sevenDaysAgo && logDate <= today) {
      const dateString = logDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      if (counts[dateString] !== undefined) {
        counts[dateString]++;
      }
    }
  });

  return counts;
};


// Helper function to get the total activities of the current month
const getMonthlyActivityCount = (logs) => {
  const currentMonth = new Date().getMonth(); // Current month
  return logs.filter(log => new Date(log.date).getMonth() === currentMonth).length;
};

const ActivityChart = ({ logs }) => {
  const activityCounts = countActivitiesByLast7Dates(logs);
  const dateLabels = Object.keys(activityCounts).reverse();  // Reverse the date labels to start from the earliest
  const dataValues = Object.values(activityCounts).reverse(); // Reverse the data values to match the dates

  const chartData = {
    labels: dateLabels,
    datasets: [
      {
        label: 'Activities Count',
        data: dataValues,
        borderColor: '#FFB52E',
        backgroundColor: 'rgba(255, 181, 46, 0.2)',
        fill: true,
        tension: 0.3,
      },
    ],
  };

  const monthlyActivityCount = getMonthlyActivityCount(logs);

  return (
    <Box>
      {/* Total Activity Count */}
      <Typography
        variant="h6" color="primary" align="center" sx={{ fontWeight: 'bold', mb: 0.5 }}
      >
        Monthly Acts: {monthlyActivityCount}
      </Typography>
      <Divider sx={{ borderColor: '#FFB52E' }} />
      {/* Activity Counts by Category */}
      <Box sx={{ mt: 0.5 }}>
        {Object.entries(countActivitiesByCategory(logs)).map(([category, count]) => (
          <Typography key={category} align="center" color="#FFFFFF" sx={{ fontWeight: 'medium' }}>
            {category}: {count}
          </Typography>
        ))}
      </Box>
      {/* Line Chart */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <Line
          data={chartData}
          options={{
            responsive: true,
            scales: {
              x: {
                ticks: {
                  display: false, // Display date labels on the x-axis
                },
              },
              y: {
                beginAtZero: true,
                ticks: {
                  display: false, // Display y-axis ticks
                },
              },
            }, elements: {
              line: {
                tension: 0.4, // Smoothing the line
                borderWidth: 2,
                borderColor: 'blue', // Line color
                fill: true, // Enable filling the area below the line
              },
              point: {
                radius: 0.5, // Hides points on the line
              },
            },
            plugins: {
              legend: {
                display: false,
              },
            },
          }}
        />
      </Box>
    </Box>
  );
};



// Helper function to count activities by category
const countActivitiesByCategory = (logs) => {
  const counts = {};
  logs.forEach((log) => {
    if (!counts[log.category]) {
      counts[log.category] = 0;
    }
    counts[log.category]++;
  });
  return counts;
};


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
      <Navbar
        exportToPDF={() => exportToPDF(filteredLogs, selectedCategory)}
        exportLogs={() => exportLogs(logs)}
        importLogsHandler={handleImportLogs}
      />

      {/* Grid layout for FilterBar, LogList, and Line Chart */}
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
          {/* Activity Chart added below the FilterBar */}
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
          <div style={{ color: 'transparent', textShadow: '0 0 0 #FFB52E', fontSize: '50px' }}>
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
