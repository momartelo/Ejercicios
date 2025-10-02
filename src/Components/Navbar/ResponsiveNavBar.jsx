// import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import HomeIcon from "@mui/icons-material/Home";
import AdbIcon from "@mui/icons-material/Adb";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import { Link as RouterLink } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../../Context/CartContext";
import { useAuth } from "../../Context/AuthContex";
import styles from "./ResponsiveNavBar.module.css";

const pages = [
  { name: "Proyectos", path: "/proyects" },
  { name: "Ejercicios", path: "/exercises" },
  { name: "Equipo", path: "/team" },
];

const productMenuItems = [
  { name: "Productos", path: "/listpage" },
  { name: "Productos MockAPI", path: "/productsmockAPI" },
  { name: "Productos FakeAPI", path: "/productsFakeAPI" },
];

const settings = [
  { name: "Perfil", path: "/profile" },
  { name: "Cuenta", path: "/account" },
  { name: "Logout", action: "logout" },
];

// ... imports y constantes previas

export default function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [isProductMenuOpen, setIsProductMenuOpen] = useState(false);

  const { carrito } = useCart();
  const { isLoggedIn, login, logout } = useAuth();

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);

  // Manejo del menú de productos
  const handleOpenProductMenu = () => setIsProductMenuOpen(true);
  const handleCloseProductMenu = () => setIsProductMenuOpen(false);

  const handleCloseNavMenu = () => setAnchorElNav(null);
  const handleCloseUserMenu = (evt, setting) => {
    setAnchorElUser(null);
    if (setting?.action === "logout") {
      logout();
    }
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{ background: "linear-gradient(90deg,#0f172a,#1f2937)" }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* Botón de inicio */}
            <Tooltip title="Inicio" arrow>
              <IconButton
                component={RouterLink}
                to="/"
                aria-label="Inicio"
                color="inherit"
                sx={{
                  display: { xs: "none", md: "flex" },
                  mr: 1,
                  color: "white",
                  "&:hover": { color: "#d9d9d9" },
                }}
              >
                <HomeIcon sx={{ fontSize: 40 }} />
              </IconButton>
            </Tooltip>

            {/* Menú hamburguesa en mobile */}
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="open navigation menu"
                aria-controls={anchorElNav ? "menu-appbar-nav" : undefined}
                aria-haspopup="true"
                aria-expanded={Boolean(anchorElNav)}
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>

              <Menu
                id="menu-appbar-nav"
                anchorEl={anchorElNav}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                transformOrigin={{ vertical: "top", horizontal: "left" }}
                keepMounted
                sx={{ display: { xs: "block", md: "none" } }}
              >
                {/* Menú de productos en mobile */}
                {productMenuItems.map((item) => (
                  <MenuItem
                    key={item.name}
                    component={RouterLink}
                    to={item.path}
                    onClick={handleCloseNavMenu}
                  >
                    <Typography textAlign="center">{item.name}</Typography>
                  </MenuItem>
                ))}
                {/* Resto de páginas en mobile */}
                {pages.map((page) => (
                  <MenuItem
                    key={page.name}
                    component={RouterLink}
                    to={page.path}
                    onClick={handleCloseNavMenu}
                  >
                    <Typography textAlign="center">{page.name}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            {/* Logo en mobile */}
            <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component={RouterLink}
              to="/"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              LOGO
            </Typography>

            {/* Links en desktop */}
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {/* Menú desplegable de Productos - SOLUCIÓN PERSONALIZADA */}
              <Box
                onMouseEnter={handleOpenProductMenu}
                onMouseLeave={handleCloseProductMenu}
                sx={{ position: "relative" }}
              >
                <Button
                  disableFocusRipple
                  sx={{
                    my: 2,
                    mx: 1.5,
                    display: "block",
                    textTransform: "none",
                    fontSize: "1.25rem",
                    color: "white",
                    "&:hover": {
                      color: "#d9d9d9",
                      backgroundColor: "rgba(255, 255, 255, 0.04)", // ← Fondo sutil en hover
                    },
                    "&:focus": {
                      outline: "none", // ← Outline sutil
                    },
                  }}
                >
                  Productos
                </Button>
                {isProductMenuOpen && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: "100%",
                      left: 0,
                      backgroundColor: "#1f2937",
                      color: "white",
                      minWidth: "200px",
                      boxShadow:
                        "0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12)",
                      borderRadius: 1,
                      zIndex: 1301,
                      py: 0,
                    }}
                    onMouseLeave={handleCloseProductMenu}
                  >
                    {productMenuItems.map((item) => (
                      <MenuItem
                        key={item.name}
                        component={RouterLink}
                        to={item.path}
                        onClick={handleCloseProductMenu}
                        sx={{
                          "&:hover": {
                            backgroundColor: "#374151",
                          },
                          color: "white",
                          py: 1,
                          px: 2,
                        }}
                      >
                        <Typography textAlign="center">{item.name}</Typography>
                      </MenuItem>
                    ))}
                  </Box>
                )}
              </Box>

              {/* Resto de páginas */}
              {pages.map((page) => (
                <Button
                  key={page.name}
                  component={RouterLink}
                  to={page.path}
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    mx: 1.5,
                    display: "block",
                    textTransform: "none",
                    fontSize: "1.25rem",
                    color: "white",
                    "&:hover": { color: "#d9d9d9" },
                  }}
                >
                  {page.name}
                </Button>
              ))}
            </Box>

            {/* Sección derecha: carrito + login/avatar */}
            <Box
              sx={{
                flexGrow: 0,
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              {/* 🛒 Carrito */}
              <IconButton
                component={RouterLink}
                to="/cart"
                aria-label="Carrito"
                sx={{ color: "white" }}
              >
                <Badge
                  badgeContent={carrito.reduce(
                    (acc, item) => acc + item.cantidad,
                    0
                  )}
                  color="error"
                >
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>

              {isLoggedIn ? (
                <>
                  <Tooltip title="Open settings">
                    <IconButton
                      onClick={handleOpenUserMenu}
                      sx={{ p: 0 }}
                      aria-controls={
                        anchorElUser ? "menu-appbar-user" : undefined
                      }
                      aria-haspopup="true"
                      aria-expanded={Boolean(anchorElUser)}
                    >
                      <Avatar
                        alt="User"
                        sx={{ bgcolor: "#1976d2", fontSize: "1rem" }}
                      >
                        MM
                      </Avatar>
                    </IconButton>
                  </Tooltip>
                  <Menu
                    id="menu-appbar-user"
                    anchorEl={anchorElUser}
                    anchorOrigin={{ vertical: "top", horizontal: "right" }}
                    keepMounted
                    transformOrigin={{ vertical: "top", horizontal: "right" }}
                    open={Boolean(anchorElUser)}
                    onClose={() => handleCloseUserMenu()}
                  >
                    {settings.map((setting) => (
                      <MenuItem
                        key={setting.name}
                        component={setting.path ? RouterLink : "button"}
                        to={setting.path ?? undefined}
                        onClick={() => handleCloseUserMenu(null, setting)}
                      >
                        <Typography textAlign="center">
                          {setting.name}
                        </Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </>
              ) : (
                <>
                  <Tooltip
                    title="Es solo un botón de prueba para loguearse hasta que esté lista la página"
                    arrow
                  >
                    <Button
                      onClick={login}
                      sx={{
                        my: 2,
                        color: "white",
                        backgroundColor: "#1976d2",
                        textTransform: "none",
                        fontSize: "1.1rem",
                        "&:hover": { color: "#d9d9d9" },
                      }}
                    >
                      Loguearse
                    </Button>
                  </Tooltip>
                </>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      {/* <Toolbar /> */}
    </>
  );
}
