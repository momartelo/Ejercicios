export function obtenerIniciales(nombreCompleto) {
  if (typeof nombreCompleto !== "string") {
    console.warn("obtenerIniciales: nombre inválido", nombreCompleto);
    return "";
  }

  const palabras = nombreCompleto.trim().split(" ");
  if (palabras.length === 0) return "";

  const iniciales = palabras
    .slice(0, 2)
    .map((p) => p.charAt(0).toUpperCase())
    .join("");

  return iniciales;
}
