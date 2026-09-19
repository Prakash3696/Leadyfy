import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Financials: React.FC = () => {
  const [payments, setPayments] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [payouts, setPayouts] = useState([]);
  
  const fetchAll = async () => {
    try {
      const [payRes, expRes, poutRes] = await Promise.all([
        axios.get('/api/payments'),
        axios.get('/api/expenses'),
        axios.get('/api/creator-payouts')
      ]);
      setPayments(payRes.data);
      setExpenses(expRes.data);
      setPayouts(poutRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-semibold border-b border-[#333] pb-2 text-green-500">Financial Ledger</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Payments Ledger */}
        <div className="bg-[#1a1a1a] p-6 rounded-lg border border-[#333]">
          <h3 className="text-lg font-medium mb-4 text-green-400">Incoming Payments (Clients)</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-[#333] text-gray-400">
                  <th className="pb-2">Order ID</th>
                  <th className="pb-2">Amount</th>
                  <th className="pb-2">Method</th>
                  <th className="pb-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {payments.length === 0 ? (
                  <tr><td colSpan={4} className="py-4 text-gray-500">No payments logged.</td></tr>
                ) : (
                  payments.map((p: any) => (
                    <tr key={p.id} className="border-b border-[#222]">
                      <td className="py-2">#{p.orderId}</td>
                      <td className="py-2 text-green-400 font-bold">${p.amount}</td>
                      <td className="py-2">{p.method}</td>
                      <td className="py-2">{p.status}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Expenses Ledger */}
        <div className="bg-[#1a1a1a] p-6 rounded-lg border border-[#333]">
          <h3 className="text-lg font-medium mb-4 text-red-400">Agency Expenses</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-[#333] text-gray-400">
                  <th className="pb-2">Category</th>
                  <th className="pb-2">Amount</th>
                  <th className="pb-2">Vendor</th>
                  <th className="pb-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {expenses.length === 0 ? (
                  <tr><td colSpan={4} className="py-4 text-gray-500">No expenses logged.</td></tr>
                ) : (
                  expenses.map((e: any) => (
                    <tr key={e.id} className="border-b border-[#222]">
                      <td className="py-2">{e.category}</td>
                      <td className="py-2 text-red-400 font-bold">${e.amount}</td>
                      <td className="py-2">{e.vendor}</td>
                      <td className="py-2">{e.status}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Creator Payouts Ledger */}
      <div className="bg-[#1a1a1a] p-6 rounded-lg border border-[#333]">
        <h3 className="text-lg font-medium mb-4 text-amber-500">Creator Payouts</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[#333] text-gray-400">
                <th className="pb-2">Creator ID</th>
                <th className="pb-2">Shoot / Video ID</th>
                <th className="pb-2">Amount</th>
                <th className="pb-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {payouts.length === 0 ? (
                <tr><td colSpan={4} className="py-4 text-gray-500">No creator payouts logged.</td></tr>
              ) : (
                payouts.map((p: any) => (
                  <tr key={p.id} className="border-b border-[#222]">
                    <td className="py-2">#{p.creatorId}</td>
                    <td className="py-2">S:#{p.shootId} / V:#{p.videoId}</td>
                    <td className="py-2 text-amber-500 font-bold">${p.amount}</td>
                    <td className="py-2">{p.status}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Financials;
