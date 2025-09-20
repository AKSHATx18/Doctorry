import Dexie from 'dexie';

export const db = new Dexie('telemedDB');
db.version(1).stores({
  patients: '++id, patientId, lastModified',
  records: '++id, localId, serverId, patientId, lastModified'
});
