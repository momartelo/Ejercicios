export const getAllUsers = async () => {
  const res = await fetch(`${import.meta.env.VITE_BACK_API_URL}/api/users`);
  if (!res.ok) throw new Error("Error al obtener usuarios");
  return await res.json();
};
