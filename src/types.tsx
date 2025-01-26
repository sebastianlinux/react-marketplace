export interface User {
    id?: number;
    username?: string;
    email?: string;
    // ... otras propiedades del usuario
  }
  
  export interface AuthResponse {
    accessToken: string;
    // ... otras propiedades de la respuesta de autenticación
  }
  