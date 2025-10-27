import React, { useEffect, useRef, useState } from "react";
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
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import CloseIcon from "@mui/icons-material/Close";
import { useLoginAttempts } from "../../Hooks/useLoginAttempts";

const pages = [
  { name: "Nosotros", path: "/team" },
  { name: "Preguntas Frecuentes", path: "/exercises" },
  { name: "Contacto", path: "/proyects" },
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
  const { isLoggedIn, login, logout } = useAuth();

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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleOpenLogin = () => {
    // cada vez que se abre el diálogo, limpiamos los datos anteriores
    setEmail("");
    setPassword("");
    setError("");
    setOpenLogin(true);
  };

  const handleCloseLogin = () => {
    setEmail("");
    setPassword("");
    setError("");
    setOpenLogin(false);
  };

  const { isBlocked, addAttempt, resetAttempts } = useLoginAttempts();

  const handleSubmitLogin = (e) => {
    e.preventDefault();
    if (isBlocked) {
      setError("Demasiados intentos. Intenta más tarde.");
      return;
    }

    const success = login(email, password);
    if (success) {
      resetAttempts();
      handleCloseLogin();
    } else {
      setEmail("");
      setPassword("");
      setError("Usuario o contraseña incorrectos");
      addAttempt();
    }
  };

  const emailRef = useRef(null);

  useEffect(() => {
    if (error) {
      emailRef.current?.focus();
    }
  }, [error]);

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
                component={Link}
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
            <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
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
            </Typography>

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
                    color: "white",
                    "&:hover": { color: "#d9d9d9" },
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
                  <Button
                    onClick={handleOpenLogin}
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
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* --- DIALOG LOGIN --- */}
      <Dialog
        open={openLogin}
        onClose={handleCloseLogin}
        PaperProps={{
          sx: { borderRadius: 3 },
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmitLogin}
          sx={{
            position: "relative",
            p: 4,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            width: 320,
          }}
        >
          <IconButton
            onClick={handleCloseLogin}
            sx={{ position: "absolute", top: 8, right: 8 }}
          >
            <CloseIcon />
          </IconButton>

          <Typography variant="h6" textAlign="center">
            Iniciar sesión
          </Typography>

          <TextField
            autoFocus
            inputRef={emailRef}
            label="Correo electrónico"
            type="email"
            fullWidth
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Contraseña"
            type="password"
            fullWidth
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button
            type="submit"
            variant="contained"
            sx={{ textTransform: "none", fontSize: "1rem" }}
          >
            Ingresar
          </Button>

          {error && (
            <Typography color="error" variant="body2" textAlign="center">
              {error}
            </Typography>
          )}

          <Typography variant="body2" textAlign="center">
            ¿No tenés cuenta?{" "}
            <Link
              to="/register"
              onClick={handleCloseLogin}
              style={{
                color: "#1976d2",
                textDecoration: "none",
                fontWeight: 500,
              }}
            >
              Registrate acá
            </Link>
          </Typography>
        </Box>
      </Dialog>
    </>
  );
};

export default ResponsiveNavBar;

// import * as React from "react";
// import AppBar from "@mui/material/AppBar";
// import Box from "@mui/material/Box";
// import Toolbar from "@mui/material/Toolbar";
// import IconButton from "@mui/material/IconButton";
// import Typography from "@mui/material/Typography";
// import Menu from "@mui/material/Menu";
// import MenuIcon from "@mui/icons-material/Menu";
// import Container from "@mui/material/Container";
// import Avatar from "@mui/material/Avatar";
// import Button from "@mui/material/Button";
// import Tooltip from "@mui/material/Tooltip";
// import MenuItem from "@mui/material/MenuItem";
// import HomeIcon from "@mui/icons-material/Home";
// import AdbIcon from "@mui/icons-material/Adb";
// import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
// import Badge from "@mui/material/Badge";
// import { Link as RouterLink } from "react-router-dom";
// import { useState } from "react";
// import { useCart } from "../../Context/CartContext";
// import { useAuth } from "../../Context/AuthContex";
// import styles from "./ResponsiveNavBar.module.css";

// const pages = [
//   { name: "Proyectos", path: "/proyects" },
//   { name: "Ejercicios", path: "/exercises" },
//   { name: "Equipo", path: "/team" },
// ];

// const productMenuItems = [
//   { name: "Productos", path: "/listpage" },
//   { name: "Productos MockAPI", path: "/productsmockAPI" },
//   { name: "Productos FakeAPI", path: "/productsFakeAPI" },
// ];

// const settings = [
//   { name: "Perfil", path: "/profile" },
//   { name: "Cuenta", path: "/account" },
//   { name: "Logout", action: "logout" },
// ];

// // ... imports y constantes previas

// export default function ResponsiveAppBar() {
//   const [anchorElNav, setAnchorElNav] = useState(null);
//   const [anchorElUser, setAnchorElUser] = useState(null);
//   const [isProductMenuOpen, setIsProductMenuOpen] = useState(false);

//   const { carrito } = useCart();
//   const { isLoggedIn, login, logout } = useAuth();

//   const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
//   const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);

//   // Manejo del menú de productos
//   const handleOpenProductMenu = () => setIsProductMenuOpen(true);
//   const handleCloseProductMenu = () => setIsProductMenuOpen(false);

//   const handleCloseNavMenu = () => setAnchorElNav(null);
//   const handleCloseUserMenu = (evt, setting) => {
//     setAnchorElUser(null);
//     if (setting?.action === "logout") {
//       logout();
//     }
//   };

//   return (
//     <>
//       <AppBar
//         position="fixed"
//         sx={{ background: "linear-gradient(90deg,#0f172a,#1f2937)" }}
//       >
//         <Container maxWidth="xl">
//           <Toolbar disableGutters>
//             {/* Botón de inicio */}
//             <Tooltip title="Inicio" arrow>
//               <IconButton
//                 component={RouterLink}
//                 to="/"
//                 aria-label="Inicio"
//                 color="inherit"
//                 sx={{
//                   display: { xs: "none", md: "flex" },
//                   mr: 1,
//                   color: "white",
//                   "&:hover": { color: "#d9d9d9" },
//                 }}
//               >
//                 <HomeIcon sx={{ fontSize: 40 }} />
//               </IconButton>
//             </Tooltip>

//             {/* Menú hamburguesa en mobile */}
//             <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
//               <IconButton
//                 size="large"
//                 aria-label="open navigation menu"
//                 aria-controls={anchorElNav ? "menu-appbar-nav" : undefined}
//                 aria-haspopup="true"
//                 aria-expanded={Boolean(anchorElNav)}
//                 onClick={handleOpenNavMenu}
//                 color="inherit"
//               >
//                 <MenuIcon />
//               </IconButton>

//               <Menu
//                 id="menu-appbar-nav"
//                 anchorEl={anchorElNav}
//                 open={Boolean(anchorElNav)}
//                 onClose={handleCloseNavMenu}
//                 anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
//                 transformOrigin={{ vertical: "top", horizontal: "left" }}
//                 keepMounted
//                 sx={{ display: { xs: "block", md: "none" } }}
//               >
//                 {/* Menú de productos en mobile */}
//                 {productMenuItems.map((item) => (
//                   <MenuItem
//                     key={item.name}
//                     component={RouterLink}
//                     to={item.path}
//                     onClick={handleCloseNavMenu}
//                   >
//                     <Typography textAlign="center">{item.name}</Typography>
//                   </MenuItem>
//                 ))}
//                 {/* Resto de páginas en mobile */}
//                 {pages.map((page) => (
//                   <MenuItem
//                     key={page.name}
//                     component={RouterLink}
//                     to={page.path}
//                     onClick={handleCloseNavMenu}
//                   >
//                     <Typography textAlign="center">{page.name}</Typography>
//                   </MenuItem>
//                 ))}
//               </Menu>
//             </Box>

//             {/* Logo en mobile */}
//             <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
//             <Typography
//               variant="h5"
//               noWrap
//               component={RouterLink}
//               to="/"
//               sx={{
//                 mr: 2,
//                 display: { xs: "flex", md: "none" },
//                 flexGrow: 1,
//                 fontFamily: "monospace",
//                 fontWeight: 700,
//                 letterSpacing: ".3rem",
//                 color: "inherit",
//                 textDecoration: "none",
//               }}
//             >
//               LOGO
//             </Typography>

//             {/* Links en desktop */}
//             <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
//               {/* Menú desplegable de Productos - SOLUCIÓN PERSONALIZADA */}
//               <Box
//                 onMouseEnter={handleOpenProductMenu}
//                 onMouseLeave={handleCloseProductMenu}
//                 sx={{ position: "relative" }}
//               >
//                 <Button
//                   disableFocusRipple
//                   sx={{
//                     my: 2,
//                     mx: 1.5,
//                     display: "block",
//                     textTransform: "none",
//                     fontSize: "1.25rem",
//                     color: "white",
//                     "&:hover": {
//                       color: "#d9d9d9",
//                       backgroundColor: "rgba(255, 255, 255, 0.04)", // ← Fondo sutil en hover
//                     },
//                     "&:focus": {
//                       outline: "none", // ← Outline sutil
//                     },
//                   }}
//                 >
//                   Productos
//                 </Button>
//                 {isProductMenuOpen && (
//                   <Box
//                     sx={{
//                       position: "absolute",
//                       top: "100%",
//                       left: 0,
//                       backgroundColor: "#1f2937",
//                       color: "white",
//                       minWidth: "200px",
//                       boxShadow:
//                         "0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12)",
//                       borderRadius: 1,
//                       zIndex: 1301,
//                       py: 0,
//                     }}
//                     onMouseLeave={handleCloseProductMenu}
//                   >
//                     {productMenuItems.map((item) => (
//                       <MenuItem
//                         key={item.name}
//                         component={RouterLink}
//                         to={item.path}
//                         onClick={handleCloseProductMenu}
//                         sx={{
//                           "&:hover": {
//                             backgroundColor: "#374151",
//                           },
//                           color: "white",
//                           py: 1,
//                           px: 2,
//                         }}
//                       >
//                         <Typography textAlign="center">{item.name}</Typography>
//                       </MenuItem>
//                     ))}
//                   </Box>
//                 )}
//               </Box>

//               {/* Resto de páginas */}
//               {pages.map((page) => (
//                 <Button
//                   key={page.name}
//                   component={RouterLink}
//                   to={page.path}
//                   onClick={handleCloseNavMenu}
//                   sx={{
//                     my: 2,
//                     mx: 1.5,
//                     display: "block",
//                     textTransform: "none",
//                     fontSize: "1.25rem",
//                     color: "white",
//                     "&:hover": { color: "#d9d9d9" },
//                   }}
//                 >
//                   {page.name}
//                 </Button>
//               ))}
//             </Box>

//             {/* Sección derecha: carrito + login/avatar */}
//             <Box
//               sx={{
//                 flexGrow: 0,
//                 display: "flex",
//                 alignItems: "center",
//                 gap: 2,
//               }}
//             >
//               {/* 🛒 Carrito */}
//               <IconButton
//                 component={RouterLink}
//                 to="/cart"
//                 aria-label="Carrito"
//                 sx={{ color: "white" }}
//               >
//                 <Badge
//                   badgeContent={carrito.reduce(
//                     (acc, item) => acc + item.cantidad,
//                     0
//                   )}
//                   color="error"
//                 >
//                   <ShoppingCartIcon />
//                 </Badge>
//               </IconButton>

//               {isLoggedIn ? (
//                 <>
//                   <Tooltip title="Open settings">
//                     <IconButton
//                       onClick={handleOpenUserMenu}
//                       sx={{ p: 0 }}
//                       aria-controls={
//                         anchorElUser ? "menu-appbar-user" : undefined
//                       }
//                       aria-haspopup="true"
//                       aria-expanded={Boolean(anchorElUser)}
//                     >
//                       <Avatar
//                         alt="User"
//                         sx={{ bgcolor: "#1976d2", fontSize: "1rem" }}
//                       >
//                         MM
//                       </Avatar>
//                     </IconButton>
//                   </Tooltip>
//                   <Menu
//                     id="menu-appbar-user"
//                     anchorEl={anchorElUser}
//                     anchorOrigin={{ vertical: "top", horizontal: "right" }}
//                     keepMounted
//                     transformOrigin={{ vertical: "top", horizontal: "right" }}
//                     open={Boolean(anchorElUser)}
//                     onClose={() => handleCloseUserMenu()}
//                   >
//                     {settings.map((setting) => (
//                       <MenuItem
//                         key={setting.name}
//                         component={setting.path ? RouterLink : "button"}
//                         to={setting.path ?? undefined}
//                         onClick={() => handleCloseUserMenu(null, setting)}
//                       >
//                         <Typography textAlign="center">
//                           {setting.name}
//                         </Typography>
//                       </MenuItem>
//                     ))}
//                   </Menu>
//                 </>
//               ) : (
//                 <>
//                   <Tooltip
//                     title="Es solo un botón de prueba para loguearse hasta que esté lista la página"
//                     arrow
//                   >
//                     <Button
//                       onClick={login}
//                       sx={{
//                         my: 2,
//                         color: "white",
//                         backgroundColor: "#1976d2",
//                         textTransform: "none",
//                         fontSize: "1.1rem",
//                         "&:hover": { color: "#d9d9d9" },
//                       }}
//                     >
//                       Loguearse
//                     </Button>
//                   </Tooltip>
//                 </>
//               )}
//             </Box>
//           </Toolbar>
//         </Container>
//       </AppBar>
//       {/* <Toolbar /> */}
//     </>
//   );
// }
