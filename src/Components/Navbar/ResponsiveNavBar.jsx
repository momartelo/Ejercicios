import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import { useCart } from "../../Context/CartContext";
import { useAuth } from "../../Context/AuthContex";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import AdbIcon from "@mui/icons-material/Adb";
import Button from "@mui/material/Button";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Avatar from "@mui/material/Avatar";
import Login from "../Login/Login";
import { obtenerIniciales } from "../../Functions/Initials";

const pages = [
  { name: "Preguntas Frecuentes", path: "/FAQs" },
  { name: "Nosotros", path: "/team" },
  { name: "Contacto", path: "/contact" },
];

const settings = [
  { name: "Perfil", path: "/profile" },
  { name: "Cuenta", path: "/account" },
  { name: "Logout", action: "logout" },
];

const ResponsiveNavBar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const { carrito } = useCart();
  const { isLoggedIn, logout, user } = useAuth();

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);

  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseUserMenu = (event, setting) => {
    setAnchorElUser(null);
    if (setting?.action === "logout") {
      logout();
    }
  };

  const [openLogin, setOpenLogin] = useState(false);

  const handleOpenLogin = () => setOpenLogin(true);
  const handleCloseLogin = () => setOpenLogin(false);

  return (
    <>
      <AppBar
        position="relative"
        sx={{
          background: "linear-gradient(90deg, #ffffff, #f8f8f8)",
          color: "#111827",
          boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Tooltip title="Inicio" arrow>
              <IconButton
                component={Link}
                to="/"
                aria-label="Inicio"
                color="inherit"
                sx={{
                  display: { xs: "none", md: "flex" },
                  mr: 1,
                  color: "#333",
                  "&:hover": { color: "#c9a227" },
                }}
              >
                <HomeIcon sx={{ fontSize: 40 }} />
              </IconButton>
            </Tooltip>

            {/* --- Menú Hamburguesa (Móvil) --- */}
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
                {pages.map((page) => (
                  <MenuItem
                    key={page.name}
                    component={Link}
                    to={page.path}
                    onClick={handleCloseNavMenu}
                  >
                    <Typography textAlign="center">{page.name}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            {/* --- Logo (Móvil) --- */}
            {/* <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component={Link}
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
            </Typography> */}

            {/* --- Menú Principal (Desktop) --- */}
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page.name}
                  component={Link}
                  to={page.path}
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    mx: 1.5,
                    display: "block",
                    textTransform: "none",
                    fontSize: "1rem",
                    color: "#333",
                    "&:hover": { color: "#c9a227" },
                  }}
                >
                  {page.name}
                </Button>
              ))}
            </Box>

            {/* --- Iconos derecha --- */}
            <Box
              sx={{
                flexGrow: 0,
                display: "flex",
                alignItems: "center",
                gap: 2,
              }}
            >
              <IconButton
                component={Link}
                to="/cart"
                aria-label="Carrito"
                sx={{ color: "#333", "&:hover": { color: "#c9a227" } }}
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
                      sx={{ bgcolor: "#c9a227", fontSize: "1rem" }}
                    >
                      {obtenerIniciales(user.name)}
                    </Avatar>
                  </IconButton>

                  <Menu
                    id="menu-appbar-user"
                    anchorEl={anchorElUser}
                    anchorOrigin={{ vertical: "top", horizontal: "right" }}
                    keepMounted
                    transformOrigin={{ vertical: "top", horizontal: "right" }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    {settings.map((setting) => (
                      <MenuItem
                        key={setting.name}
                        component={setting.path ? Link : "button"}
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
                <Tooltip
                  title="Es solo un botón de prueba para loguearse manualmente"
                  arrow
                >
                  {!isLoggedIn && (
                    <Button
                      onClick={handleOpenLogin}
                      sx={{
                        my: 2,
                        color: "#333",

                        textTransform: "none",
                        fontSize: "1.1rem",
                        "&:hover": { color: "#c9a227" },
                      }}
                    >
                      Loguearse
                    </Button>
                  )}
                </Tooltip>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Login openLogin={openLogin} onClose={handleCloseLogin} />
    </>
  );
};

export default ResponsiveNavBar;
