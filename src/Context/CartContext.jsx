import { createContext, useContext, useState } from "react";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  const agregarAlCarrito = (producto) => {
    setCarrito((prevCarrito) => {
      const productoExistente = prevCarrito.find(
        (item) => item.title === producto.title
      );

      if (productoExistente) {
        return prevCarrito.map((item) =>
          item.title === producto.title
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      } else {
        return [...prevCarrito, { ...producto, cantidad: 1 }];
      }
    });

    console.log("Producto agregado al carrito", producto.title);
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

  const limpiarCarrito = () => setCarrito([]);

  return (
    <CartContext.Provider
      value={{
        carrito,
        agregarAlCarrito,
        limpiarCarrito,
        incrementarCantidad,
        decrementarCantidad,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
