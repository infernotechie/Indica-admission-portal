// App.js
import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { ColorModeContext, CustomThemeProvider } from './ThemeContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import UniversitySearch from './pages/UniversitySearch';
import Scholarships from './pages/Scholarships';
import Statistics from './pages/Statistics';
import Courses from './pages/Courses';
import { AuthProvider } from './contexts/AuthContext';
import Footer from './components/Footer';
import CustomCursor from "./components/CustomCursor";
import AdmissionCostEstimator from "./components/AdmissionCostEstimator";
import Chatbot from './components/Chatbot';

function AppContent() {
  const { mode, toggleColorMode } = useContext(ColorModeContext);

  return (
    <>
      <CssBaseline />
      <Router>
        <Navbar toggleMode={toggleColorMode} mode={mode} />
        <CustomCursor />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<UniversitySearch />} />
          <Route path="/scholarships" element={<Scholarships />} />
          <Route path="/statistics" element={<Statistics mode={mode} />} />
          <Route path="/courses" element={<Courses mode={mode} />} />
          <Route path="/admission-estimator" element={<AdmissionCostEstimator />} />
        </Routes>
        <Footer />
        <Chatbot />
      </Router>
    </>
  );
}

export default function App() {
  return (
    <CustomThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </CustomThemeProvider>
  );
}
