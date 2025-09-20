import { db } from './db';

export async function saveRecordOffline(record) {
  const now = new Date().toISOString();
  const local = {
    ...record,
    localId: crypto.randomUUID(),
    lastModified: now
  };
  await db.records.add(local);
  console.log("Saved offline:", local);
}