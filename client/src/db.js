import Dexie from 'dexie';

export const db = new Dexie('telemedDB');
db.version(1).stores({
  records: '++id, localId, serverId, patientId, lastModified'
});