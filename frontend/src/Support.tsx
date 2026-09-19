import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Support: React.FC = () => {
  const [tickets, setTickets] = useState([]);
  
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await axios.get('/api/support-tickets');
        setTickets(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTickets();
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-semibold border-b border-[#333] pb-2 text-rose-400">Support Tickets</h2>
      
      <div className="bg-[#1a1a1a] p-6 rounded-lg border border-[#333]">
        <h3 className="text-lg font-medium mb-4">Ticket Inbox</h3>
        {tickets.length === 0 ? (
          <p className="text-gray-500 text-sm">No support tickets found.</p>
        ) : (
          <ul className="flex flex-col gap-4">
            {tickets.map((t: any) => (
              <li key={t.id} className="p-4 bg-[#222] rounded border border-[#444]">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-white">{t.subject} <span className="text-gray-500 text-xs ml-2">Client #{t.clientId}</span></h4>
                  <span className={`px-2 py-1 text-xs rounded-full ${t.status === 'Open' ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-gray-700 text-gray-300'}`}>
                    {t.status}
                  </span>
                </div>
                <p className="text-sm text-gray-400 mb-3">{t.message}</p>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Priority: {t.priority}</span>
                  <span>Assigned to: {t.assignedToId ? `#${t.assignedToId}` : 'Unassigned'}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Support;
