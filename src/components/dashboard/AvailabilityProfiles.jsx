import React from "react";
import {
  Grid,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  Chip,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import ScheduleIcon from "@mui/icons-material/Schedule";
import { styled } from "@mui/material/styles";

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

const AccordionDetailsScrollable = styled(AccordionDetails)(({ theme }) => ({
  maxHeight: "500px", // Adjust this value as needed
  overflowY: "auto",
  flexDirection: "column",
}));

const AvailabilityProfiles = ({ user }) => {
  return (
    <Grid item xs={12}>
      <AccordionDetailsScrollable>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ fontWeight: 600, fontSize: "1.5rem", mb: 4 }}
        >
          Availabilities
        </Typography>
        {user.availability_profiles?.map((profile, index) => (
          <StyledAccordion key={profile.profile_id} sx={{ mb: 2 }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${index}-content`}
              id={`panel${index}-header`}
              sx={{ backgroundColor: "background.default", p: 2 }}
            >
              <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                Availability {index + 1}
              </Typography>
            </AccordionSummary>
            <List>
              {profile.availabilities?.map((avail) => (
                <ListItem
                  key={avail.availability_id}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    mb: 2,
                  }}
                >
                  <Typography variant="body1" sx={{ fontWeight: 400, mb: 1 }}>
                    {avail.day_of_week}
                  </Typography>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      flexWrap: "wrap",
                    }}
                  >
                    <StyledChip
                      icon={
                        avail.is_available ? (
                          <CheckCircleOutlineIcon />
                        ) : (
                          <CancelOutlinedIcon />
                        )
                      }
                      label={avail.is_available ? "Available" : "Not Available"}
                      color={avail.is_available ? "primary" : "secondary"}
                      variant="outlined"
                    />
                    {avail.time_slots &&
                      avail.time_slots.map((slot) => (
                        <StyledChip
                          key={slot.id}
                          icon={<ScheduleIcon />}
                          label={`${slot.start_time} - ${slot.end_time}`}
                          variant="outlined"
                        />
                      ))}
                  </div>
                </ListItem>
              ))}
            </List>
          </StyledAccordion>
        ))}
      </AccordionDetailsScrollable>
    </Grid>
  );
};

export default AvailabilityProfiles;
