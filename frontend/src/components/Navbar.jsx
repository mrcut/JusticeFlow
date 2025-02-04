import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person"; // Icône utilisateur
import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  useMediaQuery,
  useTheme,
  Modal,
  Typography,
} from "@mui/material";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import logo from "/assets/logo/logo.png";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const [isLoggedIn, setIsLoggedIn] = useState(!!user);

  // ✅ Met à jour l'état `isLoggedIn` en temps réel
  useEffect(() => {
    setIsLoggedIn(!!user);
  }, [user]);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleModalToggle = () => {
    setModalOpen(!modalOpen);
  };

  const menuItems = [
    { text: "Dashboard", link: "/dashboard" },
    { text: "Historique", link: "/history" },
    { text: "Prédictions", link: "/predictions" },
  ];

  const drawer = (
    <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerToggle}>
      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            component={Link}
            to={item.link}
            key={item.text}
            onClick={handleDrawerToggle}
          >
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );

  return (
    <AppBar position="static" sx={{ zIndex: 1000, minHeight: "90px" }}>
      <Toolbar
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr",
          alignItems: "center",
        }}
      >
        {isMobile && (
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleDrawerToggle}
            sx={{ gridColumn: "1 / 2" }}
          >
            <MenuIcon />
          </IconButton>
        )}
        <Box
          component={Link}
          to="/"
          sx={{
            gridColumn: "2 / 3",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <img src={logo} alt="JusticeFlow" style={{ height: 90 }} />
        </Box>
        {!isMobile && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              gridColumn: "3 / 4",
              alignItems: "center",
            }}
          >
            {menuItems.map((item) => (
              <Button
                color="inherit"
                component={Link}
                to={item.link}
                key={item.text}
              >
                {item.text}
              </Button>
            ))}

            {/* ✅ Affichage en temps réel */}
            {isLoggedIn ? (
              <Button color="error" onClick={logout}>
                Déconnexion
              </Button>
            ) : (
              <IconButton color="inherit" onClick={handleModalToggle}>
                <PersonIcon />
              </IconButton>
            )}
          </Box>
        )}
      </Toolbar>
      {drawer}

      {/* Modal d'authentification */}
      <Modal open={modalOpen} onClose={handleModalToggle}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 300,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            textAlign: "center",
          }}
        >
          <Typography variant="h6" sx={{ mb: 2 }}>
            Login
          </Typography>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            component={Link}
            to="/login"
            onClick={handleModalToggle}
            sx={{ mb: 1 }}
          >
            Se connecter
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            fullWidth
            component={Link}
            to="/register"
            onClick={handleModalToggle}
          >
            S'inscrire
          </Button>
        </Box>
      </Modal>
    </AppBar>
  );
}

export default Navbar;
