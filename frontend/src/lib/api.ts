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
    credentials: 'include',
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
  userId?: string;
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

export interface AdminUserRecord {
  id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
}

export const adminGetUsers = () =>
  request<{ users: AdminUserRecord[] }>('/api/admin/users', { credentials: 'include' });

// --- Customer auth ---

export interface CustomerUser {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  phone: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export const registerCustomer = (data: RegisterPayload) =>
  request<{ success: boolean; message?: string; user?: CustomerUser }>('/api/auth/register', {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify(data),
  });

export const loginCustomer = (data: LoginPayload) =>
  request<{ success: boolean; message?: string; user?: CustomerUser }>('/api/auth/login', {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify(data),
  });

export const logoutCustomer = () =>
  request<{ success: boolean }>('/api/auth/logout', {
    method: 'POST',
    credentials: 'include',
  });

export const getCustomerMe = () =>
  request<{ authenticated: boolean; user?: CustomerUser }>('/api/auth/me', { credentials: 'include' });

export const getMyOrders = () =>
  request<{ orders: OrderRecord[] }>('/api/auth/orders', { credentials: 'include' });

// --- Checkout, purchases & reviews ---

export interface PurchaseOrderItem {
  productId: string;
  name: string;
  image: string;
  size?: string;
  flavor?: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
}

export interface PurchaseOrder {
  id: string;
  userId: string;
  items: PurchaseOrderItem[];
  total: number;
  status: 'paid' | 'received';
  cardLast4: string;
  createdAt: string;
  receivedAt?: string;
}

export interface CheckoutCardInput {
  number: string;
  expiry: string;
  cvv: string;
  holder: string;
}

export interface CheckoutItemInput {
  productId: string;
  size?: string;
  flavor?: string;
  quantity: number;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  orderId: string;
  rating: number;
  text: string;
  createdAt: string;
  adminReply?: string;
  adminReplyAt?: string;
}

export const checkout = (items: CheckoutItemInput[], card: CheckoutCardInput) =>
  request<{ success: boolean; message?: string; order?: PurchaseOrder }>('/api/checkout', {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify({ items, card }),
  });

export const getMyPurchases = () =>
  request<{ purchases: PurchaseOrder[] }>('/api/purchases', { credentials: 'include' });

export const receivePurchase = (id: string) =>
  request<{ success: boolean; order?: PurchaseOrder; message?: string }>(`/api/purchases/${id}/receive`, {
    method: 'POST',
    credentials: 'include',
  });

export const getProductReviews = (productId: string) =>
  request<{ reviews: Review[] }>(`/api/products/${productId}/reviews`);

export const submitReview = (data: { orderId: string; productId: string; rating: number; text: string }) =>
  request<{ success: boolean; message?: string; review?: Review }>('/api/reviews', {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify(data),
  });

export const adminGetReviews = () =>
  request<{ reviews: Review[] }>('/api/admin/reviews', { credentials: 'include' });

export const adminReplyToReview = (id: string, reply: string) =>
  request<{ success: boolean; review?: Review; message?: string }>(`/api/admin/reviews/${id}/reply`, {
    method: 'PUT',
    credentials: 'include',
    body: JSON.stringify({ reply }),
  });
