import { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useCategory } from "../../Context/CategoryContex";
import { useCart } from "../../Context/CartContext";
import { useAuth } from "../../Context/AuthContex";
import styles from "./NavBoostrap.module.css";
import Login from "../Login/Login";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useSearch } from "../../Context/SearchContex";

function BootstrapNavBar() {
  const { categorias, category, setCategory, isLoading } = useCategory();
  const { carrito, limpiarCarrito } = useCart();
  const { isLoggedIn, user, logout, isAdminIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const { searchQuery, setSearchQuery } = useSearch();
  const searchInputRef = useRef(null);

  const handleLogoClick = () => {
    setCategory("Todas");
    navigate("/");
  };

  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showEditDropdown, setShowEditDropdown] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);

  const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  const handleLogout = () => {
    limpiarCarrito();
    logout();
    navigate("/");
  };

  const obtenerIniciales = (name) => {
    if (!name) return "";
    return name
      .split(" ")
      .map((n) => n[0]?.toUpperCase() || "")
      .join("");
  };

  const handleOpenLogin = () => setOpenLogin(true);
  const handleCloseLogin = () => setOpenLogin(false);

  useEffect(() => {
    if (location.pathname === "/" && searchQuery) {
      searchInputRef.current?.focus();
    }
  }, [location.pathname, searchQuery]);

  return (
    <Navbar expand="lg" bg="light" variant="light">
      <Container
        fluid
        className="px-3"
        style={{ borderBottom: "2px solid #f8f0d4ff" }}
      >
        <Navbar.Brand onClick={handleLogoClick} style={{ cursor: "pointer" }}>
          <img src="/img/Logos/Logo2.png" alt="Logo" className={styles.logo} />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown
              title="Categorías"
              id="categories-dropdown"
              className={styles.dropdownToggle}
            >
              {isLoading ? (
                <NavDropdown.Item disabled>Cargando...</NavDropdown.Item>
              ) : (
                <>
                  <NavDropdown.Item
                    key="Todas"
                    active={category === "Todas"}
                    onClick={() => {
                      setCategory("Todas");
                      navigate("/");
                    }}
                    className={styles.dropdownItem}
                  >
                    Todas
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  {categorias
                    .filter((c) => c !== "Todas")
                    .sort((a, b) => a.localeCompare(b))
                    .map((cat) => (
                      <NavDropdown.Item
                        key={cat}
                        active={cat === category}
                        onClick={() => {
                          setCategory(cat);
                          navigate("/");
                        }}
                        className={styles.dropdownItem}
                      >
                        {cat}
                      </NavDropdown.Item>
                    ))}
                </>
              )}
            </NavDropdown>

            <Nav.Link as={Link} to="/FAQs" className={styles.navLink}>
              Preguntas Frecuentes
            </Nav.Link>
            <Nav.Link as={Link} to="/team" className={styles.navLink}>
              Nosotros
            </Nav.Link>
            <Nav.Link as={Link} to="/contact" className={styles.navLink}>
              Contacto
            </Nav.Link>

            {isLoggedIn && isAdminIn && (
              <NavDropdown
                title="Admin"
                id="edit-dropdown"
                show={showEditDropdown}
                onClick={() => setShowEditDropdown(!showEditDropdown)}
                align="end"
              >
                <NavDropdown.Item onClick={() => navigate("/product/new")}>
                  Agregar Producto
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => navigate("/editUsers")}>
                  Editar Usuarios
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>

          <Nav className="ms-auto align-items-center d-flex flex-row flex-lg-row gap-2 justify-content-center">
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Buscar productos..."
                className="me-2"
                value={searchQuery}
                onChange={(e) => {
                  const query = e.target.value.toLowerCase();
                  setSearchQuery(query);

                  if (query && location.pathname !== "/") {
                    navigate("/");
                  }
                }}
                ref={searchInputRef}
              />
            </Form>

            <Nav.Link as={Link} to="/cart" className={styles.cartLink}>
              <ShoppingCartIcon className={styles.shoppingIcon} />
              {totalItems > 0 && (
                <Badge bg="danger" pill className={styles.cartBadge}>
                  {totalItems}
                </Badge>
              )}
            </Nav.Link>

            {isLoggedIn ? (
              <NavDropdown
                title={user?.name ? obtenerIniciales(user.name) : "?"}
                id="user-dropdown"
                show={showUserDropdown}
                onClick={() => setShowUserDropdown(!showUserDropdown)}
                align="end"
              >
                <NavDropdown.Item onClick={() => navigate("/profile")}>
                  Perfil
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => navigate("/account")}>
                  Cuenta
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => navigate("/favorites")}>
                  Mis Favoritos
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item
                  onClick={handleLogout}
                  className={styles.logout}
                >
                  Cerrar sesión
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Button
                variant="outline-secondary"
                onClick={handleOpenLogin}
                className="buttonLogin ms-2"
              >
                Login
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
      <Login openLogin={openLogin} onClose={handleCloseLogin} />
    </Navbar>
  );
}

export default BootstrapNavBar;
