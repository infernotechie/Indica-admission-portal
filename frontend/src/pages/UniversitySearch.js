import React, { useState, useEffect, useContext } from 'react';
import {
  TextField, MenuItem, Button, Typography, Box, Paper, Container, Chip, Grid, IconButton, Modal
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AdmissionCostEstimator from '../components/AdmissionCostEstimator';
import UniversityComparison from "../components/UniversityComparison";
import CurrencyConverter from '../components/CurrencyConverter';
import { useLocation } from "react-router-dom";
import { useTheme } from '@mui/material/styles';
import { AuthContext } from "../contexts/AuthContext";
import iitbImage from '../assets/iitb.jpg';
import iitdImage from '../assets/iitd.jpg';
import duImage from '../assets/du.jpg';
import bhuImage from '../assets/bhu.jpg';
import annaImage from '../assets/anna.jpg';
import jadavpurImage from '../assets/jadavpur.jpg';
import osmaniaImage from '../assets/osmania.jpg';
import calcuttaImage from '../assets/calcutta.jpg';
import puneImage from '../assets/pune.jpg';
import amuImage from '../assets/amu.jpg';
import amityImage from '../assets/amity.jpg';
import hydrebadImage from '../assets/hydrebad.jpg';
import panjabImage from '../assets/panjab.jpg';
import ignouImage from '../assets/ignou.jpg';
import tissImage from '../assets/tiss.jpg';
import vjtiImage from '../assets/vjti.jpg';
import spitImage from '../assets/spit.jpg';
import kjsceImage from '../assets/kjsce.jpg';

const universityImages = {
  "IIT Bombay": iitbImage,
  "IIT Delhi": iitdImage,
  "Delhi University": duImage,
  "Banaras Hindu University": bhuImage,
  "Anna University": annaImage,
  "Jadavpur University": jadavpurImage,
  "Osmania University": osmaniaImage,
  "University of Calcutta": calcuttaImage,
  "Savitribai Phule Pune University": puneImage,
  "Aligarh Muslim University": amuImage,
  "Amity University": amityImage,
  "University of Hyderabad": hydrebadImage,
  "Panjab University": panjabImage,
  "IGNOU": ignouImage,
  "TISS Mumbai": tissImage,
  "VJTI": vjtiImage,
  "SPIT": spitImage,
  "KJSCE": kjsceImage
};

const UniversitySearch = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const { user } = useContext(AuthContext);
  const isLoggedIn = !!user;
  const location = useLocation();

  const darkColors = {
    mainBg: '#121212',
    cardBg: '#161B22',
    buttonPrimary: '#161B22',
    textPrimary: '#F9FAFB',
    textSecondary: '#9CA3AF',
    cta: '#F59E0B',
  };

  const [universities, setUniversities] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [state, setState] = useState('');
  const [stream, setStream] = useState('');
  const [category, setCategory] = useState('');
  const [searched, setSearched] = useState(false);
  const [comparisonList, setComparisonList] = useState([]);
  const [estimatorOpen, setEstimatorOpen] = useState(false);
  const [comparisonOpen, setComparisonOpen] = useState(false);
  const [currencyOpen, setCurrencyOpen] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get("q");
    if (q && universities.length > 0) {
      const f = universities.filter((uni) =>
        uni.name.toLowerCase().includes(q.toLowerCase())
      );
      setFiltered(f);
      setSearched(true);
    }
  }, [location.search, universities]);

  useEffect(() => {
    fetch('http://localhost:8000/api/universities/')
      .then(res => res.json())
      .then(data => setUniversities(data))
      .catch(err => console.error('University fetch error:', err));
  }, []);

  const handleSearch = () => {
    const f = universities.filter(uni =>
      (!state || uni.state.toLowerCase().includes(state.toLowerCase())) &&
      (!stream || uni.stream.toLowerCase().includes(stream.toLowerCase())) &&
      (!category || uni.category.toLowerCase() === category.toLowerCase())
    );
    setFiltered(f);
    setSearched(true);
  };

  const handleAddToComparison = (uni) => {
    if (comparisonList.find((u) => u.name === uni.name)) return;
    if (comparisonList.length >= 3) {
      alert("You can compare up to 3 universities only.");
      return;
    }
    setComparisonList([...comparisonList, uni]);
  };

  const handleRemoveFromComparison = (uni) => {
    setComparisonList(comparisonList.filter((u) => u.name !== uni.name));
  };

  const isSelected = (uni) => comparisonList.some(u => u.name === uni.name);

  const paperSx = isDark
    ? { backgroundColor: darkColors.cardBg, color: darkColors.textPrimary }
    : {};

  const buttonSx = isDark
    ? {
        backgroundColor: darkColors.buttonPrimary,
        color: darkColors.textPrimary,
        '&:hover': { backgroundColor: darkColors.cta }
      }
    : {};

  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 4, position: 'relative', backgroundColor: isDark ? darkColors.mainBg : undefined }}>
        <Box sx={{ display: 'flex', justifyContent: 'left', mb: 4, position: 'relative' }}>
          <Typography variant="h4" gutterBottom align="left" fontWeight="bold" sx={isDark ? { color: darkColors.textPrimary } : {}}>
            University Search
          </Typography>

          {isLoggedIn && (
            <Box sx={{ position: 'absolute', right: 0, top: 0, display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Button
                variant="contained"
                onClick={() => setCurrencyOpen(true)}
                sx={{ ...buttonSx, fontWeight: 'bold', textTransform: 'none', px: 3, py: 1.2, borderRadius: 2 }}
              >
                Currency Converter
              </Button>

              <Button
                variant="contained"
                onClick={() => setEstimatorOpen(true)}
                sx={{ ...buttonSx, fontWeight: 'bold', textTransform: 'none', px: 3, py: 1.2, borderRadius: 2 }}
              >
                Admission Cost Estimator
              </Button>

              <Button
                variant="contained"
                onClick={() => setComparisonOpen(true)}
                sx={{ ...buttonSx, fontWeight: 'bold', textTransform: 'none', px: 3, py: 1.2, borderRadius: 2 }}
              >
                Comparison Tool {comparisonList.length > 0 && `(${comparisonList.length})`}
              </Button>
            </Box>
          )}
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Paper elevation={3} sx={{ p: 3, mb: 4, ...(isDark ? paperSx : {}) }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="State"
                    select
                    fullWidth
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    sx={isDark ? { input: { color: darkColors.textPrimary }, label: { color: darkColors.textSecondary}, minWidth: 200 } : {minWidth: 200}}
                  >
                    <MenuItem value="">Select State</MenuItem>
                    {[...new Set(universities.map(u => u.state))].map((s, idx) => (
                      <MenuItem key={idx} value={s}>{s}</MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Stream"
                    select
                    fullWidth
                    value={stream}
                    onChange={(e) => setStream(e.target.value)}
                    sx={isDark ? { input: { color: darkColors.textPrimary }, label: { color: darkColors.textSecondary }, minWidth: 200 } : {minWidth: 200}}
                  >
                    <MenuItem value="">Select Stream</MenuItem>
                    {[...new Set(universities.map(u => u.stream))].map((s, idx) => (
                      <MenuItem key={idx} value={s}>{s}</MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Category"
                    select
                    fullWidth
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    sx={isDark ? { input: { color: darkColors.textPrimary }, label: { color: darkColors.textSecondary }, minWidth: 200 } : {minWidth: 200}}
                  >
                    <MenuItem value="">All</MenuItem>
                    <MenuItem value="GEN">GENERAL</MenuItem>
                    <MenuItem value="OBC">OBC</MenuItem>
                    <MenuItem value="SC">SC</MenuItem>
                    <MenuItem value="ST">ST</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={handleSearch}
                    disabled={!state || !stream || !category}
                    sx={{ height: '100%' }}
                  >
                    Search
                  </Button>
                </Grid>
              </Grid>
            </Paper>

            {searched && filtered.map((uni, idx) => (
              <Paper
                key={idx}
                elevation={2}
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  p: 2,
                  mb: 2,
                  ...(isDark ? paperSx : {}),
                  alignItems: 'flex-start',
                  gap: 2,
                }}
              >
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, minWidth: 200, flexShrink: 0 }}>
                  <Box
                    sx={{
                      width: 200,
                      height: 150,
                      borderRadius: 2,
                      overflow: 'hidden',
                      backgroundImage: `url(${universityImages[uni.name] || '/default-campus.jpg'})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  />
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => uni.website && window.open(uni.website, '_blank')}
                      disabled={!uni.website}
                    >
                      Visit Website
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => {
                        const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(uni.name + ", " + uni.state)}`;
                        window.open(mapUrl, '_blank');
                      }}
                    >
                      View on Google Maps
                    </Button>
                    {isLoggedIn && (
                      <Button
                        variant={isSelected(uni) ? "contained" : "outlined"}
                        size="small"
                        startIcon={isSelected(uni) ? <CheckCircleIcon /> : null}
                        onClick={() => isSelected(uni) ? handleRemoveFromComparison(uni) : handleAddToComparison(uni)}
                        sx={{
                          color: isSelected(uni) ? 'white' : 'black',
                          borderColor: 'black',
                          backgroundColor: isSelected(uni) ? '#1976d2' : 'transparent',
                          '&:hover': {
                            backgroundColor: isSelected(uni) ? '#1565c0' : '#e0e0e0',
                            borderColor: isSelected(uni) ? '#1565c0' : 'black',
                          },
                        }}
                      >
                        {isSelected(uni) ? "Selected" : "Compare"}
                      </Button>
                    )}
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <Typography variant="h6" sx={isDark ? { color: darkColors.textPrimary } : {}}>{uni.name}</Typography>
                  <Chip icon={<LocationOnIcon />} label={uni.state} sx={{ mt: 1, mb: 0.5 }} />
                  <Chip label={`Stream: ${uni.stream}`} sx={{ mb: 0.5 }} />
                  <Chip label={`Category: ${uni.category}`} sx={{ mb: 1 }} />
                </Box>
              </Paper>
            ))}
          </Grid>
        </Grid>

        <Modal open={estimatorOpen} onClose={() => setEstimatorOpen(false)}>
          <Box sx={{
            position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper', p: 4, borderRadius: 3, boxShadow: 24, maxWidth: 600, width: '90%'
          }}>
            <IconButton sx={{ position: 'absolute', top: 10, right: 10 }} onClick={() => setEstimatorOpen(false)}>
              <CloseIcon />
            </IconButton>
            <AdmissionCostEstimator />
          </Box>
        </Modal>

        <Modal open={comparisonOpen} onClose={() => setComparisonOpen(false)}>
          <Box sx={{
            position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper', p: 4, borderRadius: 3, boxShadow: 24, maxWidth: 800, width: '90%'
          }}>
            <IconButton sx={{ position: 'absolute', top: 10, right: 10 }} onClick={() => setComparisonOpen(false)}>
              <CloseIcon />
            </IconButton>
            <UniversityComparison universities={comparisonList} onRemove={handleRemoveFromComparison} />
          </Box>
        </Modal>

        <Modal open={currencyOpen} onClose={() => setCurrencyOpen(false)}>
          <Box sx={{
            position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper', p: 4, borderRadius: 3, boxShadow: 24, maxWidth: 400, width: '90%'
          }}>
            <IconButton sx={{ position: 'absolute', top: 10, right: 10 }} onClick={() => setCurrencyOpen(false)}>
              <CloseIcon />
            </IconButton>
            <CurrencyConverter />
          </Box>
        </Modal>
      </Container>
    </>
  );
};

export default UniversitySearch;
