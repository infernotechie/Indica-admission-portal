import React, { useEffect, useRef } from 'react';
import { Container, Grid, Card, CardContent, Typography, Button, CardActions, Box, useTheme } from '@mui/material';
import gsap from 'https://cdn.skypack.dev/gsap';
import ScrollTrigger from 'https://cdn.skypack.dev/gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const coursesData = [
  {
    id: 1,
    name: "Coursera",
    url: "https://www.coursera.org/",
    description: "Top university courses and certifications from Stanford, Google, Meta, and more.",
    logo: "/images/courseralogo.png",
    background: "/images/coursera-bg.jpeg"
  },
  {
    id: 2,
    name: "edX",
    url: "https://www.edx.org/",
    description: "Free online courses from MIT, Harvard, and other top universities.",
    logo: "/images/edxlogo.png",
    background: "/images/edx-bg.jpeg"
  },
  {
    id: 3,
    name: "Udemy",
    url: "https://www.udemy.com/",
    description: "Affordable courses in business, tech, design, and more from expert instructors.",
    logo: "/images/udemy.png",
    background: "/images/udemy-bg.jpeg"
  },
  {
    id: 4,
    name: "NPTEL",
    url: "https://nptel.ac.in/",
    description: "Online courses from IITs and IISc backed by MHRD, Govt of India.",
    logo: "/images/nptel.png",
    background: "/images/nptel-bg.jpeg"
  },
  {
    id: 5,
    name: "SWAYAM",
    url: "https://swayam.gov.in/",
    description: "Indian Government’s free education initiative with UGC-approved courses.",
    logo: "/images/swayam_logo.png",
    background: "/images/swayam-bg.jpeg"
  },
  {
    id: 6,
    name: "Khan Academy",
    url: "https://www.khanacademy.org/",
    description: "Free courses in math, science, computing, history, and more for school & college.",
    logo: "/images/khanacademy.png",
    background: "/images/khanacademy-bg.jpeg"
  },
  {
    id: 7,
    name: "FutureLearn",
    url: "https://www.futurelearn.com/",
    description: "Online courses from British universities and organizations.",
    logo: "/images/futurelearn.png",
    background: "/images/futurelearn-bg.jpg"
  },
  {
    id: 8,
    name: "Skillshare",
    url: "https://www.skillshare.com/",
    description: "Creative skills and hobby courses in design, photography, writing, and more.",
    logo: "/images/skillshare.png",
    background: "/images/skillshare-bg.jpeg"
  },
  {
    id: 9,
    name: "LinkedIn Learning",
    url: "https://www.linkedin.com/learning/",
    description: "Professional development courses from business to programming and productivity.",
    logo: "/images/linkedin-learning-logo.png",
    background: "/images/linkedinlearning-bg.jpeg"
  },
  {
    id: 10,
    name: "MIT OpenCourseWare",
    url: "https://ocw.mit.edu/",
    description: "Free and open access to MIT course materials.",
    logo: "/images/mitocw.jpg",
    background: "/images/mit-bg.jpeg"
  },
  {
    id: 11,
    name: "Harvard Online",
    url: "https://online-learning.harvard.edu/",
    description: "Courses directly from Harvard on computer science, business, and humanities.",
    logo: "/images/harvard.png",
    background: "/images/harvard-bg.jpeg"
  },
  {
    id: 12,
    name: "Stanford Online",
    url: "https://online.stanford.edu/",
    description: "Stanford University's online courses in AI, ML, and healthcare innovation.",
    logo: "/images/stanford.png",
    background: "/images/stanford-bg.jpeg"
  },
  {
    id: 13,
    name: "Codecademy",
    url: "https://www.codecademy.com/",
    description: "Interactive coding lessons in web development, data science, and more.",
    logo: "/images/codeacademy.png",
    background: "/images/codecademy-bg.jpeg"
  },
  {
    id: 14,
    name: "Great Learning",
    url: "https://www.mygreatlearning.com/",
    description: "Indian-based platform offering data science and AI courses with certification.",
    logo: "/images/great-learning.png",
    background: "/images/greatlearning-bg.jpeg"
  },
  {
    id: 15,
    name: "Unacademy",
    url: "https://unacademy.com/",
    description: "Popular Indian learning platform for competitive exams, IIT JEE, UPSC, NEET.",
    logo: "/images/unacademy.png",
    background: "/images/unacademy-bg.jpeg"
  }
];

const Courses = ({ mode }) => {
  const cardsRef = useRef([]);
  const theme = useTheme();

  useEffect(() => {
    if (cardsRef.current.length) {
      gsap.set(cardsRef.current, { opacity: 0, y: 40, willChange: "transform, opacity" });

      ScrollTrigger.batch(cardsRef.current, {
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: "power2.out",
          }),
        start: "top 85%",
        once: true,
      });
    }
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      <Typography
        variant="h4"
        gutterBottom
        align="center"
        sx={{ color: mode === 'dark' ? '#F9FAFB' : '#010108ff' }}
      >
        Courses
      </Typography>

      <Typography
        variant="subtitle2"
        align="center"
        sx={{ mb: 2, color: mode === 'dark' ? '#9ca3af' : 'text.secondary' }}
      >
        Explore top online learning platforms. Click to visit and start learning.
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {coursesData.map((course, index) => (
          <Grid item key={course.id}>
            <Card
              ref={(el) => (cardsRef.current[index] = el)}
              sx={{
                width: 280,
                height: 300,
                position: "relative",
                backgroundImage: `url(${course.background})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                color: "#fff",
                overflow: "hidden",
                borderRadius: 3,
                boxShadow: 3,
                backgroundColor: mode === 'dark' ? '#161B22' : 'transparent',
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundColor: mode === 'dark' ? 'rgba(13,17,23,0.85)' : 'rgba(0,0,0,0.55)',
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  p: 2,
                  textAlign: "center",
                }}
              >
                <Box
                  component="img"
                  src={course.logo}
                  alt={`${course.name} logo`}
                  sx={{
                    height: 60, 
                    width: 'auto',
                    maxWidth: '80%',
                    mb: 2,
                  }}
                />
                
                <CardContent>
                  <Typography
                    variant="body2"
                    sx={{ color: mode === 'dark' ? '#F9FAFB' : '#fff' }}
                  >
                    {course.description}
                  </Typography>
                </CardContent>

                <CardActions sx={{ justifyContent: "center" }}>
                  <Button
                    size="small"
                    variant="contained"
                    sx={{
                      backgroundColor: mode === 'dark' ? '#1E40AF' : '#1976d2',
                      color: '#F9FAFB',
                      '&:hover': {
                        backgroundColor: mode === 'dark' ? '#1E3A8A' : '#1565c0',
                      },
                    }}
                    href={course.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit
                  </Button>
                </CardActions>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Courses;
