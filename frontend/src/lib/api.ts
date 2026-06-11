import type { Product } from '../types';

export const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:4000';

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  if (!res.ok) {
    const data = await res.json().catch(() => null);
    throw new Error(data?.message ?? 'Nimadir xato ketdi');
  }

  return res.json();
}

export interface CustomOrderPayload {
  fullName: string;
  phone: string;
  eventDate: string;
  size: string;
  flavor: string;
  note: string;
}

export interface ContactPayload {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export const submitCustomOrder = (payload: CustomOrderPayload) =>
  request<{ success: boolean; message: string }>('/api/custom-order', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

export const submitContactForm = (payload: ContactPayload) =>
  request<{ success: boolean; message: string }>('/api/contact', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

export const subscribeNewsletter = (email: string) =>
  request<{ success: boolean; message: string }>('/api/newsletter', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });

export const getProducts = (params?: { type?: string; category?: string }) => {
  const search = new URLSearchParams();
  if (params?.type) search.set('type', params.type);
  if (params?.category) search.set('category', params.category);
  const query = search.toString();

  return request<{ products: Product[] }>(`/api/products${query ? `?${query}` : ''}`);
};

export const getProductById = (id: string) => request<{ product: Product }>(`/api/products/${id}`);

// --- Admin ---

export interface AdminProductInput {
  name: string;
  price: number;
  image: string;
  type: Product['type'];
  category: Product['category'];
  description: string;
  sizes: string[];
  flavors: string[];
  dietFriendly: boolean;
  healthNote: string;
  ingredients: string[];
  storage: string;
}

export interface OrderRecord extends CustomOrderPayload {
  createdAt: string;
}

export interface MessageRecord extends ContactPayload {
  createdAt: string;
}

export interface SubscriberRecord {
  email: string;
  createdAt: string;
}

export const adminLogin = (username: string, password: string) =>
  request<{ success: boolean; message?: string }>('/api/admin/login', {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify({ username, password }),
  });

export const adminLogout = () =>
  request<{ success: boolean }>('/api/admin/logout', {
    method: 'POST',
    credentials: 'include',
  });

export const adminMe = () => request<{ authenticated: boolean }>('/api/admin/me', { credentials: 'include' });

export const adminGetProducts = () =>
  request<{ products: Product[] }>('/api/admin/products', { credentials: 'include' });

export const adminCreateProduct = (data: AdminProductInput) =>
  request<{ product: Product }>('/api/admin/products', {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify(data),
  });

export const adminUpdateProduct = (id: string, data: AdminProductInput) =>
  request<{ product: Product }>(`/api/admin/products/${id}`, {
    method: 'PUT',
    credentials: 'include',
    body: JSON.stringify(data),
  });

export const adminDeleteProduct = (id: string) =>
  request<{ success: boolean }>(`/api/admin/products/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  });

export const adminGetOrders = () =>
  request<{ orders: OrderRecord[] }>('/api/admin/orders', { credentials: 'include' });

export const adminGetMessages = () =>
  request<{ messages: MessageRecord[] }>('/api/admin/messages', { credentials: 'include' });

export const adminGetSubscribers = () =>
  request<{ subscribers: SubscriberRecord[] }>('/api/admin/subscribers', { credentials: 'include' });
