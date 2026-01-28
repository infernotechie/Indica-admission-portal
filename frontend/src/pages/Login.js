import React, { useState, useContext } from 'react';
import { TextField, Button, MenuItem, Typography, Container, Box } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import '../components/LoginStyles.css'; 

const Login = ({ onLoginSuccess }) => {   
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('student');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [resendDisabled, setResendDisabled] = useState(false);
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSendOtp = async () => {
    if (!isValidEmail(email)) {
      setMessage('Please enter a valid email address');
      return;
    }

    try {
      await axios.post('http://localhost:8000/api/send-otp/', { email, role });
      setOtpSent(true);
      setMessage('OTP sent to your email!');
      setResendDisabled(true);

      setTimeout(() => setResendDisabled(false), 30000);
    } catch (error) {
      setMessage(error.response?.data?.error || 'Failed to send OTP');
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/verify-otp/",
        { email, otp },
        { withCredentials: true }
      );

      const userData = {
        email: res.data.email,
        role: res.data.role,
        username: res.data.username,
        gpa: res.data.gpa || null,
      };

      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      window.dispatchEvent(new Event("authChange"));

      if (onLoginSuccess) onLoginSuccess();

      navigate(res.data.redirect || "/profile");

      setMessage(`Login successful! Welcome ${userData.username || email}`);
    } catch (error) {
      setMessage(error.response?.data?.error || "Invalid or expired OTP");
    }
  };

  return (
<Container maxWidth="sm" className="login-modal-content">
  <Box className="login-container">
    <Typography variant="h5" gutterBottom>OTP Login</Typography>

    <TextField
      label="Email"
      type="email"
      fullWidth
      margin="normal"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />

    <TextField
      select
      label="Role"
      fullWidth
      margin="normal"
      value={role}
      onChange={(e) => setRole(e.target.value)}
    >
      <MenuItem value="student">Student</MenuItem>
      <MenuItem value="teacher">Teacher</MenuItem>
    </TextField>

    {!otpSent ? (
      <Button variant="contained" fullWidth onClick={handleSendOtp}>Send OTP</Button>
    ) : (
      <>
        <TextField
          label="Enter OTP"
          fullWidth
          margin="normal"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        <Button variant="contained" fullWidth onClick={handleVerifyOtp}>Verify OTP</Button>

        <Button
          variant="text"
          fullWidth
          onClick={handleSendOtp}
          disabled={resendDisabled}
          sx={{ mt: 1 }}
        >
          Resend OTP
        </Button>
      </>
    )}

    {message && (
      <Typography sx={{ mt: 2 }} color="primary">{message}</Typography>
    )}
  </Box>
</Container>
  )
}
export default Login;
