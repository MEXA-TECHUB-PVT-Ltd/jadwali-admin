import React, { useState } from "react";
import {
  List,
  ListItem,
  Typography,
  Grid,
  Box,
} from "@mui/material";
import { format, parseISO } from "date-fns";

const EventDetailItem = ({ title, value }) => {
  return (
    <ListItem sx={{ py: 2, borderBottom: "1px solid #eee" }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Typography variant="subtitle1" fontWeight="bold">
            {title}:
          </Typography>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Typography variant="body1">{value}</Typography>
        </Grid>
      </Grid>
    </ListItem>
  );
};

const EventDetailModalContent = ({ event }) => (
  <Box sx={{ width: "100%" }}>
    <List>
      <EventDetailItem
        title="Event Price"
        value={`$${event?.event?.event_price}`}
      />
      <EventDetailItem
        title="Deposit Price"
        value={`$${event?.event?.deposit_price}`}
      />
      <ListItem sx={{ py: 2, borderBottom: "1px solid #eee" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <Typography variant="subtitle1" fontWeight="bold">
              Description:
            </Typography>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Typography variant="subtitle1" fontWeight="bold">
              {event?.event?.description}
            </Typography>
            {/* <TextField
              multiline
              rows={3}
              value={event?.event?.description}
              readOnly
            /> */}
          </Grid>
        </Grid>
      </ListItem>
      <EventDetailItem
        title="Duration"
        value={`${event?.event?.duration} hours`}
      />
      <EventDetailItem
        title="One to One"
        value={event?.event?.one_to_one ? "Yes" : "No"}
      />
      <EventDetailItem
        title="Created At"
        value={format(parseISO(event?.event?.created_at), "PPpp")}
      />
    </List>
  </Box>
);

export default EventDetailModalContent;
