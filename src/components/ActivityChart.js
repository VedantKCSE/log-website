// src/components/ActivityChart.js

import React from 'react';
import { Box, Typography, Divider } from '@mui/material';
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

const ActivityChart = ({ logs }) => {
  const activityCounts = countActivitiesByLast7Dates(logs);
  const dateLabels = Object.keys(activityCounts).reverse(); // Reverse the date labels to start from the earliest
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
      },
    ],
  };

  const monthlyActivityCount = getMonthlyActivityCount(logs);

  return (
    <Box>
      {/* Total Activity Count */}
      <Typography variant="h6" color="primary" align="center" sx={{ fontWeight: 'bold', mb: 0.5 }}>
        Monthly Acts: {monthlyActivityCount}
      </Typography>
      <Divider sx={{ borderColor: '#FFB52E' }} />
      {/* Activity Counts by Category */}
      <Box sx={{ mt: 0.5, ml: 0.5 }}>
        {Object.entries(countActivitiesByCategory(logs)).map(([category, count]) => (
          <Typography key={category} color="#FFFFFF" sx={{ fontWeight: 'medium' }}>
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
            },
            elements: {
              line: {
                tension: 0.1, // Smoothing the line
                borderWidth: 2,
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

export default ActivityChart;
