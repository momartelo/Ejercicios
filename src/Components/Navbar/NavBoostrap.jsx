import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import { useCategory } from "../../Context/CategoryContex";
import { useCart } from "../../Context/CartContext";
import { useAuth } from "../../Context/AuthContex";
import { categoryTranslations } from "../../Data/Categories";
import styles from "./NavBoostrap.module.css";
import Login from "../Login/Login";

function BootstrapNavBar() {
  const { categorias, category, setCategory, isLoading } = useCategory();
  const { carrito } = useCart();
  const { isLoggedIn, user, logout, login } = useAuth();
  const navigate = useNavigate();

  const handleLogoClick = () => {
    setCategory("Todas"); // reset del filtro
    navigate("/"); // navegar al inicio después
  };

  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);

  const obtenerIniciales = (name) => {
    return name
      .split(" ")
      .map((n) => n[0].toUpperCase())
      .join("");
  };

  const [openLogin, setOpenLogin] = useState(false);

  const handleOpenLogin = () => setOpenLogin(true);
  const handleCloseLogin = () => setOpenLogin(false);

  return (
    <Navbar expand="lg" bg="light" variant="light">
      <Container fluid className="px-3">
        <Navbar.Brand onClick={handleLogoClick} style={{ cursor: "pointer" }}>
          <img
            src="../../../public/img/Logos/Logo2.png"
            alt="Logo"
            className={styles.logo}
          />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="Categorías" id="categories-dropdown">
              {isLoading ? (
                <NavDropdown.Item disabled>Cargando...</NavDropdown.Item>
              ) : (
                categorias.map((cat) => (
                  <NavDropdown.Item
                    key={cat}
                    active={cat === category}
                    onClick={() => {
                      setCategory(cat);
                      navigate("/");
                    }}
                  >
                    {categoryTranslations[cat] || cat}
                  </NavDropdown.Item>
                ))
              )}
            </NavDropdown>

            <Nav.Link as={Link} to="/FAQs">
              Preguntas Frecuentes
            </Nav.Link>
            <Nav.Link as={Link} to="/team">
              Nosotros
            </Nav.Link>
            <Nav.Link as={Link} to="/contact">
              Contacto
            </Nav.Link>
          </Nav>

          <Nav className="ms-auto align-items-center">
            <Nav.Link as={Link} to="/cart" className={styles.cartLink}>
              <span className={styles.iconCart}>🛒</span>{" "}
              {totalItems > 0 && (
                <Badge bg="danger" pill className={styles.cartBadge}>
                  {totalItems}
                </Badge>
              )}
            </Nav.Link>

            {isLoggedIn ? (
              <NavDropdown
                title={obtenerIniciales(user.name)}
                id="user-dropdown"
                show={showUserDropdown}
                onMouseEnter={() => setShowUserDropdown(true)}
                onMouseLeave={() => setShowUserDropdown(false)}
              >
                <NavDropdown.Item onClick={logout}>
                  Cerrar sesión
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Button
                variant="outline-secondary"
                onClick={handleOpenLogin}
                className="ms-2"
              >
                Loguearse
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
