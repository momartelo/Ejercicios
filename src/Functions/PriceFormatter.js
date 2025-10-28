export const normalizarPrecio = (precioString) => {
  if (!precioString && precioString !== 0) return 0;

  const precio = precioString.toString().trim();

  // Si ya es número o string numérico simple
  if (!isNaN(precio)) return parseFloat(precio);

  // Detectar formato latino (usa comas como separador decimal)
  const esFormatoLatino =
    precio.includes("$") || (precio.includes(".") && precio.includes(","));

  let valor = 0;

  if (esFormatoLatino) {
    // Formato latino: "$1.234,56" o "1.234,56"
    valor = parseFloat(
      precio
        .replace(/[^\d,]/g, "") // quita todo excepto números y comas
        .replace(/\./g, "") // elimina puntos de miles
        .replace(",", ".") // convierte coma decimal a punto
    );
  } else {
    // Formato anglosajón: "$1,234.56" o "1234.56"
    valor = parseFloat(precio.replace(/[^\d.]/g, ""));
  }

  return isNaN(valor) ? 0 : parseFloat(valor.toFixed(2));
};

// ✅ Formatea un número para mostrarlo con estilo local y símbolo opcional
export const formatearPrecioParaMostrar = (
  precio,
  { moneda = "ARS", mostrarSimbolo = true, locale = "es-AR" } = {}
) => {
  const num = Number(precio);
  if (isNaN(num)) return precio;

  // Intl.NumberFormat da formato profesional según la región
  return new Intl.NumberFormat(locale, {
    style: mostrarSimbolo ? "currency" : "decimal",
    currency: moneda,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(num);
};

// ✅ Atajo: limpiar y mostrar directamente
export const limpiarYFormatearPrecio = (precioString, opciones) => {
  const valor = normalizarPrecio(precioString);
  return formatearPrecioParaMostrar(valor, opciones);
};
