import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Script {
  id: number;
  clientId: number;
  orderId: number;
  scriptText: string;
  status: string;
  assignedWriterId: number;
  deadline: string;
  videoNumber: number;
  revisionCount: number;
}

const Scripts: React.FC = () => {
  const [scripts, setScripts] = useState<Script[]>([]);

  useEffect(() => {
    axios.get('/api/scripts').then(res => setScripts(res.data)).catch(console.error);
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-semibold border-b border-[#333] pb-2">Script Workflow</h2>
      <div className="grid grid-cols-1 gap-4">
        {scripts.map(s => (
          <div key={s.id} className="bg-[#1a1a1a] p-6 rounded-lg border border-[#333]">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold text-amber-500">Script #{s.id} <span className="text-gray-500 text-sm ml-2">Video #{s.videoNumber}</span></h3>
                <p className="text-sm text-gray-400">Client ID: {s.clientId} | Order ID: {s.orderId} | Assigned Writer: #{s.assignedWriterId}</p>
                <p className="text-xs text-gray-500 mt-1">Deadline: {s.deadline} | Revisions: {s.revisionCount}</p>
              </div>
              <span className="px-3 py-1 bg-green-500/10 text-green-500 border border-green-500/20 rounded-full text-xs font-semibold">
                {s.status}
              </span>
            </div>
            <p className="text-gray-300 bg-[#222] p-4 rounded text-sm italic">"{s.scriptText}"</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Scripts;
