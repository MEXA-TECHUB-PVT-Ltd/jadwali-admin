import React from "react";
import { Grid, Typography, Avatar, Box, useTheme } from "@mui/material";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import CreditCardOutlinedIcon from "@mui/icons-material/CreditCardOutlined";
import BlockOutlinedIcon from "@mui/icons-material/BlockOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import { format } from "date-fns";

const UserProfile = ({ user }) => {
  const theme = useTheme();
  const formatDate = (dateString) => format(new Date(dateString), "PPpp");

  return (
    <Box
      sx={{
        flexGrow: 1,
        p: theme.spacing(6),
        bgcolor: theme.palette.background.paper,
        color: theme.palette.text.primary,
      }}
    >
      <Grid container spacing={6} alignItems="center" justifyContent="center">
        <Grid
          item
          xs={12}
          sm={6}
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <Avatar
            sx={{
              bgcolor: theme.palette.primary.main,
              width: theme.spacing(20),
              height: theme.spacing(20),
              fontSize: theme.spacing(7),
              color: theme.palette.background.paper,
              mb: 3,
            }}
          >
            {user.full_name.charAt(0).toUpperCase()}
          </Avatar>
          <Typography variant="h3" sx={{ fontWeight: "medium", mb: 1 }}>
            {user.full_name}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          {[
            { icon: <EmailOutlinedIcon />, label: "Email", value: user.email },
            {
              icon: <CreditCardOutlinedIcon />,
              label: "Payment",
              value: user.payment ? "Yes" : "No",
            },
            {
              icon: <BlockOutlinedIcon />,
              label: "Block Status",
              value: user.block_status ? "Blocked" : "Not Blocked",
            },
            {
              icon: <AccessTimeOutlinedIcon />,
              label: "Joined",
              value: formatDate(user.created_at),
            },
            {
              icon: <AccessTimeOutlinedIcon />,
              label: "Last Update",
              value: formatDate(user.updated_at),
            },
          ].map((info, index) => (
            <InfoLine
              key={index}
              icon={info.icon}
              label={info.label}
              value={info.value}
            />
          ))}
        </Grid>
      </Grid>
    </Box>
  );
};

const InfoLine = ({ icon, label, value }) => {
  const theme = useTheme();

  return (
    <Box sx={{ display: "flex", alignItems: "center", mb: theme.spacing(2) }}>
      <Box sx={{ color: theme.palette.primary.dark, mr: 2, display: "flex" }}>
        {icon}
      </Box>
      <Typography variant="body1" sx={{ flexGrow: 1 }}>
        <strong>{label}:</strong> {value}
      </Typography>
    </Box>
  );
};

export default UserProfile;
