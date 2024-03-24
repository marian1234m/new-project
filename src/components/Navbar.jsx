import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MoreIcon from "@mui/icons-material/MoreVert";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import { useContext } from 'react';
import { Context } from '../context/Context';


const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const newAdvertisement = 0;
const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function Navbar() {

  const { initialAdvertisements, setAdvertisements, user, setUser } = useContext(Context);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const navigate = useNavigate();

  const erase = () => {
    fetch(`http://localhost:3001/currentUser/${user?.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then(() => { setUser(null) })
  }
  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={() => {
        navigate('/Profile')
        handleMenuClose()
      }}>
        Profile
      </MenuItem>
      <MenuItem onClick={() => {
        navigate("myFavorites")
        handleMenuClose()
      }}>
        My favorites
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={() => {
        navigate('/Profile')
        handleMobileMenuClose()
      }}>
        <p>Profile</p>
      </MenuItem>
      <MenuItem onClick={() => {
        navigate('advertisements')
        handleMobileMenuClose()
      }}>
        <p>Advertisements</p>
      </MenuItem>
      <MenuItem onClick={() => {
        navigate('users')
        handleMobileMenuClose()
      }}>
        <p>Users</p>
      </MenuItem>
      {!user ? <MenuItem onClick={() => {
        navigate('/Login')
        handleMobileMenuClose()
      }}>
        <p>Log in</p>
      </MenuItem> : <></>}
      {!user ? <MenuItem onClick={() => {
        navigate('/Register')
        handleMobileMenuClose()
      }}>
        <p>Register</p>
      </MenuItem> : <></>}
      {user ? <MenuItem onClick={() => {
        erase()
        navigate('/Login')
        handleMobileMenuClose()
      }}>
        <p>Log out</p>
      </MenuItem> : <></>}
      <MenuItem onClick={() => {
        navigate('myFavorites')
        handleMobileMenuClose()
      }}>
        <p>My favorites</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar id="navv" position="static" style={{ backgroundColor: 'rgb(2,0,36)', }}>
        <Toolbar>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              onChange={(e) => {
                const arr = initialAdvertisements.filter((element) => element.title.toLowerCase().includes(e.target.value.toLowerCase()));
                setAdvertisements(arr);
              }}
            />
          </Search>
          <Button
              variant="text"
              style={{ 
                backgroundColor: 'rgba(255, 0, 0, 0.9)', 
                color: 'white',
                transition: 'background-color 0.3s' // adăuga o tranziție pentru efectul de hover
              }}
              onClick={() => navigate("/advertisement-form")}
              onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255, 0, 0, 1)'} // schimbă culoarea la hover
              onMouseLeave={(e) => e.target.style.backgroundColor = 'rgba(255, 0, 0, 0.9)'} // revine la culoarea             inițială
            >
              New Advertisement
          </Button>
          {/* <Autocomplete 
            id="search"
            freeSolo
            options={[]}
            renderInput={(params) => <TextField {...params} label="freeSolo" />}
          /> */}
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              color="inherit"
              onClick={() => navigate("/advertisements")}
            >
              Advertisements
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              color="inherit"
              onClick={() => navigate("/users")}
            >
              Users
            </IconButton>
            {user ? <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              color="inherit"
              onClick={() => {
                erase()
                navigate("/Login")
              }
              }>
              Log out
            </IconButton> : <></>}
            {!user ? <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              color="inherit"
              onClick={() => {
                navigate("/LogIn")
                erase()
              }}
            >
              Log In
            </IconButton> : <></>}
            {!user ? <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              color="inherit"
              onClick={() => navigate("/Register")}
            >
              Register
            </IconButton> : <></>}
          </Box>
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
