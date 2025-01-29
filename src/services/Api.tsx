import axios from "axios";
import { AuthResponse, Product, ProductResponse, User } from "types";

export const endPoint = process.env.REACT_APP_API || "https://nest-marketplace.onrender.com"; // Añade /api al endpoint


interface IAPIService {
  getUsers(): Promise<any | undefined>;
  userRegister(userData: User): Promise<any | undefined>;
  userLogin(userData: any): Promise<any | undefined>;
  productCreate(product: Product): Promise<any | undefined>;
  productRemove(id: any): Promise<any | undefined>;
  productListAll(userId:string,page:number,minPrice?:number,maxPrice?:number,search?: string): Promise<any | undefined>;
}

const APIService: IAPIService = {
 

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
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`, 
        },
      });
      return {status: true , data: res.data}
    } catch (error: any) {
      let message = ''
      if (error?.response?.status !== 200) {
        // Manejar error de conflicto (correo electrónico duplicado)
        message = error?.response?.data?.message
      } else {
        // Manejar otros errores
        message = 'No es posible crear el producto'
      }
      return {status: false , message}
    }
  },

  productRemove:async(id:any): Promise<any | undefined> => {
    let url = `${endPoint}/products?id=${id}`; 
    const res = await axios.delete<any>(url, { 
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`, 
      },
    });
  },

 
  productListAll: async (userId:string,page:number,minPrice:number,maxPrice:number,search: string,): Promise< any | undefined> => {
    try {
      let url = `${endPoint}/products?page=${page}`; 
      if(userId.length > 0){
        url += `&userId=${userId}`
      }
      if(minPrice.toString().length > 0 && maxPrice.toString().length > 0){
        url += `&minPrice=${minPrice}&maxPrice=${maxPrice}`;  
      }
      if (search?.length > 0) {
        url += `&productName=${encodeURIComponent(search)}`; 
      }
      
      const res = await axios.get<ProductResponse[]>(url, { 
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`, 
        },
      });
      return {status: true , data: res.data}
    } catch (error: any) {
      let message = ''
      if (error?.response?.status === 401) {
        message = 'no es posible listar.'
      } else {
        message = 'No es posible obtener datos'
      }
      return {status: false , message}
    }
  },
};

export default APIService;