import React, { useEffect, useRef } from 'react';
import { Container, Grid, Card, CardContent, Typography, Button, CardActions, Box, useTheme } from '@mui/material';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const scholarshipsData = [
  {
    id: 1,
    name: "Post Matric Scholarship for SC Students",
    eligibility: "Scheduled Caste students studying at post-matric level",
    amount: "Up to ₹50,000 per year",
    link: "https://scholarships.gov.in/",
    background: "/images/post_matric.jpg"
  },
  {
    id: 2,
    name: "AICTE Pragati Scholarship for Girls",
    eligibility: "Girl students admitted to AICTE-approved institutions",
    amount: "₹50,000 per year for 4 years",
    link: "https://www.aicte-pragati-saksham-gov.in/",
    background: "/images/aicte_pragati.jpg"
  },
  {
    id: 3,
    name: "Inspire Scholarship (DST)",
    eligibility: "Top 1% in 12th board and pursuing Natural Sciences",
    amount: "₹80,000 per year",
    link: "https://online-inspire.gov.in/",
    background: "/images/inspire.jpg"
  },
  {
    id: 4,
    name: "National Scholarship Scheme (NSP)",
    eligibility: "Students belonging to minority communities",
    amount: "₹12,000 to ₹25,000 per year",
    link: "https://scholarships.gov.in/",
    background: "/images/nsp.jpg"
  },
  {
    id: 5,
    name: "Maulana Azad National Fellowship (MANF)",
    eligibility: "Minority students pursuing MPhil/PhD",
    amount: "₹28,000 per month + HRA",
    link: "https://www.ugc.gov.in/",
    background: "/images/manf.jpg"
  },
  {
    id: 6,
    name: "Central Sector Scheme for College and University Students",
    eligibility: "Top 20 percentile in 12th & enrolled in UG course",
    amount: "₹10,000 to ₹20,000 per year",
    link: "https://scholarships.gov.in/",
    background: "/images/central_sector.jpg"
  },
  {
    id: 7,
    name: "Saksham Scholarship",
    eligibility: "Differently abled students",
    amount: "Rs. 50,000",
    link: "https://www.aicte-india.org/schemes/students-development-schemes/saksham",
    background: "/images/saksham.jpg"
  },
  {
    id: 8,
    name: "Kind Scholarship for Young Women",
    eligibility: "Girls from disadvantaged backgrounds",
    amount: "Rs. 25,000 – 1,00,000",
    link: "https://www.buddy4study.com/scholarship/kind-scholarship-for-meritorious-students",
    background: "/images/kind.jpg"
  },
  {
    id: 9,
    name: "FAEA Scholarship",
    eligibility: "SC/ST/BPL students for UG courses",
    amount: "Full tuition + maintenance",
    link: "https://www.faeaindia.org",
    background: "/images/faea.jpg"
  },
  {
    id: 10,
    name: "NTS National Talent Search",
    eligibility: "Class X students",
    amount: "Rs. 1,250 to 2,000/month",
    link: "https://ncert.nic.in/national-talent-examination.php",
    background: "/images/nts.jpg"
  },
  {
    id: 11,
    name: "L’Oréal India For Young Women in Science",
    eligibility: "Girls in science after Class 12",
    amount: "Rs. 2,50,000",
    link: "https://www.buddy4study.com/scholarship/loreal-india-for-young-women-in-science-scholarship",
    background: "/images/loreal.jpg"
  },
  {
    id: 12,
    name: "ONGC Scholarship for SC/ST",
    eligibility: "SC/ST in Engineering/MBBS/MBA",
    amount: "Rs. 48,000/year",
    link: "https://www.ongcindia.com",
    background: "/images/ongc.jpg"
  },
  {
    id: 13,
    name: "Sitaram Jindal Foundation Scholarship",
    eligibility: "Economically weaker students",
    amount: "Rs. 500 – Rs. 2,500/month",
    link: "https://www.sitaramjindalfoundation.org",
    background: "/images/sitaram_jindal.jpg"
  },
  {
    id: 14,
    name: "Prime Minister’s Scholarship Scheme",
    eligibility: "Wards of ex-servicemen",
    amount: "Rs. 2,500 per month (girls), Rs. 2,000 (boys)",
    link: "https://ksb.gov.in",
    background: "/images/pm_scholarship.jpg"
  },
  {
    id: 15,
    name: "Foundation for Excellence Scholarship",
    eligibility: "Engineering/Medical students with financial need",
    amount: "Tuition Fee Support",
    link: "https://www.ffe.org",
    background: "/images/ffe.jpg"
  }
];

const Scholarships = ({ mode }) => {
  const cardsRef = useRef([]);
  const theme = useTheme();
  const isDark = mode === 'dark';

  const darkColors = {
    mainBg: '#0D1117',
    cardBg: '#161B22',
    overlay: 'rgba(13,17,23,0.85)',
    textPrimary: '#F9FAFB',
    textSecondary: '#9CA3AF',
    buttonBg: '#1E40AF',
    buttonHover: '#1E3A8A',
  };

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
    <Container maxWidth="lg" sx={{ mt: 5, backgroundColor: isDark ? darkColors.mainBg : undefined }}>
      <Typography
        variant="h4"
        gutterBottom
        align="center"
        sx={{ color: isDark ? darkColors.textPrimary : undefined}}
      >
        Scholarships
      </Typography>

      <Typography
        variant="subtitle2"
        align="center"
        sx={{ mb: 2, color: isDark ? darkColors.textSecondary : 'text.secondary' }}
      >
        Browse all available scholarships. Click to check eligibility and apply.
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {scholarshipsData.map((scholarship, index) => (
          <Grid item key={scholarship.id}>
            <Card
              ref={(el) => (cardsRef.current[index] = el)}
              sx={{
                width: 280,
                height: 300,
                position: "relative",
                backgroundImage: `url(${scholarship.background})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                overflow: "hidden",
                borderRadius: 3,
                boxShadow: 3,
                backgroundColor: isDark ? darkColors.cardBg : 'transparent',
                color: isDark ? darkColors.textPrimary : undefined,
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundColor: isDark ? darkColors.overlay : 'rgba(0,0,0,0.55)',
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  p: 2,
                  textAlign: "center",
                }}
              >
                <CardContent>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ color: isDark ? darkColors.textPrimary : '#fff', fontWeight: 600 }}
                  >
                    {scholarship.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: isDark ? darkColors.textPrimary : '#fff' }}
                  >
                    <strong>Eligibility:</strong> {scholarship.eligibility}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: isDark ? darkColors.textPrimary : '#fff' }}
                  >
                    <strong>Amount:</strong> {scholarship.amount}
                  </Typography>
                </CardContent>

                <CardActions sx={{ justifyContent: "center" }}>
                  <Button
                    size="small"
                    variant="contained"
                    sx={{
                      backgroundColor: isDark ? darkColors.buttonBg : '#1976d2',
                      color: '#F9FAFB',
                      '&:hover': {
                        backgroundColor: isDark ? darkColors.buttonHover : '#1565c0',
                      },
                    }}
                    href={scholarship.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit Website
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

export default Scholarships;
