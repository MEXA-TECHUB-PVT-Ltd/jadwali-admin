import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SearchIcon from '@mui/icons-material/Search';
import Avatar from '@mui/material/Avatar';
import InputBase from '@mui/material/InputBase';
import { Box, Button, Typography } from '@mui/material';
import { NavLink, useLocation } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import React from 'react';
import ExitToAppIcon from '@mui/icons-material/ExitToApp'; // Don't forget to import the logout icon
import { Outlet } from 'react-router-dom';
import { navItems } from '../../utils/dashboardLinks';


const Layout = () => {
    return (
        <>
            <div style={{ display: 'flex' }}>
                <SideNav />
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <TopHeader />
                    <div style={{ padding: '20px', marginLeft: '250px' }}>
                        <Outlet />
                    </div>
                </div>
            </div>

        </>
    )
}

export default Layout


const SideNav = () => {
    const [hoverIndex, setHoverIndex] = React.useState<any>(null);

    const handleHover = (index: any) => {
        setHoverIndex(index);
    };

    const handleHoverExit = () => {
        setHoverIndex(null);
    };
    return (

        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            // width: '250px',
            backgroundColor: 'rgba(108, 48, 156, 1)',
            height: '100vh',
            position: 'fixed',
        }}>
            <div>
                <List>
                    <Typography
                        className='text-center'
                        sx={{
                            fontSize: '30px',
                            color: '#fff',
                            fontWeight: 'medium',
                            mt: 5,
                            mb: 6
                        }}
                    >
                        JADWALI
                    </Typography>
                    {navItems.map(({ text, icon, path }, index) => {
                        // Get the current location
                        const location = useLocation();

                        // Check if the link is active
                        const isActive = location.pathname === path;

                        return (
                            <ListItem
                                key={text}
                                className="listItem"
                                onMouseEnter={() => handleHover(index)}
                                onMouseLeave={handleHoverExit}
                            >
                                <NavLink
                                    to={path}
                                    className={isActive ? 'link activeLink' : 'link'}
                                >
                                    <ListItemIcon
                                        className="listItemIcon"
                                        style={{
                                            color: index === hoverIndex || isActive ? 'rgba(108, 48, 156, 1)' : 'white',
                                            transition: 'color 0.3s ease'
                                        }}
                                    >
                                        {icon}
                                    </ListItemIcon>
                                    <ListItemText primary={text} />
                                </NavLink>
                            </ListItem>
                        );
                    })}
                </List>
            </div>
            <div style={{ padding: '16px' }}>
                <Button
                    startIcon={<ExitToAppIcon />}
                    fullWidth
                    variant="contained"
                    style={{
                        backgroundColor: 'white',
                        color: 'rgba(108, 48, 156, 1)',
                        transition: 'background-color 0.3s ease'
                    }}
                    onClick={() => {
                        // Handle logout here
                    }}
                >
                    Log Out
                </Button>
            </div>
            {/* </div> */}
        </div>
    );
};

const TopHeader = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                padding: '0 20px',
                backgroundColor: '#C7AEDB',
                height: '50px'
            }}
        >
            <Box sx={{
                display: 'flex', alignItems: 'center', marginLeft: 'auto',
                backgroundColor: "white", borderRadius: '20px', padding: '0 5px'
            }}>
                <SearchIcon sx={{
                    fontSize: '20px',
                    color: '#959595',
                }} />
                <InputBase placeholder="Search…" sx={{ pl: 1 }} />
            </Box>
            <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"

            >
                <Avatar alt="Remy Sharp" sx={{
                    backgroundColor: 'rgba(108, 48, 156, 1)'
                }}
                />
            </IconButton>
            <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
            </Menu>
        </Box>
    )
};
