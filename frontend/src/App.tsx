import { BrowserRouter as Router, Routes, Route, Link, Outlet, Navigate } from 'react-router-dom';
import { LayoutDashboard, Users, UserSquare2, FileText, Camera, Video, LogOut, Briefcase, CheckSquare, DollarSign, LifeBuoy } from 'lucide-react';
import Orders from './Orders';
import Tasks from './Tasks';
import Financials from './Financials';
import Support from './Support';
import Clients from './Clients';
import Creators from './Creators';
import Scripts from './Scripts';
import Shoots from './Shoots';
import Videos from './Videos';
import Login from './Login';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider, useAuth } from './context/AuthContext';
import OwnerDashboard from './dashboards/OwnerDashboard';
import EmployeeDashboard from './dashboards/EmployeeDashboard';
import ClientPortal from './dashboards/ClientPortal';

function AdminLayout() {
  const { logout, user } = useAuth();
  
  return (
    <div className="flex h-screen bg-[#111111] text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1a1a1a] border-r border-[#333] p-4 flex flex-col justify-between">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-2 px-2">
            <div className="w-8 h-8 bg-amber-500 rounded-md flex items-center justify-center">
              <span className="text-[#111] font-bold">L</span>
            </div>
            <h1 className="text-xl font-bold tracking-wider text-amber-500">LEADFY</h1>
          </div>
          
          <nav className="flex flex-col gap-1">
            <Link to="/" className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#333] transition-colors">
              <LayoutDashboard size={20} className="text-amber-500" />
              <span>Dashboard</span>
            </Link>
            <Link to="/orders" className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#333] transition-colors">
              <Briefcase size={20} className="text-gray-400" />
              <span>Orders</span>
            </Link>
            <Link to="/clients" className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#333] transition-colors">
              <Users size={20} className="text-gray-400" />
              <span>Clients</span>
            </Link>
            <Link to="/creators" className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#333] transition-colors">
              <UserSquare2 size={20} className="text-gray-400" />
              <span>Creators</span>
            </Link>
            <Link to="/tasks" className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#333] transition-colors">
              <CheckSquare size={20} className="text-gray-400" />
              <span>Tasks</span>
            </Link>
            <Link to="/financials" className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#333] transition-colors">
              <DollarSign size={20} className="text-gray-400" />
              <span>Financials</span>
            </Link>
            <Link to="/support" className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#333] transition-colors">
              <LifeBuoy size={20} className="text-gray-400" />
              <span>Support</span>
            </Link>
            <Link to="/scripts" className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#333] transition-colors">
              <FileText size={20} className="text-gray-400" />
              <span>Scripts</span>
            </Link>
            <Link to="/shoots" className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#333] transition-colors">
              <Camera size={20} className="text-gray-400" />
              <span>Shoots</span>
            </Link>
            <Link to="/videos" className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#333] transition-colors">
              <Video size={20} className="text-gray-400" />
              <span>Videos</span>
            </Link>
          </nav>
        </div>
        
        <div className="border-t border-[#333] pt-4 mt-auto">
          <div className="px-3 pb-2 text-sm text-gray-400">{user?.email}</div>
          <button onClick={logout} className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-red-500/10 text-red-400 transition-colors">
            <LogOut size={20} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8">
        <Outlet />
      </main>
    </div>
  );
}

function ClientLayout() {
  const { logout, user } = useAuth();
  
  return (
    <div className="flex h-screen bg-[#111111] text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1a1a1a] border-r border-[#333] p-4 flex flex-col justify-between">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-2 px-2">
            <div className="w-8 h-8 bg-amber-500 rounded-md flex items-center justify-center">
              <span className="text-[#111] font-bold">L</span>
            </div>
            <h1 className="text-xl font-bold tracking-wider text-amber-500">CLIENT PORTAL</h1>
          </div>
          
          <nav className="flex flex-col gap-1">
            <Link to="/portal" className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#333] transition-colors">
              <LayoutDashboard size={20} className="text-amber-500" />
              <span>My Orders</span>
            </Link>
            <Link to="/portal/scripts" className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#333] transition-colors">
              <FileText size={20} className="text-gray-400" />
              <span>Script Approvals</span>
            </Link>
            <Link to="/portal/videos" className="flex items-center gap-3 p-3 rounded-lg hover:bg-[#333] transition-colors">
              <Video size={20} className="text-gray-400" />
              <span>Video Reviews</span>
            </Link>
          </nav>
        </div>
        
        <div className="border-t border-[#333] pt-4 mt-auto">
          <div className="px-3 pb-2 text-sm text-gray-400">{user?.email}</div>
          <button onClick={logout} className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-red-500/10 text-red-400 transition-colors">
            <LogOut size={20} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8">
        <Outlet />
      </main>
    </div>
  );
}

// Simple Layout Switcher based on Role
function RoleBasedLayout() {
  const { user } = useAuth();
  
  if (!user) return null;
  
  if (user.role === 'ROLE_CLIENT') {
    // If client hits the root URL, redirect them to the portal
    if (window.location.pathname === '/') {
      return <Navigate to="/portal" replace />;
    }
    return <ClientLayout />;
  }
  
  return <AdminLayout />;
}

// Internal Dashboard Switcher
function InternalDashboard() {
  const { user } = useAuth();
  if (user?.role === 'ROLE_OWNER' || user?.role === 'ROLE_ADMIN') {
    return <OwnerDashboard />;
  }
  return <EmployeeDashboard />;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route element={<RoleBasedLayout />}>
              {/* Admin/Employee Routes */}
              <Route path="/" element={<InternalDashboard />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/financials" element={<Financials />} />
              <Route path="/support" element={<Support />} />
              <Route path="/clients" element={<Clients />} />
              <Route path="/creators" element={<Creators />} />
              <Route path="/scripts" element={<Scripts />} />
              <Route path="/shoots" element={<Shoots />} />
              <Route path="/videos" element={<Videos />} />
              
              {/* Client Routes */}
              <Route path="/portal" element={<ClientPortal />} />
              <Route path="/portal/scripts" element={<div><h1>Script Approvals Placeholder</h1></div>} />
              <Route path="/portal/videos" element={<div><h1>Video Reviews Placeholder</h1></div>} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
