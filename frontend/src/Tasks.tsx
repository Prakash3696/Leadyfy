import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Task {
  id: number;
  title: string;
  description: string;
  assignedToId: number;
  createdById: number;
  status: string;
  priority: string;
  dueDate: string;
}

const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    assignedToId: 0,
    status: 'Pending',
    priority: 'Medium'
  });

  const fetchTasks = async () => {
    try {
      const res = await axios.get('/api/tasks');
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('/api/tasks', formData);
      setFormData({ title: '', description: '', assignedToId: 0, status: 'Pending', priority: 'Medium' });
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-semibold border-b border-[#333] pb-2">Task Management</h2>
      
      <div className="bg-[#1a1a1a] p-6 rounded-lg border border-[#333]">
        <h3 className="text-lg font-medium mb-4 text-blue-400">Create New Task</h3>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="text" placeholder="Task Title" className="p-3 bg-[#222] border border-[#444] rounded text-white" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required />
          <input type="number" placeholder="Assign To (Employee ID)" className="p-3 bg-[#222] border border-[#444] rounded text-white" value={formData.assignedToId || ''} onChange={e => setFormData({...formData, assignedToId: Number(e.target.value)})} required />
          <textarea placeholder="Description" className="p-3 bg-[#222] border border-[#444] rounded text-white md:col-span-2" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
          <select className="p-3 bg-[#222] border border-[#444] rounded text-white" value={formData.priority} onChange={e => setFormData({...formData, priority: e.target.value})}>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
            <option value="Urgent">Urgent</option>
          </select>
          <button type="submit" className="p-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded transition-colors">
            Assign Task
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {['Pending', 'In Progress', 'Completed'].map(statusFilter => (
          <div key={statusFilter} className="bg-[#1a1a1a] p-6 rounded-lg border border-[#333] min-h-[400px]">
            <h3 className="text-lg font-medium mb-4 border-b border-[#333] pb-2">{statusFilter}</h3>
            <div className="flex flex-col gap-3">
              {tasks.filter(t => t.status === statusFilter).map(t => (
                <div key={t.id} className="p-4 bg-[#222] rounded border border-[#444]">
                  <h4 className="font-semibold text-white">{t.title}</h4>
                  <p className="text-sm text-gray-400 mt-1 mb-3">{t.description}</p>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-500">Assignee: #{t.assignedToId}</span>
                    <span className={`px-2 py-1 rounded-full ${t.priority === 'Urgent' ? 'bg-red-500/20 text-red-400' : 'bg-[#333] text-gray-300'}`}>
                      {t.priority}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tasks;
