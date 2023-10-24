import React from 'react';
import { Typography, Card, CardContent, Divider, Box, Link, useMediaQuery, useTheme } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom'

const TermsConditions = () => {
          const theme = useTheme();
          const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
    return (
      <>
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
            className="flex flex-wrap"
            sx={{ flexDirection: isSmallScreen ? "column-reverse" : "row" }}
          >
            <Box flex="1" sx={{ padding: "0 40px", mt: isSmallScreen ? 4 : 0 }}>
              <Typography variant="body2" color="#818181" mb={3}>
                The following terminology applies to these Terms and Conditions,
                Privacy Statement and Disclaimer Notice and all Agreements:
                "Client", "You" and "Your" refers to you, the person log on this
                website and compliant to the Company’s terms and conditions.
                "The Company", "Ourselves", "We", "Our" and "Us", refers to our
                Company. "Party", "Parties", or "Us", refers to both the Client
                and ourselves.
              </Typography>
              <Typography variant="h6" gutterBottom id="content">
                Content Liability
              </Typography>
              <Typography variant="body2" color="#818181" mb={3}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                fringilla felis in lectus vulputate, in posuere arcu tempor.
                Aenean euismod, lorem et ultrices sagittis, leo sem hendrerit
                odio, non bibendum dolor lectus id odio. Lorem ipsum
              </Typography>
              <Typography variant="h6" gutterBottom id="iframe">
                iFrames
              </Typography>
              <Typography variant="body2" color="#818181" mb={3}>
                Most interactive websites use cookies to let us retrieve the
                user’s details for each visit. Cookies are used by our website
                to enable the functionality of certain areas to make it easier
                for people visiting our website.
              </Typography>
              <Typography variant="h6" gutterBottom id="cookies">
                Cookies
              </Typography>
              <Typography variant="body2" color="#818181" mb={3}>
                Most interactive websites use cookies to let us retrieve the
                user’s details for each visit. Cookies are used by our website
                to enable the functionality of certain areas to make it easier
                for people visiting our website.
              </Typography>
              <Typography variant="h6" gutterBottom id="license">
                License
              </Typography>
            </Box>
            <Divider orientation="vertical" flexItem />
            <Box flex=".3" pl={5}>
              <Box component="ul" sx={{ listStyleType: "none", p: 0, m: 0 }}>
                <Box component="li" sx={{ mb: "1em", mt: "2em" }}>
                  <a href="#content" style={{ color: "#000" }}>
                    Content Liability
                  </a>
                </Box>
                <Box component="li" sx={{ mb: "1em" }}>
                  <a href="#cookies" style={{ color: "#000" }}>
                    Cookies
                  </a>
                </Box>
                <Box component="li" sx={{ mb: "1em" }}>
                  <a href="#reservation" style={{ color: "#000" }}>
                    Reservation of rights
                  </a>
                </Box>
                <Box component="li">
                  <a href="#license" style={{ color: "#000" }}>
                    License
                  </a>
                </Box>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </>
    );
}

export default TermsConditions;
