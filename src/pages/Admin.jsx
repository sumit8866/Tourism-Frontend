import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import Multiphoto from "../components/tour/Touradd";
import Hero from "../components/common/Slider";
import Tours from "../components/tour/TourData";
import HotelUploader from "../components/hotel/HotelAdd";
import { useState, useCallback } from "react";

const drawerWidth = 200;

function ResponsiveDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState("home");

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const handleMenuClick = useCallback((text) => {
    switch (text) {
      case "Add Tour":
        setSelectedComponent("multiphoto");
        break;
      case "Home":
        setSelectedComponent("hero");
        break;
      case "Our Tours":
        setSelectedComponent("tours");
        break;
      case "Add Hotel":
        setSelectedComponent("addhotel");
        break;
      default:
        setSelectedComponent("home");
    }
    handleDrawerClose();
  }, []);

  const menuItems = ["Home", "Add Tour", "Our Tours", "Add Hotel"];

  const iconMap = {
    "Home": <InboxIcon />,
    "Add Tour": <MailIcon />,
    "Our Tours": <InboxIcon />,
    "Add Hotel": <MailIcon />,
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {menuItems.map((text) => (
          <ListItem key={text} disablePadding>
            <ListItemButton onClick={() => handleMenuClick(text)}>
              <ListItemIcon>{iconMap[text]}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const renderComponent = () => {
    switch (selectedComponent) {
      case "multiphoto":
        return <Multiphoto />;
      case "hero":
        return <Hero />;
      case "tours":
        return <Tours />;
      case "addhotel":
        return <HotelUploader />;
      default:
        return (
          <Typography sx={{ marginBottom: 2 }}>
            Welcome to the dashboard!
          </Typography>
        );
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
            edge="start"
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Admin
          </Typography>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {renderComponent()}
      </Box>
    </Box>
  );
}

ResponsiveDrawer.propTypes = {
  window: PropTypes.func,
};

export default ResponsiveDrawer;
