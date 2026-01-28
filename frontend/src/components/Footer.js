import React from 'react';
import { Box, Typography, Container, Grid, IconButton, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';

const Footer = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const colors = {
    mainBg: isDark ? '#0D1117' : '#1976d2',
    waveFill: isDark ? '#161B22' : '#1976d2',
    headingText: isDark ? '#F9FAFB' : '#fff',
    bodyText: isDark ? '#9CA3AF' : '#f0f0f0',
    linkCTA: isDark ? '#F59E0B' : '#FFD700',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      {/* Animated Wave */}
      <motion.svg
        viewBox="0 0 1440 100"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', display: 'block' }}
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
      >
        <path
          fill={colors.waveFill}
          fillOpacity="1"
          d="M0,64L60,69.3C120,75,240,85,360,101.3C480,117,600,139,720,138.7C840,139,960,117,1080,90.7C1200,64,1320,32,1380,16L1440,0L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
        />
      </motion.svg>

      {/* Footer Content */}
      <Box
        sx={{
          backgroundColor: colors.mainBg,
          color: colors.headingText,
          textAlign: 'center',
          py: 8,
          px: 2,
        }}
      >
        <Container>
          {/* Brand Name */}
          <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ color: colors.headingText }}>
            Indica Portal
          </Typography>
          <Typography variant="body2" sx={{ mb: 4, color: colors.bodyText }}>
            Explore Indian universities, scholarships, and courses. Connecting students globally.
          </Typography>

          {/* Footer Grid */}
          <Grid container spacing={6} justifyContent="center">
            {/* Quick Links */}
            <Grid item xs={12} sm={4} md={3}>
              <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ color: colors.headingText }}>
                Quick Links
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {['Home', 'Courses', 'Scholarships', 'Universities'].map((link, i) => (
                  <Typography
                    key={i}
                    sx={{ cursor: 'pointer', color: colors.linkCTA, '&:hover': { textDecoration: 'underline' } }}
                    onClick={() => {
                      const path = link === 'Home' ? '/' : link === 'Universities' ? '/search' : `/${link.toLowerCase()}`;
                      navigate(path);
                    }}
                  >
                    {link}
                  </Typography>
                ))}
              </Box>
            </Grid>

            {/* Contact */}
            <Grid item xs={12} sm={4} md={3}>
              <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ color: colors.headingText }}>
                Contact
              </Typography>
              <Typography variant="body2" sx={{ color: colors.bodyText }}>📧 info@indicaportal.com</Typography>
              <Typography variant="body2" sx={{ color: colors.bodyText }}>📞 +91 9876543210</Typography>
            </Grid>

            {/* Social Media */}
            <Grid item xs={12} sm={4} md={3}>
              <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ color: colors.headingText }}>
                Follow Us
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 1 }}>
                {[Facebook, Twitter, Instagram, LinkedIn].map((Icon, i) => (
                  <IconButton key={i} sx={{ color: colors.linkCTA }} href="#" target="_blank">
                    <Icon />
                  </IconButton>
                ))}
              </Box>
            </Grid>
          </Grid>

          {/* Copyright */}
          <Typography variant="body2" sx={{ mt: 6, color: colors.bodyText }}>
            © 2025 Indica Portal. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </motion.div>
  );
};

export default Footer;
