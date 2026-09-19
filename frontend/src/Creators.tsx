import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Creator {
  id: number;
  name: string;
  gender: string;
  ageGroup: string;
  niches: string;
  contact: string;
  location: string;
  languages: string;
  rates: string;
  bankInfo: string;
  status: string;
}

const Creators: React.FC = () => {
  const [creators, setCreators] = useState<Creator[]>([]);

  useEffect(() => {
    axios.get('/api/creators').then(res => setCreators(res.data)).catch(console.error);
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-semibold border-b border-[#333] pb-2">Creator Management Hub</h2>
      <div className="bg-[#1a1a1a] p-6 rounded-lg border border-[#333] overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-[#333] text-gray-400">
              <th className="pb-2">Name</th>
              <th className="pb-2">Contact</th>
              <th className="pb-2">Location</th>
              <th className="pb-2">Languages</th>
              <th className="pb-2">Demographics</th>
              <th className="pb-2">Niches</th>
              <th className="pb-2">Rates</th>
              <th className="pb-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {creators.map(c => (
              <tr key={c.id} className="border-b border-[#222] hover:bg-[#222]">
                <td className="py-3 font-medium">{c.name}</td>
                <td className="py-3 text-gray-300">{c.contact}</td>
                <td className="py-3 text-gray-300">{c.location}</td>
                <td className="py-3 text-gray-300">{c.languages}</td>
                <td className="py-3 text-gray-400 text-sm">{c.gender}, {c.ageGroup}</td>
                <td className="py-3 text-amber-500">{c.niches}</td>
                <td className="py-3 text-green-400">{c.rates}</td>
                <td className="py-3"><span className="px-2 py-1 bg-[#333] rounded text-xs">{c.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Creators;
