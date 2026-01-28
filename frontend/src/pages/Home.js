import React from 'react';
import { Box, Button, Typography, Container, Grid, Paper, useTheme } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import BarChartIcon from '@mui/icons-material/BarChart';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import CountUp from 'react-countup';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import educationAnimation from '../assets/education.json';
import backgroundVideo from '../assets/background.mp4'; 
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const Home = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const colors = {
    mainBg: isDark ? 'charcoal black' : '#fff',
    cardBg: isDark ? '#161B22' : 'rgba(255,255,255,0.85)',
    textPrimary: isDark ? '#F9FAFB' : '#182848',
    textSecondary: isDark ? '#9CA3AF' : '#6B7280',
    buttonPrimary: isDark ? '#1E40AF' : '#1976d2',
    buttonTextCTA: isDark ? '#F59E0B' : '#fff',
  };

  const topUniversities = [
    { name: 'IIT Bombay', location: 'Mumbai', rating: 5, image: require('../assets/iitb.jpg') },
    { name: 'VJTI', location: 'Mumbai', rating: 4.8, image: require('../assets/vjti.jpg') },
    { name: 'SPIT', location: 'Mumbai', rating: 4.6, image: require('../assets/spit.jpg') },
    { name: 'KJSCE', location: 'Mumbai', rating: 4.5, image: require('../assets/kjsce.jpg') },
  ];

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [{ breakpoint: 960, settings: { slidesToShow: 1 } }],
  };

  const cardPaperSx = {
    backgroundColor: colors.cardBg,
    color: colors.textPrimary,
    backdropFilter: 'none',
    boxShadow: isDark ? '0 2px 10px rgba(0,0,0,0.4)' : undefined,
  };

  return (
    <Box sx={{ position: 'relative', minHeight: '100vh', backgroundColor: colors.mainBg, overflow: 'hidden' }}>
      
      <Box
        component="style"
        dangerouslySetInnerHTML={{
          __html: `
            .slick-prev:before,
            .slick-next:before {
              color: ${colors.textPrimary};
              font-size: 30px;
              opacity: 0.85;
            }
            .slick-prev:hover:before,
            .slick-next:hover:before { opacity: 1; }
            .slick-dots li button:before {
              font-size: 10px;
              color: ${colors.textPrimary};
              opacity: 0.7;
            }
            .slick-dots li.slick-active button:before { opacity: 1; }
          `,
        }}
      />

      <Container sx={{ pt: 12, pb: 12, position: 'relative', textAlign: 'center' }}> 
        <Box
          sx={{
          position: 'absolute',
          top: 0,
          left: '50%',          
          transform: 'translateX(-50%)', 
          width: '120%',          
          height: '100%',
          zIndex: 0,
          overflow: 'hidden',
        }}
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'fill', 
            }}
          >
            <source src={backgroundVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0,0,0,0.4)', 
            }}
          />
        </Box>

        <motion.div 
          initial={{ opacity: 0, y: -30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6 }} 
          style={{ position: 'relative', zIndex: 1 }}
        >
          <Typography 
            variant="h3" 
            fontWeight="bold" 
            gutterBottom 
            sx={{ color: isDark ? colors.textPrimary : '#fff' }} 
          >
            Welcome to Indica
          </Typography>
          <Typography 
            variant="subtitle1" 
            sx={{ maxWidth: 600, mx: 'auto', mb: 3, color: isDark ? colors.textSecondary : '#f0f0f0' }} 
          >
            Explore Indian universities, scholarships, and courses — all in one place.
          </Typography>
          <Box sx={{ width: 220, mx: 'auto', mb: 4 }}>
            <Lottie animationData={educationAnimation} loop />
          </Box>
        </motion.div>
      </Container>

      <Container sx={{ mt: 4, position: 'relative', zIndex: 1 }}>
        <Slider {...carouselSettings}>
          {topUniversities.map((uni, i) => (
            <Box key={i} sx={{ p: 2 }}>
              <Paper 
                elevation={isDark ? 0 : 6} 
                sx={{ 
                  position: 'relative',
                  p: 4, 
                  borderRadius: 3, 
                  height: 250, 
                  color: '#fff', 
                  backgroundImage: `url(${uni.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                }}
              >
                <Box 
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0,0,0,0.4)',
                    borderRadius: '12px',
                  }}
                />
                <Box sx={{ position: 'relative', zIndex: 1 }}>
                  <Typography variant="h6" fontWeight="bold">{uni.name}</Typography>
                  <Typography variant="body2" mb={1}>{uni.location}</Typography>
                  <Typography variant="body2">Rating: {uni.rating} ⭐</Typography>
                  <Button
                    variant="contained"
                    sx={{ mt: 2, backgroundColor: colors.buttonPrimary, color: colors.buttonTextCTA }}
                    onClick={() => navigate('/search')}
                  >
                    Explore
                  </Button>
                </Box>
              </Paper>
            </Box>
          ))}
        </Slider>
      </Container>

      <Container sx={{ py: 8, position: 'relative', zIndex: 1 }}>
        <Grid container spacing={4} justifyContent="center">
          {[ 
            { icon: <SchoolIcon fontSize="large" />, title: 'University Explorer', desc: 'Search Indian universities by stream, fee, state, and category.', route: '/search' },
            { icon: <EmojiEventsIcon fontSize="large" />, title: 'Scholarships & Aid', desc: 'View available scholarships for minorities and international students.', route: '/scholarships' },
            { icon: <BarChartIcon fontSize="large" />, title: 'Statistics & Insights', desc: 'Check real-time education statistics from across India.', route: '/statistics' },
            { icon: <AutoStoriesIcon fontSize="large" />, title: 'Courses', desc: 'Courses you can view and apply for depending on your interests.', route: '/courses' },
          ].map((card, i) => (
            <Grid item xs={12} md={3} key={i}>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.2, duration: 0.5 }}>
                <Paper
                  elevation={isDark ? 0 : 6}
                  sx={{
                    p: 4,
                    borderRadius: 4,
                    textAlign: 'center',
                    ...cardPaperSx,
                    '&:hover': { transform: 'translateY(-5px)', transition: 'all 0.3s ease' }
                  }}
                >
                  <Box sx={{ mb: 2 }}>{card.icon}</Box>
                  <Typography variant="h6" fontWeight="bold">{card.title}</Typography>
                  <Typography variant="body2" sx={{ mt: 1, mb: 2, color: colors.textSecondary }}>{card.desc}</Typography>
                  <Button variant="contained" sx={{ backgroundColor: colors.buttonPrimary, color: colors.buttonTextCTA }} onClick={() => navigate(card.route)}>
                    Explore
                  </Button>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Container sx={{ py: 8, textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ color: colors.textPrimary }}>
          About Indica
        </Typography>
        <Typography variant="body1" sx={{ maxWidth: 800, mx: 'auto', color: colors.textSecondary }}>
          Indica Portal started in 2024 to help international and minority students explore Indian universities,
          scholarships, and courses in a single place. Our mission is to make higher education accessible,
          transparent, and efficient for every student.
        </Typography>
      </Container>

      <Container sx={{ py: 8, textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ color: colors.textPrimary }}>Quick Stats</Typography>
        <Grid container spacing={4} justifyContent="center" mt={2}>
          {[{ number: 150, label: 'Universities' }, { number: 75, label: 'Scholarships' }, { number: 2000, label: 'Students' }].map((item, i) => (
            <Grid item xs={12} md={3} key={i}>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.2, duration: 0.6 }}>
                <Paper
                  elevation={isDark ? 0 : 3}
                  sx={{ p: 4, borderRadius: 3, ...cardPaperSx, '&:hover': { transform: 'scale(1.05)', transition: '0.3s ease' } }}
                >
                  <Typography variant="h3" sx={{ color: colors.buttonPrimary }}><CountUp end={item.number} duration={2} />+</Typography>
                  <Typography variant="h6" mt={1} sx={{ color: colors.textSecondary }}>{item.label}</Typography>
                </Paper>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;