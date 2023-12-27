import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { get } from "../../server/server";
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Alert,
  List,
  ListItem,
  Divider,
  Grid,
  ListItemIcon,
  ListItemText,
  Avatar,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ScheduleIcon from "@mui/icons-material/Schedule";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import EventBusyIcon from "@mui/icons-material/EventBusy";
import {
  Email,
  CalendarToday,
  CheckCircle,
  DoNotDisturb,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import AvailabilityProfiles from "../../components/dashboard/AvailabilityProfiles";
import EventsTable from "../../components/dashboard/EventsList";
import UserProfile from "../../components/dashboard/UserProfile";

const StyledAccordion = styled(Accordion)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  boxShadow: "none",
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
  "&.Mui-expanded": {
    margin: "auto",
  },
}));

const StyledChip = styled(Chip)(({ theme }) => ({
  margin: theme.spacing(0.5),
  fontSize: theme.typography.body2.fontSize,
}));

const StyledAccordionDetails = styled(AccordionDetails)({
  maxHeight: "250px", // Set a maximum height to your preference
  overflowY: "auto", // Make it scrollable
});

const UserDetails = () => {
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const [events, setEvents] = useState(null);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const { id } = params;

  const fetchUserDetails = async () => {
    setLoading(true);
    setError("");
    try {
      const { res, err } = await get(`/users/getAllDetails/${id}`);
      if (res) {
        setUser(res?.user);
        setEvents(res.user.events);
      } else {
        setError("No user data found.");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred while fetching user details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchUserDetails();
    }
  }, [id]);

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <Card sx={{ minWidth: 275, boxShadow: 3 }}>
      <CardContent>
        {user ? (
          <Grid container spacing={2}>
            <UserProfile user={user} />
            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
            </Grid>
            <AvailabilityProfiles user={user} />
            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
            </Grid>
            <EventsTable events={events} />
          </Grid>
        ) : (
          <Typography>No user details available</Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default UserDetails;
