import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OwnerDashboard: React.FC = () => {
  const [stats, setStats] = useState({ clients: 0, orders: 0, revenue: 0, expenses: 0, creators: 0 });

  useEffect(() => {
    // In a real scenario, these would fetch from the actual endpoints
    // For demo purposes, we will just fetch counts of what we have.
    const fetchStats = async () => {
      try {
        const [clientsRes, ordersRes, creatorsRes] = await Promise.all([
          axios.get('/api/clients'),
          axios.get('/api/orders'),
          axios.get('/api/creators')
        ]);
        
        setStats({
          clients: clientsRes.data.length,
          orders: ordersRes.data.length,
          revenue: 15000, // Mock financial data
          expenses: 3500, // Mock financial data
          creators: creatorsRes.data.length
        });
      } catch (err) {
        console.error(err);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-semibold border-b border-[#333] pb-2 text-amber-500">Executive Overview (Owner)</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-[#1a1a1a] p-6 rounded-lg border border-[#333] flex flex-col gap-2">
          <span className="text-gray-400 text-sm font-semibold uppercase tracking-wider">Total Revenue</span>
          <span className="text-3xl font-bold text-green-500">${stats.revenue.toLocaleString()}</span>
        </div>
        
        <div className="bg-[#1a1a1a] p-6 rounded-lg border border-[#333] flex flex-col gap-2">
          <span className="text-gray-400 text-sm font-semibold uppercase tracking-wider">Total Expenses</span>
          <span className="text-3xl font-bold text-red-500">${stats.expenses.toLocaleString()}</span>
        </div>
        
        <div className="bg-[#1a1a1a] p-6 rounded-lg border border-[#333] flex flex-col gap-2">
          <span className="text-gray-400 text-sm font-semibold uppercase tracking-wider">Net Profit</span>
          <span className="text-3xl font-bold text-amber-500">${(stats.revenue - stats.expenses).toLocaleString()}</span>
        </div>
        
        <div className="bg-[#1a1a1a] p-6 rounded-lg border border-[#333] flex flex-col gap-2">
          <span className="text-gray-400 text-sm font-semibold uppercase tracking-wider">Active Clients</span>
          <span className="text-3xl font-bold text-white">{stats.clients}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        <div className="bg-[#1a1a1a] p-6 rounded-lg border border-[#333] min-h-[300px]">
          <h3 className="text-lg font-semibold mb-4 text-gray-300">Recent Transactions</h3>
          <p className="text-gray-500 text-sm">No recent transactions to display.</p>
        </div>
        <div className="bg-[#1a1a1a] p-6 rounded-lg border border-[#333] min-h-[300px]">
          <h3 className="text-lg font-semibold mb-4 text-gray-300">Creator Performance</h3>
          <p className="text-gray-500 text-sm">{stats.creators} Active Creators on roster.</p>
        </div>
      </div>
    </div>
  );
};

export default OwnerDashboard;
