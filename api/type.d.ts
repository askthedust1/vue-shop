export interface IProduct {
  category: string;
  title: string;
  description: string;
  price: number;
  image: string | null;
}

export interface IUser {
  email: string;
  password: string;
  token: string;
  role: string;
  displayName?: string;
}
