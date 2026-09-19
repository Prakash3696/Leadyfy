import React, { useEffect, useState } from 'react';
import axios from 'axios';

const EmployeeDashboard: React.FC = () => {
  const [tasks, setTasks] = useState([]);
  
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get('/api/tasks');
        setTasks(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTasks();
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-semibold border-b border-[#333] pb-2 text-blue-400">Employee Operations</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#1a1a1a] p-6 rounded-lg border border-[#333] flex flex-col gap-2">
          <span className="text-gray-400 text-sm font-semibold uppercase tracking-wider">My Active Tasks</span>
          <span className="text-3xl font-bold text-blue-400">{tasks.length}</span>
        </div>
        
        <div className="bg-[#1a1a1a] p-6 rounded-lg border border-[#333] flex flex-col gap-2">
          <span className="text-gray-400 text-sm font-semibold uppercase tracking-wider">Upcoming Shoots</span>
          <span className="text-3xl font-bold text-white">0</span>
        </div>
        
        <div className="bg-[#1a1a1a] p-6 rounded-lg border border-[#333] flex flex-col gap-2">
          <span className="text-gray-400 text-sm font-semibold uppercase tracking-wider">Pending Approvals</span>
          <span className="text-3xl font-bold text-amber-500">0</span>
        </div>
      </div>

      <div className="bg-[#1a1a1a] p-6 rounded-lg border border-[#333] mt-4">
        <h3 className="text-lg font-semibold mb-4 text-gray-300">My Task Queue</h3>
        {tasks.length === 0 ? (
          <p className="text-gray-500 text-sm">You have no pending tasks. Great job!</p>
        ) : (
          <ul className="flex flex-col gap-3">
            {tasks.map((t: any) => (
              <li key={t.id} className="p-4 bg-[#222] rounded border border-[#333] flex justify-between items-center">
                <div>
                  <h4 className="font-semibold text-white">{t.title}</h4>
                  <p className="text-sm text-gray-400">{t.description}</p>
                </div>
                <span className="px-3 py-1 text-xs rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  {t.priority}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default EmployeeDashboard;
