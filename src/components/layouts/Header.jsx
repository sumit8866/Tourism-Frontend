import React, { useState, useEffect } from "react";
import {
  Box,
  Drawer,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Logo from "../../assets/image/logo.png";
import { Link } from "react-router-dom"; 

const navItems = ["Home", "About", "Tour", "Hotels", "Contact", "Login"];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Box
        sx={{
          height: "80px",
          width: "100%",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 1300,
          backgroundColor: scrolled ? "#000" : "transparent",
          transition: "background-color 0.3s ease",
        }}
      >
        <Box
          width={{ xs: "100%", md: "80%" }}
          mx="auto"
          height="100%"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box paddingLeft={'10px'}>
            <Link to="/">
              <img src={Logo} alt="Logo" style={{width:'100%'}} />
            </Link>
          </Box>

          <Box
            component="nav"
            sx={{
              display: { xs: "none", md: "block" },
            }}
          >
            <ul
              style={{
                display: "flex",
                listStyle: "none",
                gap: "30px",
                margin: 0,
                padding: 0,
              }}
            >
              {navItems.map((item) => (
                <li key={item}>
                  <Link
                    to={`/${item.toLowerCase().replace(/\s/g, "")}`}
                    style={{
                      color: "white",
                      textDecoration: "none",
                      fontWeight: "500",
                      fontSize: "16px",
                    }}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </Box>

          <IconButton 
            sx={{ color: "white", marginRight:'10px', display: { xs: "block", md: "none" } }}
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
        </Box>
      </Box>

      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        PaperProps={{
          sx: { backgroundColor: "#111", color: "white", width: 250 },
        }}
      >
        <Box p={2}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">Menu</Typography>
            <IconButton onClick={handleDrawerToggle} sx={{ color: "white" }}>
              <CloseIcon />
            </IconButton>
          </Box>
          <ul style={{ listStyle: "none", padding: "20px 0", margin: 0 }}>
            {navItems.map((item) => (
              <li key={item} style={{ marginBottom: "15px" }}>
                <Link
                  to={`/${item.toLowerCase().replace(/\s/g, "")}`}
                  onClick={handleDrawerToggle} // Close drawer on click
                  style={{
                    color: "white",
                    textDecoration: "none",
                    fontSize: "16px",
                    display: "block",
                    padding: "5px 0",
                  }}
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </Box>
      </Drawer>
    </>
  );
};

export default Header;
