import { createContext, useContext, useState } from "react";
import { normalizarPrecio } from "../Functions/PriceFormatter"; // Importar la función

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

// Funciones auxiliares
const getProductId = (producto) =>
  producto.id || (producto.title ?? producto.name);
const getProductName = (producto) =>
  producto.title ?? producto.name ?? "Producto sin nombre";

export const CartProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  const agregarAlCarrito = (producto) => {
    setCarrito((prevCarrito) => {
      const productoId = getProductId(producto);
      const productoExistente = prevCarrito.find(
        (item) => getProductId(item) === productoId
      );

      if (productoExistente) {
        return prevCarrito.map((item) =>
          getProductId(item) === productoId
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      } else {
        // Normalizar el precio al agregar al carrito
        const precioString = producto.precio ?? producto.price ?? "0";
        const precioNormalizado = normalizarPrecio(precioString);

        return [
          ...prevCarrito,
          {
            ...producto,
            cantidad: 1,
            precioNormalizado, // Guardar el precio normalizado
          },
        ];
      }
    });

    console.log("Producto agregado al carrito", getProductName(producto));
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
