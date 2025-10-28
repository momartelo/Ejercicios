// utils/priceFormatter.js
export const normalizarPrecio = (precioString) => {
  if (!precioString) return 0;

  const precio = precioString.toString().trim();

  // Si ya es un número, retornarlo
  if (!isNaN(precio)) return parseFloat(precio);

  // Detectar formato - si tiene $ al inicio, es formato latino
  const esFormatoLatino =
    precio.includes("$") || (precio.includes(".") && precio.includes(","));

  if (esFormatoLatino) {
    // Formato latino: "$95.000" o "95.000"
    return parseFloat(
      precio
        .replace(/[^\d,]/g, "") // Remover todo excepto números y comas
        .replace(/\./g, "") // Remover puntos (separadores de miles)
        .replace(",", ".") // Convertir coma decimal a punto
    );
  } else {
    // Formato anglosajón: "890.29"
    return parseFloat(
      precio.replace(/[^\d.]/g, "") // Remover todo excepto números y puntos
    );
  }
};

export const formatearPrecioParaMostrar = (precio) => {
  const num = Number(precio);
  if (isNaN(num)) return precio;
  return num.toLocaleString("es-AR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};
