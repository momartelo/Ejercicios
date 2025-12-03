import { createContext, useContext, useState, useEffect } from "react";
import { normalizarPrecio } from "../Functions/PriceFormatter";
import { toast } from "react-toastify";
import { useAuth } from "../Context/AuthContex";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

const getProductId = (p) => p.id || p.title || p.name;
const getProductName = (p) => p.title ?? p.name ?? "Producto sin nombre";

export const CartProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);
  const { user, isLoggedIn } = useAuth();

  const getCartKey = () =>
    isLoggedIn && user?.id ? `carrito_${user.id}` : "carrito_guest";

  useEffect(() => {
    const key = getCartKey();
    const guardado = localStorage.getItem(key);

    if (guardado) {
      setCarrito(JSON.parse(guardado));
    } else {
      setCarrito([]);
    }
  }, [user, isLoggedIn]);

  useEffect(() => {
    const key = getCartKey();
    localStorage.setItem(key, JSON.stringify(carrito));
  }, [carrito, user, isLoggedIn]);

  const getTotal = () =>
    carrito.reduce((acum, p) => {
      const precio =
        p.precioNormalizado ?? normalizarPrecio(p.precio ?? p.price ?? "0");
      return acum + precio * (p.cantidad || 1);
    }, 0);

  const agregarAlCarrito = (producto) => {
    setCarrito((prev) => {
      const id = getProductId(producto);
      const existe = prev.find((p) => getProductId(p) === id);

      if (existe) {
        toast.info(`${getProductName(producto)} (cantidad aumentada)`);
        return prev.map((p) =>
          getProductId(p) === id ? { ...p, cantidad: p.cantidad + 1 } : p
        );
      }

      toast.success(`${getProductName(producto)} agregado`);
      const precioString = producto.precio ?? producto.price ?? "0";

      return [
        ...prev,
        {
          ...producto,
          cantidad: 1,
          precioNormalizado: normalizarPrecio(precioString),
        },
      ];
    });
  };

  const incrementarCantidad = (index) => {
    setCarrito((prev) =>
      prev.map((p, i) => (i === index ? { ...p, cantidad: p.cantidad + 1 } : p))
    );
  };

  const decrementarCantidad = (index) => {
    setCarrito((prev) =>
      prev
        .map((p, i) => (i === index ? { ...p, cantidad: p.cantidad - 1 } : p))
        .filter((p) => p.cantidad > 0)
    );
  };

  const limpiarCarrito = () => {
    const key = getCartKey();
    setCarrito([]);
    localStorage.removeItem(key);
  };

  return (
    <CartContext.Provider
      value={{
        carrito,
        agregarAlCarrito,
        incrementarCantidad,
        decrementarCantidad,
        limpiarCarrito,
        getTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
