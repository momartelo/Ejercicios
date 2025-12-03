export const normalizarPrecio = (precioString) => {
  if (!precioString && precioString !== 0) return 0;

  const precio = precioString.toString().trim();

  if (!isNaN(precio)) return parseFloat(precio);

  const esFormatoLatino =
    precio.includes("$") || (precio.includes(".") && precio.includes(","));

  let valor = 0;

  if (esFormatoLatino) {
    valor = parseFloat(
      precio
        .replace(/[^\d,]/g, "")
        .replace(/\./g, "")
        .replace(",", ".")
    );
  } else {
    valor = parseFloat(precio.replace(/[^\d.]/g, ""));
  }

  return isNaN(valor) ? 0 : parseFloat(valor.toFixed(2));
};

export const formatearPrecioParaMostrar = (
  precio,
  { moneda = "ARS", mostrarSimbolo = true, locale = "es-AR" } = {}
) => {
  const num = Number(precio);
  if (isNaN(num)) return precio;

  return new Intl.NumberFormat(locale, {
    style: mostrarSimbolo ? "currency" : "decimal",
    currency: moneda,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(num);
};

export const limpiarYFormatearPrecio = (precioString, opciones) => {
  const valor = normalizarPrecio(precioString);
  return formatearPrecioParaMostrar(valor, opciones);
};
