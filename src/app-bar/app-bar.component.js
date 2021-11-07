import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import './app-bar.component.scss';

function MyAppBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorEl2, setAnchorEl2] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenu2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleClose2 = () => {
    setAnchorEl2(null);
  };
  
  const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed" className="my-app-bar">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Kevin Kotosky - Coding Exercise EDB
            </Typography>
            <div>
              <Button
                size="large"
                aria-label="Choose create object menu"
                aria-controls="choose-create-menu"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
                variant="outlined"
                className="util-m-r-8"> Create </Button>
              <Menu
                id="choose-create-menu"
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
                onClose={handleClose}>
                  <Link to="/create-pet" className="my-app-bar__menu-link"> 
                    <Button className="my-app-bar__menu-item"> Pets </Button>
                  </Link>
              </Menu>

              <Button
                size="large"
                aria-label="Choose view objects menu"
                aria-controls="choose-view-menu"
                aria-haspopup="true"
                onClick={handleMenu2}
                color="inherit"
                variant="outlined"> View </Button>
              <Menu
                id="choose-view-menu"
                anchorEl={anchorEl2}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl2)}
                onClose={handleClose2}>
                  <Link to="/view-pets" className="my-app-bar__menu-link"> 
                    <Button className="my-app-bar__menu-item"> Pets </Button>
                  </Link>
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
      </Box>
      <Offset/>
    </div>
  );
}
export default MyAppBar;
