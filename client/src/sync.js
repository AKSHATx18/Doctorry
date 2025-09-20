import { db } from './db';

export async function trySyncOutbox() {
  if (!navigator.onLine) return;

  const unsynced = await db.records.toArray();
  for (const rec of unsynced) {
    const res = await fetch("http://localhost:5000/api/sync/batch", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ record: rec })
    });
    if (res.ok) {
      console.log("Synced:", rec.localId);
    }
  }
}

window.addEventListener('online', trySyncOutbox);