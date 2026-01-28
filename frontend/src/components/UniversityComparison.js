// src/components/UniversityComparison.js
import React from "react";
import {
  Box,
  Typography,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const UniversityComparison = ({ universities, onRemove }) => {
  if (!universities || universities.length === 0) {
    return null;
  }

  return (
    <Paper
      elevation={4}
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        maxHeight: "60vh",
        overflowY: "auto",
        p: 2,
        zIndex: 1500,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
        boxShadow: "0 -4px 12px rgba(0,0,0,0.3)",
        background: "linear-gradient(135deg, #f0f4ff, #ffffff)"
      }}
    >
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        University Comparison
      </Typography>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            {universities.map((uni, idx) => (
              <TableCell key={idx} align="center">
                <Box display="flex" justifyContent="center" alignItems="center">
                  <Typography variant="subtitle1" fontWeight="bold">
                    {uni.name}
                  </Typography>
                  <IconButton size="small" onClick={() => onRemove(uni)}>
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </Box>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell variant="head">State</TableCell>
            {universities.map((uni, idx) => (
              <TableCell key={idx} align="center">{uni.state}</TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell variant="head">Stream</TableCell>
            {universities.map((uni, idx) => (
              <TableCell key={idx} align="center">{uni.stream}</TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell variant="head">Category</TableCell>
            {universities.map((uni, idx) => (
              <TableCell key={idx} align="center">{uni.category}</TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell variant="head">Website</TableCell>
            {universities.map((uni, idx) => (
              <TableCell key={idx} align="center">
                {uni.website ? (
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => window.open(uni.website, "_blank")}
                  >
                    Visit
                  </Button>
                ) : (
                  "N/A"
                )}
              </TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
  );
};

export default UniversityComparison;
