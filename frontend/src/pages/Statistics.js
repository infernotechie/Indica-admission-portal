import React, { useEffect, useState, useMemo } from 'react';
import {
  Container,
  Typography,
  Paper,
  Box,
  CircularProgress,
  Button,
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import axios from 'axios';
import { motion } from 'framer-motion';

const LIGHT = {
  background: '#F9FAFB',
  card: '#fff',
  bar: '#1E40AF',
  pie: ['#1E40AF', '#F59E0B', '#81C784', '#FF6F91', '#D65DB1', '#FFC75F', '#845EC2'],
  axis: '#333',
  tooltipBg: '#fff',
  tooltipText: '#000',
  heading: '#030000ff',
};

const DARK = {
  background: '#0D1117',
  card: '#161B22',
  bar: '#1E40AF',
  pie: ['#1E40AF', '#F59E0B', '#81C784', '#FF6F91', '#D65DB1', '#FFC75F', '#845EC2'],
  axis: '#F9FAFB',
  tooltipBg: '#2C2C3E',
  tooltipText: '#F9FAFB',
  heading: '#F9FAFB',
};

const Statistics = ({ mode }) => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const theme = useMemo(() => (mode === 'dark' ? DARK : LIGHT), [mode]);

  const fetchStats = () => {
    setLoading(true);
    axios
      .get('http://127.0.0.1:8000/api/statistics/')
      .then((res) => {
        if (Array.isArray(res.data) && res.data.length > 0) {
          setStats(res.data[0].data);
        } else {
          setStats(null);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load statistics:', err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading)
    return (
      <Container sx={{ textAlign: 'center', mt: 10 }}>
        <CircularProgress sx={{ color: theme.bar }} />
      </Container>
    );

  if (!stats || !stats.top_states || !stats.popular_courses)
    return (
      <Container sx={{ textAlign: 'center', mt: 10 }}>
        <Typography variant="h6" color="error">
          Statistics data is not available.
        </Typography>
        <Button variant="outlined" onClick={fetchStats} sx={{ mt: 2 }}>
          Retry
        </Button>
      </Container>
    );

  return (
    <Container sx={{ mt: 5 }}>
      <Typography
        variant="h4"
        gutterBottom
        align="center"
        fontWeight={600}
        sx={{ color: theme.heading + ' !important' }}
      >
        Admission Statistics
      </Typography>

      <Box textAlign="right" mb={2}>
        <Button variant="outlined" onClick={fetchStats}>
          Refresh Data
        </Button>
      </Box>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Box component={Paper} sx={{ p: 4, mb: 5, backgroundColor: theme.card }}>
          <Typography variant="h6" gutterBottom sx={{ color: theme.axis }}>
            Top States by Student Count
          </Typography>
          <Box sx={{ overflowX: 'auto' }}>
            <BarChart
              width={stats.top_states.length * 80} 
              height={300}
              data={stats.top_states}
            >
              <XAxis
                dataKey="state"
                stroke={theme.axis}
                tick={{ fill: theme.axis, fontSize: 12, angle: -45, textAnchor: 'end' }}
                axisLine={{ stroke: theme.axis }}
                interval={0} 
              />
              <YAxis
                stroke={theme.axis}
                tick={{ fill: theme.axis }}
                axisLine={{ stroke: theme.axis }}
                tickLine={{ stroke: theme.axis }}
              />
              <Tooltip
                formatter={(value) => value.toLocaleString()}
                contentStyle={{ backgroundColor: theme.tooltipBg, color: theme.tooltipText }}
              />
              <Bar
                dataKey="student_count"
                fill={theme.bar}
                animationBegin={0}
                animationDuration={1200}
                animationEasing="ease-out"
              />
            </BarChart>
          </Box>
        </Box>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Box component={Paper} sx={{ p: 4, backgroundColor: theme.card }}>
          <Typography variant="h6" gutterBottom sx={{ color: theme.axis }}>
            Popular Courses Across India
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={stats.popular_courses}
                dataKey="student_count"
                nameKey="stream"
                outerRadius={stats.popular_courses.length > 8 ? 80 : 100}
                label={{ fill: theme.axis }}
                animationBegin={0}
                animationDuration={1500}
                animationEasing="ease-out"
              >
                {stats.popular_courses.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={theme.pie[index % theme.pie.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => value.toLocaleString()}
                contentStyle={{ backgroundColor: theme.tooltipBg, color: theme.tooltipText }}
              />
              <Legend
                layout="vertical"
                verticalAlign="middle"
                align="right"
                wrapperStyle={{ maxHeight: 250, overflowY: 'auto' }}
                formatter={(value) => <span style={{ color: theme.axis }}>{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        </Box>
      </motion.div>
    </Container>
  );
};

export default Statistics;
