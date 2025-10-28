let users = JSON.parse(localStorage.getItem("mockUsers")) || [
  {
    id: 1,
    name: "Martín Martínez",
    email: "martin@example.com",
    password: "123456",
  },
  {
    id: 2,
    name: "Lucía López",
    email: "lucia.lopez@example.com",
    password: "lucia123",
  },
  {
    id: 3,
    name: "Pedro Pérez",
    email: "pedro.perez@example.com",
    password: "pedrito321",
  },
  {
    id: 4,
    name: "Sofía Gómez",
    email: "sofia.gomez@example.com",
    password: "sofia2024",
  },
  {
    id: 5,
    name: "Juan Fernández",
    email: "juan.fernandez@example.com",
    password: "juanito",
  },
  {
    id: 6,
    name: "Carla Rodríguez",
    email: "carla.rodriguez@example.com",
    password: "carla_pass",
  },
  {
    id: 7,
    name: "Nicolás Díaz",
    email: "nicolas.diaz@example.com",
    password: "nicolas789",
  },
  {
    id: 8,
    name: "Valentina Torres",
    email: "valentina.torres@example.com",
    password: "valen@2025",
  },
  {
    id: 9,
    name: "Diego Ramírez",
    email: "diego.ramirez@example.com",
    password: "diego456",
  },
  {
    id: 10,
    name: "Laura Herrera",
    email: "laura.herrera@example.com",
    password: "laura123",
  },
];

const saveUsers = () => {
  localStorage.setItem("mockUsers", JSON.stringify(users));
};

export const getUsers = () => users;
export const addUser = (user) => {
  const newId = users.length ? Math.max(...users.map((u) => u.id)) + 1 : 1;
  const newUser = { id: newId, ...user };
  users.push(newUser);
  saveUsers();
  return newUser;
};

export const findUserByEmail = (email) =>
  users.find((u) => u.email.toLowerCase() === email.toLowerCase());

export default users;
