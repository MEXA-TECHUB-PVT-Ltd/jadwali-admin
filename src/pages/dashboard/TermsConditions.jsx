import React, { useState } from 'react';
import { Typography, Card, CardContent, Divider, Box, Link, useMediaQuery, useTheme } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom'

const TermsConditions = () => {
          const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
    const [activeId, setActiveId] = useState(null);

    const handleClick = (id) => {
      setActiveId(id);
      document
        .getElementById(id)
        .scrollIntoView({ behavior: "smooth", block: "start" });
    };
    return (
      <>
        <div>
          <Typography
            fontWeight="bold"
            fontSize="20px"
            color="#342E59"
            mb={5}
            gutterBottom
          >
            Terms & Conditions
          </Typography>
          <Card sx={{ borderRadius: "15px", padding: "10px" }}>
            <CardContent
              style={{
                display: "flex",
                flexDirection: isSmallScreen ? "column-reverse" : "row",
                flexWrap: "wrap",
              }}
            >
              <Box flex="1" sx={{ padding: "0 40px" }}>
                {sections.map((section) => (
                  <div
                    key={section.id}
                    id={section.id}
                    className={activeId === section.id ? "highlighted" : ""}
                  >
                    <Typography variant="h6" gutterBottom>
                      {section.title}
                    </Typography>
                    <Typography variant="body2" color="#818181" mb={3}>
                      {section.content || ""}
                    </Typography>
                  </div>
                ))}
                <Typography variant="body2" color="#818181" mb={3}>
                  By using the Jadwali app, users agree to abide by these terms
                  and conditions. Failure to comply may result in the
                  termination of the user's account and access to the platform.
                </Typography>
              </Box>
              <Divider orientation="vertical" flexItem />
              <Box flex=".3" pl={5}>
                <Box component="ul" sx={{ listStyleType: "none", p: 0, m: 0 }}>
                  {sections.map((section) => (
                    <Box
                      component="li"
                      sx={{ mb: "1em", mt: "2em" }}
                      key={section.id}
                    >
                      <a
                        href={`#${section.id}`}
                        className={`link-term ${
                          activeId === section.id ? "active-link-term" : ""
                        }`}
                        onClick={() => handleClick(section.id)}
                      >
                        {section.title}
                      </a>
                    </Box>
                  ))}
                </Box>
              </Box>
            </CardContent>
          </Card>
        </div>
      </>
    );
}

export default TermsConditions;




const sections = [
  {
    id: "account-creation",
    title: "Account Creation",
    content:
      "Users must create an account to access and use Jadwali's features. Account information must be accurate, and users are responsible for maintaining the confidentiality of their login credentials.",
  },
  {
    id: "event-creation",
    title: "Event Creation",
    content:
      "Users are solely responsible for the accuracy of event details, including date, time, and location. The platform is not liable for any discrepancies in event information.",
  },
  {
    id: "event-privacy",
    title: "Event Privacy",
    content:
      "Private event organizers are responsible for sharing unique event links only with intended participants. Public events are open to users with similar preferences based on availability.",
  },
  {
    id: "availability-preferences",
    title: "Availability and Preferences",
    content:
      "Users should provide accurate availability information and preferences. The platform facilitates connections based on user-provided data.",
  },
  {
    id: "subscription-payments",
    title: "Subscription and Payments",
    content:
      "In-app purchases for premium features are non-refundable. Users agree to the terms of the payment provider for subscription transactions. Tap payments for event participation are subject to the platform's payment policies.",
  },
  {
    id: "event-joining",
    title: "Event Joining",
    content:
      "Users joining private events through shared links must respect the privacy of the event and other participants. Participants in public events should adhere to the event's guidelines and purpose.",
  },
  {
    id: "schedule-management",
    title: "Schedule Management",
    content:
      "Users can view, schedule, reschedule, or cancel events based on availability. Event organizers should provide valid reasons for event cancellations.",
  },
  {
    id: "community-conduct",
    title: "Community Conduct",
    content:
      "Users are expected to engage respectfully and responsibly within the Jadwali community. Any form of harassment, abuse, or inappropriate behavior is strictly prohibited.",
  },
  {
    id: "data-privacy",
    title: "Data Privacy",
    content:
      "Jadwali collects and processes user data in accordance with its Privacy Policy. Users are encouraged to review and understand the Privacy Policy for information on data handling and security.",
  },
  {
    id: "liability-dispute-resolution",
    title: "Liability and Dispute Resolution",
    content:
      "Jadwali is not responsible for any inaccuracies in event details or disruptions during events. Disputes arising from the use of the platform will be resolved in accordance with applicable laws and regulations.",
  },
  {
    id: "modifications-to-terms",
    title: "Modifications to Terms",
    content:
      "Jadwali reserves the right to modify these terms and conditions at any time. Users will be notified of significant changes, and continued use of the platform implies acceptance of the updated terms.",
  },
];

