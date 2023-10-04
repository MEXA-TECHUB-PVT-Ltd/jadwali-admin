import React from 'react';
import { Typography, Card, CardContent, Divider, Box, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom'

const TermsConditions = () => {
    return (
        <>
            <Typography fontWeight='bold' fontSize='20px' color='#342E59' mb={5} gutterBottom>
                Terms & Conditions
            </Typography>
            <Card sx={{ borderRadius: '15px', padding: '10px' }}>
                <CardContent className='flex'>
                    <Box flex="1" pr={2}>
                        <Typography variant='body2' color='#818181' mb={3}>
                            The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice and all Agreements: "Client", "You" and "Your" refers to you, the person log on this website and compliant to the Company’s terms and conditions. "The Company", "Ourselves", "We", "Our" and "Us", refers to our Company. "Party", "Parties", or "Us", refers to both the Client and ourselves.
                        </Typography>
                        <Typography variant="h6" gutterBottom>
                            Content Liability
                        </Typography>
                        <Typography variant='body2' color='#818181' mb={3}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed fringilla felis in lectus vulputate, in posuere arcu tempor. Aenean euismod, lorem et ultrices sagittis, leo sem hendrerit odio, non bibendum dolor lectus id odio. Lorem ipsum
                        </Typography>
                        <Typography variant="h6" gutterBottom>
                            iFrames
                        </Typography>
                        <Typography variant='body2' color='#818181' mb={3}>
                            Most interactive websites use cookies to let us retrieve the user’s details for each visit. Cookies are used by our website to enable the functionality of certain areas to make it easier for people visiting our website.
                        </Typography>
                        <Typography variant="h6" gutterBottom>
                            Hyperlinking to our Content
                        </Typography>
                        <Typography variant='body2' color='#818181' mb={3}>
                            Most interactive websites use cookies to let us retrieve the user’s details for each visit. Cookies are used by our website to enable the functionality of certain areas to make it easier for people visiting our website.
                        </Typography>
                        <Typography variant="h6" gutterBottom>
                            Cookies
                        </Typography>
                        <Typography variant='body2' color='#818181' mb={3}>
                            Most interactive websites use cookies to let us retrieve the user’s details for each visit. Cookies are used by our website to enable the functionality of certain areas to make it easier for people visiting our website.
                        </Typography>
                        <Typography variant="h6" gutterBottom>
                            License
                        </Typography>
                    </Box>
                    <Divider orientation="vertical" flexItem />
                    <Box flex=".3" pl={5}>
                        <Box component="ul" sx={{ listStyleType: 'none', p: 0, m: 0 }}>
                            <Box component="li" sx={{ mb: '1em', mt: '2em' }}>
                                <Link component={RouterLink} to="#" color="text.primary" sx={{ '&:hover': { textDecoration: 'underline' } }}>
                                    Content Liability
                                </Link>
                            </Box>
                            <Box component="li" sx={{ mb: '1em' }}>
                                <Link component={RouterLink} to="#" color="#6C309C" sx={{ '&:hover': { textDecoration: 'underline' } }}>
                                    Hyperlinking to our Content
                                </Link>
                            </Box>
                            <Box component="li" sx={{ mb: '1em' }}>
                                <Link component={RouterLink} to="#" color="text.primary" sx={{ '&:hover': { textDecoration: 'underline' } }}>
                                    Cookies
                                </Link>
                            </Box>
                            <Box component="li" sx={{ mb: '1em' }}>
                                <Link component={RouterLink} to="#" color="text.primary" sx={{ '&:hover': { textDecoration: 'underline' } }}>
                                    Reservation of rights
                                </Link>
                            </Box>
                            <Box component="li">
                                <Link component={RouterLink} to="#" color="text.primary" sx={{ '&:hover': { textDecoration: 'underline' } }}>
                                    Content liability
                                </Link>
                            </Box>
                        </Box>
                    </Box>
                </CardContent>
            </Card>
        </>
    );
}

export default TermsConditions;
