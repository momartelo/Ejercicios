export function obtenerIniciales(nombreCompleto) {
  // Si no es string, devolvemos vacío
  if (typeof nombreCompleto !== "string") {
    console.warn("obtenerIniciales: nombre inválido", nombreCompleto);
    return "";
  }

  const palabras = nombreCompleto.trim().split(" ");
  if (palabras.length === 0) return "";

  // Tomamos máximo las 2 primeras iniciales
  const iniciales = palabras
    .slice(0, 2)
    .map((p) => p.charAt(0).toUpperCase())
    .join("");

  return iniciales;
}
