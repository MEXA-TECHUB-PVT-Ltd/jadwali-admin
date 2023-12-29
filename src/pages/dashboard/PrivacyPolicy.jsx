import React, { useState } from 'react';
import { Typography, Card, CardContent, Divider, Box, Link, useMediaQuery, useTheme } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom'

const PrivacyPolicy = () => {
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
          Privacy Policy
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
                By using the Jadwali app, users agree to the terms outlined in
                this privacy policy. It is recommended that users review this
                policy regularly to stay informed about how their data is being
                handled and protected.
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
};



const sections = [
  {
    id: "collection-of-information",
    title: "Collection of Information",
    content:
      "Jadwali collects user information, including but not limited to, account details, event preferences, and transaction data. The platform may use cookies and similar technologies to enhance user experience.",
  },
  {
    id: "use-of-information",
    title: "Use of Information",
    content:
      "User data is used to provide, personalize, and improve Jadwali's services. Information may be utilized for communication, account management, and to enhance the overall user experience.",
  },
  {
    id: "data-sharing",
    title: "Data Sharing",
    content:
      "Jadwali does not sell, trade, or rent user information to third parties. Data may be shared with service providers for platform functionality and improvement.",
  },
  {
    id: "event-information",
    title: "Event Information",
    content:
      "Event details provided by users, including date, time, and location, are used to facilitate event organization and connections based on preferences.",
  },
  {
    id: "payment-information",
    title: "Payment Information",
    content:
      "Payment information for in-app purchases and event transactions is securely processed through third-party payment providers.",
  },
  {
    id: "security-measures",
    title: "Security Measures",
    content:
      "Jadwali employs reasonable security measures to protect user data from unauthorized access, disclosure, alteration, and destruction.",
  },
  {
    id: "user-controls",
    title: "User Controls",
    content:
      "Users have the right to access, modify, or delete their personal information through the app settings. Opt-out mechanisms are provided for promotional communications.",
  },
  {
    id: "childrens-privacy",
    title: "Children's Privacy",
    content:
      "Jadwali is not intended for users under the age of 13. The platform does not knowingly collect personal information from children.",
  },
  {
    id: "changes-to-privacy-policy",
    title: "Changes to Privacy Policy",
    content:
      "Jadwali reserves the right to update the privacy policy as needed. Users will be notified of significant changes, and continued use of the platform implies acceptance of the updated policy.",
  },
  {
    id: "compliance-with-laws",
    title: "Compliance with Laws",
    content:
      "Jadwali complies with applicable data protection laws and regulations. Users are encouraged to review the privacy policy regularly for any updates.",
  },
  {
    id: "contact-information",
    title: "Contact Information",
    content:
      "Users can contact Jadwali for inquiries or concerns related to privacy at [jadwalisupport@gmail.com]. By using the Jadwali app, users agree to the terms outlined in this privacy policy. It is recommended that users review this policy regularly to stay informed about how their data is being handled and protected.",
  },
];



export default PrivacyPolicy;
