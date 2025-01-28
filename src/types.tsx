
export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  token: string | null;
  status: string;
  createdAt: string;
  updatedAt: string;
}
  export interface AuthResponse {
    accessToken: string;
  }

  export interface ProductResponse {
    products: Product[];
    totalCount: number; // Si también estás devolviendo un recuento total
  }
export interface Product {
  id: string;
  sku: string;
  name: string;
  description: string;
  photoUrl: string;
  price: string; 
  status: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  user?: User
}