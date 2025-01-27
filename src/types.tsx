
export interface User {
  id: number;
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

export interface Product {
  id: string;
  sku: string;
  name: string;
  description: string;
  photoUrl: string;
  price: string;
  status?: string;
  createdAt?: Date;
  updatedAt?: Date;
}