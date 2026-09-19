import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Shoot {
  id: number;
  clientId: number;
  creatorId: number;
  location: string;
  dateTime: string;
  status: string;
  assignedCameramanId: number;
  assignedShootManagerId: number;
  assignedAssistantId: number;
}

const Shoots: React.FC = () => {
  const [shoots, setShoots] = useState<Shoot[]>([]);

  useEffect(() => {
    axios.get('/api/shoots').then(res => setShoots(res.data)).catch(console.error);
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-semibold border-b border-[#333] pb-2">Shoot Scheduling & Calendar</h2>
      <div className="bg-[#1a1a1a] p-6 rounded-lg border border-[#333] overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-[#333] text-gray-400">
              <th className="pb-2">ID</th>
              <th className="pb-2">Location</th>
              <th className="pb-2">Date/Time</th>
              <th className="pb-2">Staffing (Mgr / Cam / Asst)</th>
              <th className="pb-2">Creator ID</th>
              <th className="pb-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {shoots.map(s => (
              <tr key={s.id} className="border-b border-[#222] hover:bg-[#222]">
                <td className="py-3 text-amber-500">#{s.id}</td>
                <td className="py-3 font-medium">{s.location}</td>
                <td className="py-3 text-gray-300">{s.dateTime}</td>
                <td className="py-3 text-gray-400 text-sm">
                  #{s.assignedShootManagerId || 'N/A'} / #{s.assignedCameramanId || 'N/A'} / #{s.assignedAssistantId || 'N/A'}
                </td>
                <td className="py-3 text-gray-400">#{s.creatorId}</td>
                <td className="py-3"><span className="px-2 py-1 bg-amber-500/10 text-amber-500 border border-amber-500/20 rounded text-xs">{s.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Shoots;
