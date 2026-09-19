import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState({ clients: 0, orders: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const clientsRes = await axios.get('/api/clients');
        const ordersRes = await axios.get('/api/orders');
        setStats({ clients: clientsRes.data.length, orders: ordersRes.data.length });
      } catch (err) {
        console.error(err);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-semibold border-b border-[#333] pb-2">Operational Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#1a1a1a] p-6 rounded-lg border border-[#333] flex flex-col items-center justify-center gap-2">
          <span className="text-gray-400">Total Clients</span>
          <span className="text-4xl font-bold text-amber-500">{stats.clients}</span>
        </div>
        
        <div className="bg-[#1a1a1a] p-6 rounded-lg border border-[#333] flex flex-col items-center justify-center gap-2">
          <span className="text-gray-400">Active Orders</span>
          <span className="text-4xl font-bold text-amber-500">{stats.orders}</span>
        </div>
        
        <div className="bg-[#1a1a1a] p-6 rounded-lg border border-[#333] flex flex-col items-center justify-center gap-2">
          <span className="text-gray-400">System Status</span>
          <span className="text-xl font-bold text-green-500">Operational</span>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
