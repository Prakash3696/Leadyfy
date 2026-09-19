import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ClientPortal: React.FC = () => {
  const [orders, setOrders] = useState([]);
  const [newOrder, setNewOrder] = useState({
    packageName: 'Starter Package',
    contractedVideoCount: 5
  });

  const fetchOrders = async () => {
    try {
      const res = await axios.get('/api/orders'); // Assuming backend will filter to this client
      setOrders(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handlePurchase = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        clientId: 1, // Hardcoded for demo until AuthContext supplies client ID
        packageName: newOrder.packageName,
        contractedVideoCount: newOrder.contractedVideoCount,
        price: newOrder.contractedVideoCount * 200, // Example logic
        totalInvoiceAmount: newOrder.contractedVideoCount * 200 * 1.1, // 10% tax
        status: 'NEW'
      };
      await axios.post('/api/orders', payload);
      alert('Package purchased successfully!');
      fetchOrders();
    } catch (err) {
      console.error(err);
      alert('Failed to purchase package.');
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-semibold border-b border-[#333] pb-2 text-green-400">My Dashboard</h2>
      
      {/* Purchase Package Form */}
      <div className="bg-gradient-to-r from-green-900/40 to-[#1a1a1a] p-6 rounded-lg border border-green-500/30">
        <h3 className="text-xl font-semibold mb-2 text-white">Purchase a New Package</h3>
        <p className="text-gray-400 text-sm mb-4">Select a video package and instantly generate a new order.</p>
        
        <form onSubmit={handlePurchase} className="flex flex-col md:flex-row gap-4 items-end">
          <div className="flex flex-col gap-1 flex-1">
            <label className="text-xs text-gray-400 uppercase tracking-wide">Package Tier</label>
            <select 
              className="p-3 bg-[#222] border border-[#444] rounded text-white" 
              value={newOrder.packageName} 
              onChange={e => setNewOrder({...newOrder, packageName: e.target.value})}
            >
              <option value="Starter Package">Starter Package</option>
              <option value="Pro Package">Pro Package</option>
              <option value="Enterprise Package">Enterprise Package</option>
            </select>
          </div>
          
          <div className="flex flex-col gap-1 flex-1">
            <label className="text-xs text-gray-400 uppercase tracking-wide">Number of Videos</label>
            <input 
              type="number" 
              className="p-3 bg-[#222] border border-[#444] rounded text-white" 
              value={newOrder.contractedVideoCount} 
              onChange={e => setNewOrder({...newOrder, contractedVideoCount: Number(e.target.value)})}
              min="1"
            />
          </div>

          <button type="submit" className="p-3 px-8 bg-green-600 hover:bg-green-500 text-white font-bold rounded transition-colors whitespace-nowrap">
            Buy Now (${newOrder.contractedVideoCount * 200})
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#1a1a1a] p-6 rounded-lg border border-[#333] flex flex-col gap-2">
          <span className="text-gray-400 text-sm font-semibold uppercase tracking-wider">Active Packages</span>
          <span className="text-3xl font-bold text-green-400">{orders.length}</span>
        </div>
        
        <div className="bg-[#1a1a1a] p-6 rounded-lg border border-[#333] flex flex-col gap-2">
          <span className="text-gray-400 text-sm font-semibold uppercase tracking-wider">Pending Action</span>
          <span className="text-3xl font-bold text-amber-500">0</span>
        </div>
      </div>

      <div className="bg-[#1a1a1a] p-6 rounded-lg border border-[#333] mt-4">
        <h3 className="text-lg font-semibold mb-4 text-gray-300">Order History</h3>
        {orders.length === 0 ? (
          <p className="text-gray-500 text-sm">You have no active orders.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#333] text-gray-400 text-sm">
                  <th className="pb-3 font-medium">Package</th>
                  <th className="pb-3 font-medium">Videos Completed</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium">Balance</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o: any) => (
                  <tr key={o.id} className="border-b border-[#222] hover:bg-[#222] transition-colors">
                    <td className="py-4 text-white font-medium">{o.packageName}</td>
                    <td className="py-4 text-gray-300">{o.completedVideoCount || 0} / {o.contractedVideoCount || 0}</td>
                    <td className="py-4">
                      <span className="px-3 py-1 text-xs rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
                        {o.status}
                      </span>
                    </td>
                    <td className="py-4 text-gray-300">${o.outstandingBalance || 0}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientPortal;
