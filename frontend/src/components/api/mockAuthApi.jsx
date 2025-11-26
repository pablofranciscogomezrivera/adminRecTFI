// Accede a las variables de entorno con import.meta.env
const mockUsers = [
  {
    id: 1,
    email: import.meta.env.VITE_ADMIN_EMAIL,
    password: import.meta.env.VITE_ADMIN_PASSWORD,
    role: "admin",
  },
  {
    id: 2,
    email: import.meta.env.VITE_USER_EMAIL,
    password: import.meta.env.VITE_USER_PASSWORD,
    role: "user",
  },
];

export const loginUser = (email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = mockUsers.find(
        (u) => u.email === email && u.password === password
      );
      if (user) {
        // Retornamos el objeto del usuario (sin password)
        const userPayload = { id: user.id, role: user.role }; 
        resolve({ user: userPayload }); // <-- Retorna el usuario
      } else {
        reject({ message: "Credenciales incorrectas" });
      }
    }, 1000);
  });
};

export const logoutUser = (setUsuarioLogueado) => {
  
  if (setUsuarioLogueado) {
    setUsuarioLogueado(null);
  }
  
};

// ... (El resto de la función getUserFromToken permanece igual)
export const getUserFromToken = () => {
    return null;
};