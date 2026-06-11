import { randomUUID } from 'crypto';
import { appendRecord, readRecords } from './storage';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  passwordHash: string;
  createdAt: string;
}

const USERS_FILE = 'users.json';

export async function getUserByEmail(email: string): Promise<User | null> {
  const users = await readRecords<User>(USERS_FILE);
  return users.find((user) => user.email.toLowerCase() === email.toLowerCase()) ?? null;
}

export async function getUserById(id: string): Promise<User | null> {
  const users = await readRecords<User>(USERS_FILE);
  return users.find((user) => user.id === id) ?? null;
}

export async function createUser(data: {
  name: string;
  email: string;
  phone: string;
  passwordHash: string;
}): Promise<User> {
  const user: User = {
    id: randomUUID(),
    name: data.name,
    email: data.email,
    phone: data.phone,
    passwordHash: data.passwordHash,
    createdAt: new Date().toISOString(),
  };

  await appendRecord(USERS_FILE, user);
  return user;
}
