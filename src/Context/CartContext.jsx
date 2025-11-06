import { createContext, useContext, useState, useEffect } from "react";
import { normalizarPrecio } from "../Functions/PriceFormatter";
import { toast } from "react-toastify";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

// Funciones auxiliares
const getProductId = (producto) =>
  producto.id || (producto.title ?? producto.name);
const getProductName = (producto) =>
  producto.title ?? producto.name ?? "Producto sin nombre";

export const CartProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  // 🧮 Calcular total del carrito
  const getTotal = () => {
    return carrito.reduce((acumulado, producto) => {
      const precio =
        producto.precioNormalizado ??
        normalizarPrecio(producto.precio ?? producto.price ?? "0");
      return acumulado + precio * (producto.cantidad || 1);
    }, 0);
  };

  // 💾 Persistir carrito en localStorage
  useEffect(() => {
    const carritoGuardado = localStorage.getItem("carrito");
    if (carritoGuardado) {
      setCarrito(JSON.parse(carritoGuardado));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  const agregarAlCarrito = (producto) => {
    setCarrito((prevCarrito) => {
      const productoId = getProductId(producto);
      const productoExistente = prevCarrito.find(
        (item) => getProductId(item) === productoId
      );

      if (productoExistente) {
        toast.info(`${getProductName(producto)} (cantidad aumentada)`);
        return prevCarrito.map((item) =>
          getProductId(item) === productoId
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      } else {
        toast.success(`${getProductName(producto)} agregado correctamente`);
        const precioString = producto.precio ?? producto.price ?? "0";
        const precioNormalizado = normalizarPrecio(precioString);

        return [
          ...prevCarrito,
          {
            ...producto,
            cantidad: 1,
            precioNormalizado,
          },
        ];
      }
    });

    console.log("Producto agregado al carrito:", getProductName(producto));
  };

  const incrementarCantidad = (index) => {
    setCarrito((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, cantidad: item.cantidad + 1 } : item
      )
    );
  };

  const decrementarCantidad = (index) => {
    setCarrito((prev) =>
      prev
        .map((item, i) =>
          i === index ? { ...item, cantidad: item.cantidad - 1 } : item
        )
        .filter((item) => item.cantidad > 0)
    );
  };

  const limpiarCarrito = () => {
    setCarrito([]);
    localStorage.removeItem("carrito");
  };

  return (
    <CartContext.Provider
      value={{
        carrito,
        agregarAlCarrito,
        limpiarCarrito,
        incrementarCantidad,
        decrementarCantidad,
        getTotal, // 👈 Nuevo: accesible desde cualquier parte
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
