import React, { useState } from "react";
import {
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Modal,
  Box,
  IconButton,
  TablePagination,
  List,
  ListItem,
  Divider,
  Collapse,
  Chip,
  useTheme,
  useMediaQuery,
  Stack,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { format, parseISO } from "date-fns";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import EventDetailModalContent from "./EventDetailModalContent";
import CloseIcon from "@mui/icons-material/Close";


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "auto", // Adjusted for responsiveness
  maxWidth: "90vw", // Max width to avoid overflow on small screens
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const EventsTable = ({ events }) => {
  const [open, setOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5); 

  const handleOpen = (event) => {
    console.log(event)
    setSelectedEvent(event);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Grid item xs={12}>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
        Events
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Date</TableCell>
              <TableCell align="right">Duration</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {events
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              ?.map((event) => (
                <TableRow
                  key={event?.event?.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  hover
                >
                  <TableCell component="th" scope="row">
                    {event?.event?.name}
                  </TableCell>
                  <TableCell align="right">
                    ${event?.event?.event_price}
                  </TableCell>
                  <TableCell align="right">
                    {event?.event?.date_range &&
                    event?.event?.date_range.start_date
                      ? format(
                          new Date(event?.event?.date_range.start_date),
                          "PP"
                        )
                      : "N/A"}
                  </TableCell>
                  <TableCell align="right">
                    {event?.event?.duration} hrs
                  </TableCell>
                  <TableCell align="right">
                    <IconButton onClick={() => handleOpen(event)}>
                      <VisibilityIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={events?.length || 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
      {events && (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <ModalContent event={selectedEvent} onClose={handleClose} />
        </Modal>
      )}
    </Grid>
  );
};


const CollapsibleSection = ({ title, children }) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const sectionStyle = {
    "@media (max-width: 600px)": {
      // Styles for smaller screens
      fontSize: "0.9rem",
    },
  };

  return (
    <React.Fragment>
      <Typography
        variant="subtitle1"
        gutterBottom
        onClick={handleClick}
        sx={{
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          ...sectionStyle,
        }}
      >
        {title}
        <IconButton size="small" sx={{ ml: 1 }}>
          <ExpandMoreIcon
            sx={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
          />
        </IconButton>
      </Typography>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {children}
      </Collapse>
    </React.Fragment>
  );
};


const LocationListItem = ({ location }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <ListItem
      sx={{
        flexDirection: isSmallScreen ? "column" : "row",
        alignItems: isSmallScreen ? "flex-start" : "center",
        "&:not(:last-child)": {
          marginBottom: isSmallScreen ? 2 : 0,
        },
      }}
    >
      <Stack direction="row" spacing={1} sx={{ mb: isSmallScreen ? 1 : 0 }}>
        <LocationOnIcon color="primary" />
        <Typography variant="body2">
          {location.type === "physical"
            ? "Physical Location:"
            : "Online Platform:"}
        </Typography>
      </Stack>
      <Typography variant="body2">
        {location.address || location.platform_name}
      </Typography>
    </ListItem>
  );
};

const ModalContent = ({ event, onClose }) => {
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "500px", // Fixed width
  maxWidth: "95vw", // Maximum width relative to the viewport width
  minWidth: "100px",
  maxHeight: "80vh",
  overflowY: "auto",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  "@media (max-width: 600px)": {
    // Adjust for smaller screens
    width: "90vw", // Responsive width on small screens
  },
  };
  


  return (
    <Box sx={{ ...style }}>
      <div className="flex justify-between items-center">
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
          sx={{ mb: 2 }}
        >
          Event Details
        </Typography>
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
          }}
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>
      </div>
      <Divider sx={{ mb: 2 }} />
      <EventDetailModalContent event={event} />
      <Divider sx={{ my: 2 }} />
      <CollapsibleSection title="Location Details">
        <List>
          {event.location?.map((location, index) => (
            <LocationListItem key={index} location={location} />
          ))}
        </List>
      </CollapsibleSection>
      <Divider sx={{ my: 2 }} />
      <CollapsibleSection title="Questions">
        <List>
          {event.questions?.map((question, index) => (
            <ListItem
              key={index}
              sx={{ "@media (max-width: 600px)": { padding: "8px" } }}
            >
              <QuestionAnswerIcon sx={{ mr: 1 }} />
              <Typography
                variant="body2"
                sx={{ "@media (max-width: 600px)": { fontSize: "0.875rem" } }}
              >
                {question.text}
              </Typography>
              {question.is_required && (
                <Chip
                  label="Required"
                  size="small"
                  sx={{ ml: 2 }}
                  color="primary"
                />
              )}
            </ListItem>
          ))}
        </List>
      </CollapsibleSection>
    </Box>
  );
};

export default EventsTable;
