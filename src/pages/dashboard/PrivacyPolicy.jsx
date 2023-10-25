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
    id: "content",
    title: "Content Liability",
    content:
      'The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice and all Agreements: "Client", "You" and "Your" refers to you, the person log on this website and compliant to the Company’s terms and conditions. "The Company", "Ourselves", "We", "Our" and "Us", refers to our Company. "Party", "Parties", or "Us", refers to both the Client and ourselves.',
  },
  {
    id: "iframe",
    title: "iFrames",
    content:
      "Without prior approval and written permission, you may not create frames around our Webpages that alter in any way the visual presentation or appearance of our Website.",
  },
  {
    id: "cookies",
    title: "Cookies",
    content:
      "We employ the use of cookies. By accessing [your site name], you agreed to use cookies in agreement with the [your company name]'s Privacy Policy.",
  },
  {
    id: "license",
    title: "License",
    // content:
    //   "Unless otherwise stated, [your company name] and/or its licensors own the intellectual property rights for all material on [your site name]. All intellectual property rights are reserved. You may access this from [your site name] for your own personal use subjected to restrictions set in these terms and conditions.",
  },
  // ... add any additional sections here
];



export default PrivacyPolicy;
