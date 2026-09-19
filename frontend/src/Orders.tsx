import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Order {
  id: number;
  clientId: number;
  packageName: string;
  contractedVideoCount: number;
  completedVideoCount: number;
  price: number;
  gstTax: number;
  totalInvoiceAmount: number;
  amountReceived: number;
  outstandingBalance: number;
  startDate: string;
  dueDate: string;
  status: string;
  assignedTeam: string;
}

interface Client {
  id: number;
  clientName: string;
  companyName: string;
  email: string;
  phone: string;
  whatsapp: string;
  industry: string;
  gstTaxId: string;
  assetsBrandKits: string;
  assignedEmployeeId: number;
  status: string;
}

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  
  // Toggle state
  const [isNewClient, setIsNewClient] = useState(true);

  // Form states
  const [clientData, setClientData] = useState({
    id: 0,
    clientName: '', companyName: '', email: '', phone: '', whatsapp: '',
    industry: '', gstTaxId: '', assetsBrandKits: '', assignedEmployeeId: 0, status: 'NEW'
  });

  const [orderData, setOrderData] = useState({
    packageName: '',
    contractedVideoCount: 0,
    price: 0,
    gstTax: 0,
    totalInvoiceAmount: 0,
    amountReceived: 0,
    outstandingBalance: 0,
    status: 'NEW',
    assignedTeam: ''
  });

  const fetchData = async () => {
    try {
      const [ordRes, cliRes] = await Promise.all([
        axios.get('/api/orders'),
        axios.get('/api/clients')
      ]);
      setOrders(ordRes.data);
      setClients(cliRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleClientSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = Number(e.target.value);
    if (!selectedId) {
      setClientData({ id: 0, clientName: '', companyName: '', email: '', phone: '', whatsapp: '', industry: '', gstTaxId: '', assetsBrandKits: '', assignedEmployeeId: 0, status: 'NEW' });
      return;
    }
    const found = clients.find(c => c.id === selectedId);
    if (found) {
      setClientData(found);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Step 1: Create or Update Client
      const clientPayload = { ...clientData };
      if (isNewClient) {
        delete clientPayload.id; // ensure backend creates a new one if it doesn't match email
      }
      const clientRes = await axios.post('/api/clients', clientPayload);
      const generatedClientId = clientRes.data.id;

      // Step 2: Create Order using generated/updated Client ID
      const orderPayload = {
        ...orderData,
        clientId: generatedClientId
      };
      await axios.post('/api/orders', orderPayload);

      alert('Client & Order created successfully!');
      
      // Reset forms
      setClientData({ id: 0, clientName: '', companyName: '', email: '', phone: '', whatsapp: '', industry: '', gstTaxId: '', assetsBrandKits: '', assignedEmployeeId: 0, status: 'NEW' });
      setOrderData({ packageName: '', contractedVideoCount: 0, price: 0, gstTax: 0, totalInvoiceAmount: 0, amountReceived: 0, outstandingBalance: 0, status: 'NEW', assignedTeam: '' });
      setIsNewClient(true);
      fetchData();
    } catch (err) {
      console.error(err);
      alert('Error creating order sequence. Check console.');
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-semibold border-b border-[#333] pb-2">Order Management</h2>
      
      <div className="bg-gradient-to-br from-[#1a1a1a] to-[#222] p-6 rounded-lg border border-[#333] shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-amber-500">Unified Order Generation</h3>
          <div className="flex gap-2 bg-[#111] p-1 rounded-md border border-[#333]">
            <button 
              type="button"
              onClick={() => setIsNewClient(true)} 
              className={`px-4 py-2 rounded text-sm font-medium transition-colors ${isNewClient ? 'bg-amber-600 text-black' : 'text-gray-400 hover:text-white'}`}
            >
              New Client
            </button>
            <button 
              type="button"
              onClick={() => setIsNewClient(false)} 
              className={`px-4 py-2 rounded text-sm font-medium transition-colors ${!isNewClient ? 'bg-amber-600 text-black' : 'text-gray-400 hover:text-white'}`}
            >
              Existing Client
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          
          {/* CLIENT SECTION */}
          <div className="border border-[#444] p-4 rounded bg-[#111]">
            <h4 className="text-gray-300 font-semibold mb-4 border-b border-[#333] pb-2">1. Client Details</h4>
            
            {!isNewClient && (
              <div className="mb-4">
                <label className="block text-xs text-gray-400 uppercase tracking-wide mb-1">Select Existing Client</label>
                <select className="w-full p-3 bg-[#222] border border-[#444] rounded text-white" value={clientData.id || ''} onChange={handleClientSelect} required>
                  <option value="">-- Choose a Client --</option>
                  {clients.map(c => (
                    <option key={c.id} value={c.id}>{c.clientName} ({c.companyName}) - {c.email}</option>
                  ))}
                </select>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input type="text" placeholder="Client Name" className="p-3 bg-[#222] border border-[#444] rounded text-white" value={clientData.clientName} onChange={e => setClientData({...clientData, clientName: e.target.value})} required />
              <input type="text" placeholder="Company Name" className="p-3 bg-[#222] border border-[#444] rounded text-white" value={clientData.companyName} onChange={e => setClientData({...clientData, companyName: e.target.value})} required />
              <input type="email" placeholder="Email (Used for Login)" className="p-3 bg-[#222] border border-[#444] rounded text-white" value={clientData.email} onChange={e => setClientData({...clientData, email: e.target.value})} required />
              <input type="text" placeholder="Phone" className="p-3 bg-[#222] border border-[#444] rounded text-white" value={clientData.phone} onChange={e => setClientData({...clientData, phone: e.target.value})} />
              <input type="text" placeholder="WhatsApp" className="p-3 bg-[#222] border border-[#444] rounded text-white" value={clientData.whatsapp} onChange={e => setClientData({...clientData, whatsapp: e.target.value})} />
              <input type="text" placeholder="GST Tax ID" className="p-3 bg-[#222] border border-[#444] rounded text-white" value={clientData.gstTaxId} onChange={e => setClientData({...clientData, gstTaxId: e.target.value})} />
              <input type="text" placeholder="Brand Kit Link" className="p-3 bg-[#222] border border-[#444] rounded text-white" value={clientData.assetsBrandKits} onChange={e => setClientData({...clientData, assetsBrandKits: e.target.value})} />
            </div>
            {isNewClient && <p className="text-xs text-amber-500 mt-3 italic">* A secure Portal account will be automatically generated with the password: {clientData.email ? clientData.email + '@123' : 'email@123'}</p>}
          </div>

          {/* ORDER SECTION */}
          <div className="border border-[#444] p-4 rounded bg-[#111]">
            <h4 className="text-gray-300 font-semibold mb-4 border-b border-[#333] pb-2">2. Package Details</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input type="text" placeholder="Package Name" className="p-3 bg-[#222] border border-[#444] rounded text-white" value={orderData.packageName} onChange={e => setOrderData({...orderData, packageName: e.target.value})} required />
              <input type="number" placeholder="Video Count" className="p-3 bg-[#222] border border-[#444] rounded text-white" value={orderData.contractedVideoCount || ''} onChange={e => setOrderData({...orderData, contractedVideoCount: Number(e.target.value)})} required />
              <input type="number" placeholder="Price (excl. Tax)" className="p-3 bg-[#222] border border-[#444] rounded text-white" value={orderData.price || ''} onChange={e => setOrderData({...orderData, price: Number(e.target.value)})} required />
              <input type="number" placeholder="GST/Tax Amount" className="p-3 bg-[#222] border border-[#444] rounded text-white" value={orderData.gstTax || ''} onChange={e => setOrderData({...orderData, gstTax: Number(e.target.value)})} />
              <input type="number" placeholder="Total Invoice Amount" className="p-3 bg-[#222] border border-[#444] rounded text-white" value={orderData.totalInvoiceAmount || ''} onChange={e => setOrderData({...orderData, totalInvoiceAmount: Number(e.target.value)})} />
              <select className="p-3 bg-[#222] border border-[#444] rounded text-white" value={orderData.status} onChange={e => setOrderData({...orderData, status: e.target.value})}>
                <option value="NEW">NEW</option>
                <option value="ONBOARDING">ONBOARDING</option>
                <option value="IN_PRODUCTION">IN PRODUCTION</option>
              </select>
            </div>
          </div>

          <button type="submit" className="p-4 bg-amber-600 hover:bg-amber-500 text-black font-bold text-lg rounded shadow-lg transition-transform active:scale-95">
            Generate Client & Order
          </button>
        </form>
      </div>

      <div className="bg-[#1a1a1a] p-6 rounded-lg border border-[#333] overflow-x-auto mt-4">
        <h3 className="text-lg font-medium mb-4">Active Orders</h3>
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-[#333] text-gray-400">
              <th className="pb-2">Client ID</th>
              <th className="pb-2">Package</th>
              <th className="pb-2">Videos</th>
              <th className="pb-2">Total Amount</th>
              <th className="pb-2">Balance</th>
              <th className="pb-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(o => (
              <tr key={o.id} className="border-b border-[#222] hover:bg-[#222]">
                <td className="py-3 text-gray-300">#{o.clientId}</td>
                <td className="py-3 text-amber-500 font-medium">{o.packageName}</td>
                <td className="py-3">{o.completedVideoCount || 0} / {o.contractedVideoCount || 0}</td>
                <td className="py-3 text-green-400">${o.totalInvoiceAmount || o.price}</td>
                <td className="py-3 text-red-400">${o.outstandingBalance || 0}</td>
                <td className="py-3"><span className="px-2 py-1 bg-[#333] rounded text-xs">{o.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
