import React, { useState, useEffect } from "react";
import { saveRecordOffline } from "../offline";
import { db } from "../db";

function HealthRecords() {
  const [patientId, setPatientId] = useState("");
  const [payload, setPayload] = useState("");
  const [records, setRecords] = useState([]);

  // Load offline records
  useEffect(() => {
    const loadRecords = async () => {
      const all = await db.records.toArray();
      setRecords(all);
    };
    loadRecords();
  }, []);

  const handleSave = async () => {
    await saveRecordOffline({
      patientId,
      payload,
    });
    alert("Record saved offline ✅");

    // refresh local list
    const all = await db.records.toArray();
    setRecords(all);
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Health Records (Offline First)</h2>

      <input
        className="border p-2 mr-2"
        type="text"
        placeholder="Patient ID"
        value={patientId}
        onChange={(e) => setPatientId(e.target.value)}
      />
      <input
        className="border p-2 mr-2"
        type="text"
        placeholder="Record info"
        value={payload}
        onChange={(e) => setPayload(e.target.value)}
      />
      <button
        onClick={handleSave}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Save Offline
      </button>

      <h3 className="text-lg font-semibold mt-6">Saved Records</h3>
      <ul className="list-disc pl-5">
        {records.map((r) => (
          <li key={r.localId || r.id}>
            Patient: {r.patientId} | Data: {r.payload}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HealthRecords;