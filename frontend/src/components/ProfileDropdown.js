// src/components/ProfileDropdown.js
import React, { useState, useEffect, useContext } from "react";
import {
  Menu,
  Box,
  Typography,
  TextField,
  Button,
  Avatar,
  Divider,
  useTheme,
  CircularProgress,
  MenuItem,
} from "@mui/material";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContext";

export default function ProfileDropdown({ anchorEl, onClose }) {
  const theme = useTheme();
  const open = Boolean(anchorEl);
  const { setUser } = useContext(AuthContext); // ✅ access global auth context

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    gpa: "",
    role: "",
    stream: "",
    university: "",
  });

  const streams = ["Science", "Commerce", "Arts", "Engineering", "Medical"];

  const getCookie = (name) => {
    let cookieValue = null;
    if (document.cookie && document.cookie !== "") {
      const cookies = document.cookie.split(";");
      for (let cookie of cookies) {
        cookie = cookie.trim();
        if (cookie.startsWith(name + "=")) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  };

  // Fetch user profile when menu opens
  useEffect(() => {
    if (open) {
      setLoading(true);
      axios
        .get("/api/profile/", { withCredentials: true })
        .then((res) => setUserData(res.data))
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    }
  }, [open]);

  // Save profile changes
  const handleSave = () => {
    setSaving(true);
    const csrfToken = getCookie("csrftoken");

    axios
      .put("/api/profile/", userData, {
        withCredentials: true,
        headers: { "X-CSRFToken": csrfToken },
      })
      .then((res) => {
        setUserData(res.data.profile || res.data);
        setIsEditing(false);
        onClose();
      })
      .catch((err) => console.error(err))
      .finally(() => setSaving(false));
  };

  // Logout user
  const handleLogout = () => {
    const csrfToken = getCookie("csrftoken");
    axios
      .post(
        "/api/logout/",
        {},
        { withCredentials: true, headers: { "X-CSRFToken": csrfToken } }
      )
      .then(() => {
        // ✅ Clear auth context immediately
        setUser(null);
        window.dispatchEvent(new Event("authChange")); // notify Chatbot and other components
        onClose();
      })
      .catch((err) => console.error("Logout failed:", err));
  };

  const getInitials = (name) =>
    name ? name.split(" ").map((n) => n[0]).join("").toUpperCase() : "";

  const backgroundColor =
    theme.palette.mode === "dark" ? "rgba(50,50,50,0.95)" : "#fefefe";
  const textColor = theme.palette.mode === "dark" ? "#fff" : "#111";

  return (
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: 320,
          borderRadius: "16px",
          p: 2,
          background: backgroundColor,
          color: textColor,
          boxShadow:
            theme.palette.mode === "dark"
              ? "0px 6px 20px rgba(0,0,0,0.5)"
              : "0px 6px 20px rgba(0,0,0,0.15)",
        },
      }}
    >
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" py={4}>
          <CircularProgress size={28} />
        </Box>
      ) : (
        <>
          {/* Header */}
          <Box display="flex" alignItems="center" gap={2} mb={2}>
            <Avatar
              sx={{ bgcolor: theme.palette.primary.main, width: 48, height: 48 }}
            >
              {getInitials(userData.name)}
            </Avatar>
            <Box>
              <Typography fontWeight="bold">{userData.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                {userData.role}
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ mb: 2 }} />

          {/* Info / Edit Form */}
          {!isEditing ? (
            <Box display="flex" flexDirection="column" gap={1}>
              <Typography variant="body2">
                <b>Email:</b> {userData.email}
              </Typography>
              <Typography variant="body2">
                <b>Role:</b> {userData.role}
              </Typography>
              <Typography variant="body2">
                <b>GPA:</b> {userData.gpa}
              </Typography>
              <Typography variant="body2">
                <b>Stream:</b> {userData.stream}
              </Typography>
              <Typography variant="body2">
                <b>University:</b> {userData.university}
              </Typography>

              <Button
                fullWidth
                sx={{ mt: 2, borderRadius: "12px", textTransform: "none" }}
                variant="contained"
                onClick={() => setIsEditing(true)}
              >
                Edit Profile
              </Button>
            </Box>
          ) : (
            <Box display="flex" flexDirection="column" gap={1}>
              <TextField
                size="small"
                label="Name"
                value={userData.name}
                onChange={(e) => setUserData({ ...userData, name: e.target.value })}
              />
              <TextField size="small" label="Email" value={userData.email} disabled />
              <TextField size="small" label="Role" value={userData.role} disabled />
              <TextField
                size="small"
                label="GPA"
                type="number"
                value={userData.gpa}
                onChange={(e) => setUserData({ ...userData, gpa: e.target.value })}
              />
              <TextField
                select
                size="small"
                label="Stream"
                value={userData.stream}
                onChange={(e) => setUserData({ ...userData, stream: e.target.value })}
              >
                {streams.map((s) => (
                  <MenuItem key={s} value={s}>
                    {s}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                size="small"
                label="University"
                value={userData.university}
                onChange={(e) => setUserData({ ...userData, university: e.target.value })}
              />

              <Box display="flex" gap={1} mt={1}>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{ borderRadius: "12px" }}
                  onClick={handleSave}
                  disabled={saving}
                >
                  {saving ? "Saving..." : "Save"}
                </Button>
                <Button
                  fullWidth
                  variant="outlined"
                  sx={{ borderRadius: "12px" }}
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </Button>
              </Box>
            </Box>
          )}

          {/* Logout button */}
          <Divider sx={{ my: 2 }} />
          <Button
            fullWidth
            variant="contained"
            color="error"
            sx={{
              borderRadius: "12px",
              textTransform: "none",
              ":hover": { backgroundColor: "#d32f2f" },
            }}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </>
      )}
    </Menu>
  );
}
