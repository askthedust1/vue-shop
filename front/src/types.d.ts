export interface Product {
    _id: string;
    category: {
      _id: string;
      title: string;
    }
    title: string;
    description: string;
    price: number;
    image: string;
}

export interface CartItem {
  product: Product;
}

export interface Category {
    _id: string;
    title: string;
    description: string;
}

export interface User {
  _id: string;  
  email: string;
  token: string;
  role: string;
  displayName?: string;
}

export interface UserLogin {
  email: string
  password: string
}

export interface UserRegister {
  email: string
  displayName?: string
  password: string
}

export interface RegisterResponse {
  user: User
  message: string
}