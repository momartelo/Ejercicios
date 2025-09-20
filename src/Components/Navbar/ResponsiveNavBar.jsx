import * as React from "react";
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
import { Link as RouterLink } from "react-router-dom";

const pages = [
  { name: "Productos", path: "/listPage" },
  { name: "Proyectos", path: "/proyects" },
  { name: "Equipo", path: "/team" },
];

const settings = [
  { name: "Perfil", path: "/profile" },
  { name: "Cuenta", path: "/account" },
  { name: "Logout", action: "logout" },
];

export default function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);

  const handleCloseNavMenu = () => setAnchorElNav(null);
  const handleCloseUserMenu = (evt, setting) => {
    setAnchorElUser(null);
    if (setting?.action === "logout") {
      // tu lógica de logout
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
            <Tooltip title="Inicio" arrow>
              <IconButton
                component={RouterLink}
                to="/"
                aria-label="Inicio"
                color="inherit"
                sx={{
                  display: { xs: "none", md: "flex" },
                  mr: 1,
                  color: "white", // color normal
                  "&:hover": { color: "#d9d9d9" }, // color al pasar el mouse
                }}
              >
                <HomeIcon sx={{ fontSize: 40 }} />
              </IconButton>
            </Tooltip>
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
                    component={RouterLink}
                    to={page.path}
                    onClick={handleCloseNavMenu}
                  >
                    <Typography textAlign="center">{page.name}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

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

            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page.name}
                  component={RouterLink}
                  to={page.path}
                  onClick={handleCloseNavMenu}
                  sx={{
                    my: 2,
                    mx: 1.5,
                    color: "white",
                    display: "block",
                    textTransform: "none",
                    fontSize: "1.25rem",
                    color: "white", // color normal
                    "&:hover": { color: "#d9d9d9" }, // color al pasar el mouse
                  }}
                >
                  {page.name}
                </Button>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton
                  onClick={handleOpenUserMenu}
                  sx={{ p: 0 }}
                  aria-controls={anchorElUser ? "menu-appbar-user" : undefined}
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
                    <Typography textAlign="center">{setting.name}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Toolbar />
    </>
  );
}
