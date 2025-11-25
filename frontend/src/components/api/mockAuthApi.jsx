const mockUsers = [
  { id: 1, email: "admin@ejemplo.com", password: "1234", role: "admin" },
  { id: 2, email: "user@ejemplo.com", password: "abcd", role: "user" },
];

export const loginUser = (email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = mockUsers.find(
        (u) => u.email === email && u.password === password
      );
      if (user) {
        const token = btoa(JSON.stringify({ id: user.id, role: user.role }));
        resolve({ token });
      } else {
        reject({ message: "Credenciales incorrectas" });
      }
    }, 1000);
  });
};

export const getUserFromToken = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decoded = JSON.parse(atob(token));
    return decoded;
  } catch {
    return null;
  }
};
