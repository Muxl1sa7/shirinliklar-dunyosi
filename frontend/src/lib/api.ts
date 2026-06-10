export const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:4000';

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  if (!res.ok) {
    const data = await res.json().catch(() => null);
    throw new Error(data?.message ?? 'Something went wrong');
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
