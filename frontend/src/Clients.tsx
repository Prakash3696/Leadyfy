import React, { useEffect, useState } from 'react';
import axios from 'axios';

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

const Clients: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [formData, setFormData] = useState({ 
    clientName: '', companyName: '', email: '', phone: '', whatsapp: '',
    industry: '', gstTaxId: '', assetsBrandKits: '', assignedEmployeeId: 0, status: 'NEW' 
  });

  const fetchClients = async () => {
    try {
      const res = await axios.get('/api/clients');
      setClients(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('/api/clients', formData);
      setFormData({ 
        clientName: '', companyName: '', email: '', phone: '', whatsapp: '',
        industry: '', gstTaxId: '', assetsBrandKits: '', assignedEmployeeId: 0, status: 'NEW' 
      });
      fetchClients();
    } catch (err) {
      console.error(err);
      alert('Error creating client. Check console.');
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-semibold border-b border-[#333] pb-2">Client Management</h2>
      
      {/* Create Client Form */}
      <div className="bg-[#1a1a1a] p-6 rounded-lg border border-[#333]">
        <h3 className="text-lg font-medium mb-4 text-amber-500">Add New Client</h3>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input type="text" placeholder="Client Name" className="p-3 bg-[#222] border border-[#444] rounded text-white" value={formData.clientName} onChange={e => setFormData({...formData, clientName: e.target.value})} required />
          <input type="text" placeholder="Company Name" className="p-3 bg-[#222] border border-[#444] rounded text-white" value={formData.companyName} onChange={e => setFormData({...formData, companyName: e.target.value})} required />
          <input type="email" placeholder="Email" className="p-3 bg-[#222] border border-[#444] rounded text-white" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} required />
          <input type="text" placeholder="Phone" className="p-3 bg-[#222] border border-[#444] rounded text-white" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
          <input type="text" placeholder="WhatsApp" className="p-3 bg-[#222] border border-[#444] rounded text-white" value={formData.whatsapp} onChange={e => setFormData({...formData, whatsapp: e.target.value})} />
          <input type="text" placeholder="Industry" className="p-3 bg-[#222] border border-[#444] rounded text-white" value={formData.industry} onChange={e => setFormData({...formData, industry: e.target.value})} />
          <input type="text" placeholder="GST Tax ID" className="p-3 bg-[#222] border border-[#444] rounded text-white" value={formData.gstTaxId} onChange={e => setFormData({...formData, gstTaxId: e.target.value})} />
          <input type="text" placeholder="Brand Kit Link" className="p-3 bg-[#222] border border-[#444] rounded text-white" value={formData.assetsBrandKits} onChange={e => setFormData({...formData, assetsBrandKits: e.target.value})} />
          <input type="number" placeholder="Assigned Employee ID" className="p-3 bg-[#222] border border-[#444] rounded text-white" value={formData.assignedEmployeeId || ''} onChange={e => setFormData({...formData, assignedEmployeeId: Number(e.target.value)})} />
          
          <button type="submit" className="md:col-span-3 p-3 bg-amber-600 hover:bg-amber-500 text-black font-semibold rounded transition-colors mt-2">
            Add Client
          </button>
        </form>
      </div>

      {/* Client List */}
      <div className="bg-[#1a1a1a] p-6 rounded-lg border border-[#333] overflow-x-auto">
        <h3 className="text-lg font-medium mb-4">Client List</h3>
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-[#333] text-gray-400">
              <th className="pb-2">Name</th>
              <th className="pb-2">Company</th>
              <th className="pb-2">Industry</th>
              <th className="pb-2">GST ID</th>
              <th className="pb-2">Email</th>
              <th className="pb-2">Employee ID</th>
              <th className="pb-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {clients.map(c => (
              <tr key={c.id} className="border-b border-[#222] hover:bg-[#222]">
                <td className="py-3">{c.clientName}</td>
                <td className="py-3 text-amber-500">{c.companyName}</td>
                <td className="py-3 text-gray-300">{c.industry}</td>
                <td className="py-3 text-gray-400">{c.gstTaxId}</td>
                <td className="py-3 text-gray-300">{c.email}</td>
                <td className="py-3">#{c.assignedEmployeeId}</td>
                <td className="py-3"><span className="px-2 py-1 bg-[#333] rounded text-xs">{c.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Clients;
