import axios from "axios";
import { AuthResponse, Product, User } from "types";

export const endPoint = process.env.REACT_APP_API || "http://localhost:3000/api"; // Añade /api al endpoint


interface IAPIService {
  getToken(): Promise<AuthResponse | undefined>;
  getUsers(): Promise<User[] | undefined>;
  userRegister(userData: User): Promise<any | undefined>;
  userLogin(userData: any): Promise<any | undefined>;
  productCreate(product: Product): Promise<any | undefined>;
  productListByUser(userId: string): Promise<any | undefined>;
}

const APIService: IAPIService = {
  getToken: async (): Promise<AuthResponse | undefined> => {
    try {
      const res = await axios.get<AuthResponse>(`${endPoint}/v1/isf/generate-access-token`, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      localStorage.setItem("accessToken", res.data.accessToken);
      return res.data;
    } catch (error: any) {
      if (error.response?.status === 409) {
        // Manejar error de conflicto (correo electrónico duplicado)
        alert(error.response.data.message); // Muestra el mensaje del backend al usuario
      } else if (error.response?.status === 500) {
        // Manejar error interno del servidor
        alert('Ocurrió un error en el servidor. Inténtelo nuevamente más tarde.');
      } else {
        // Manejar otros errores
        alert('Ocurrió un error inesperado.');
      }
    }
  },

  getUsers: async (): Promise<User[] | undefined> => {
    try {
      const res = await axios.get<User[]>(`${endPoint}/users`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      return res.data;
    } catch (error: any) {
      console.error("Error al obtener usuarios:", error.response?.data || error.message);
      if (error.response?.status === 401) {
        localStorage.removeItem("accessToken");
        window.location.href = "/";
      }
      return undefined;
    }
  },

  userRegister: async (userData: User): Promise<any | undefined> => { 
    try {
      const res = await axios.post<User>(`${endPoint}/users`, userData, { 
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log('respues del nest',res)
      return {status: true , data: res.data}
    } catch (error: any) {
      console.log('error del nest',error)
      let message = ''
      if (error?.response?.status === 409) {
        // Manejar error de conflicto (correo electrónico duplicado)
        message = error?.response?.data.message
      } else if (error?.response?.status === 500) {
        // Manejar error interno del servidor
        message = 'Ocurrió un error en el servidor. Inténtelo nuevamente más tarde.'
      } else {
        // Manejar otros errores
        message = 'Ocurrió un error inesperado.'
      }
      return {status: false , message}
    }
  },

  userLogin: async (userData: User): Promise<any | undefined> => { 
    try {
      const res = await axios.post<User>(`${endPoint}/auth/login`, userData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return {status: true , data: res.data}
    } catch (error: any) {
      let message = ''
      if (error?.response?.status === 401) {
        // Manejar error de conflicto (correo electrónico duplicado)
        message = 'Credenciales incorrectas.'
      } else {
        // Manejar otros errores
        message = 'No es posible iniciar sesión'
      }
      return {status: false , message}
    }
  },

  productCreate: async (product: Product): Promise<any | undefined> => { 
    try {
      const res = await axios.post<Product>(`${endPoint}/products`, product, { 
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return {status: true , data: res.data}
    } catch (error: any) {
      let message = ''
      if (error?.response?.status === 401) {
        // Manejar error de conflicto (correo electrónico duplicado)
        message = 'Credenciales incorrectas.'
      } else {
        // Manejar otros errores
        message = 'No es posible iniciar sesión'
      }
      return {status: false , message}
    }
  },
  productListByUser: async (userId: string): Promise< any | undefined> => {
    try {
      const res = await axios.get<Product[]>(`${endPoint}/products/${userId}`, { // Usa GET y una ruta con el userId
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`, // Incluye el token si es necesario
        },
      });
      return {status: true , data: res.data}
    } catch (error: any) {
      let message = ''
      if (error?.response?.status === 401) {
        // Manejar error de conflicto (correo electrónico duplicado)
        message = 'Credenciales incorrectas.'
      } else {
        // Manejar otros errores
        message = 'No es posible iniciar sesión'
      }
      return {status: false , message}
    }
  },
};

export default APIService;