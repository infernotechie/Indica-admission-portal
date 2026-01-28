import React, { useState } from "react";
import { Box, Typography, Slider, TextField, Button } from "@mui/material";

const AdmissionCostEstimator = ({ universities = [] }) => {
  const [city, setCity] = useState("");
  const [course, setCourse] = useState("");
  const [duration, setDuration] = useState(4); // default in years
  const [tuition, setTuition] = useState(0);
  const [hostel, setHostel] = useState(0);
  const [food, setFood] = useState(0);

  const handleEstimate = () => {
    if (!city || !course) return; // extra safety

    // Simple formula (replace with real backend logic later)
    const tuitionCost = duration * (Math.random() * 2 + 1) * 100000; // ₹1L-3L per year
    const hostelCost = duration * 50000; // ₹50k/year
    const foodCost = duration * 30000; // ₹30k/year

    setTuition(Math.round(tuitionCost));
    setHostel(Math.round(hostelCost));
    setFood(Math.round(foodCost));
  };

  return (
    <Box sx={{ p: 4, maxWidth: 600, mx: "auto", bgcolor: "background.paper", borderRadius: 3, boxShadow: 3 }}>
      <Typography variant="h5" fontWeight="bold" mb={2}>Admission Cost Estimator</Typography>

      <TextField
        label="City"
        placeholder="Enter city"
        fullWidth
        value={city}
        onChange={(e) => setCity(e.target.value)}
        sx={{ mb: 2 }}
      />

      <TextField
        label="Course"
        placeholder="Enter course name"
        fullWidth
        value={course}
        onChange={(e) => setCourse(e.target.value)}
        sx={{ mb: 2 }}
      />

      <Typography gutterBottom>Duration (years)</Typography>
      <Slider
        value={duration}
        onChange={(e, val) => setDuration(val)}
        valueLabelDisplay="auto"
        min={1}
        max={6}
        sx={{ mb: 3 }}
      />

      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleEstimate}
        disabled={!city || !course} 
      >
        Estimate Costs
      </Button>

      {tuition > 0 && (
        <Box sx={{ mt: 3 }}>
          <Typography>💰 Tuition: ₹{tuition.toLocaleString()}</Typography>
          <Typography>🏠 Hostel: ₹{hostel.toLocaleString()}</Typography>
          <Typography>🍴 Food: ₹{food.toLocaleString()}</Typography>
          <Typography fontWeight="bold" mt={1}>Total: ₹{(tuition + hostel + food).toLocaleString()}</Typography>
        </Box>
      )}
    </Box>
  );
};

export default AdmissionCostEstimator;
