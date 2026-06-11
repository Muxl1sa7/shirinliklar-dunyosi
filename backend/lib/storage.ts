import { promises as fs } from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data', 'storage');

async function ensureFile(filePath: string) {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(filePath);
  } catch {
    await fs.writeFile(filePath, '[]', 'utf-8');
  }
}

export async function appendRecord<T>(fileName: string, record: T): Promise<void> {
  const filePath = path.join(DATA_DIR, fileName);
  await ensureFile(filePath);

  const content = await fs.readFile(filePath, 'utf-8');
  const records: T[] = JSON.parse(content);
  records.push(record);

  await fs.writeFile(filePath, JSON.stringify(records, null, 2), 'utf-8');
}

export async function readRecords<T>(fileName: string): Promise<T[]> {
  const filePath = path.join(DATA_DIR, fileName);

  try {
    const content = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(content) as T[];
  } catch {
    return [];
  }
}

export async function writeRecords<T>(fileName: string, records: T[]): Promise<void> {
  const filePath = path.join(DATA_DIR, fileName);
  await ensureFile(filePath);
  await fs.writeFile(filePath, JSON.stringify(records, null, 2), 'utf-8');
}
