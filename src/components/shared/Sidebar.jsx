// src/components/shared/Sidebar.jsx
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  Users, 
  FilePlus, 
  History, 
  Printer, 
  LogOut,
  X // Close icon for mobile
} from 'lucide-react';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from '@/lib/utils';

const navLinks = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/staff', label: 'All Staff', icon: Users },
//   { to: '/staff', label: 'Generate ID', icon: FilePlus },
  { to: '/history', label: 'History', icon: History },
  { to: '/printing/queue', label: 'Print Queue', icon: Printer },
];

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate();
  const { logout, user } = useAuth(); // Assuming user object might have name/email

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getNavLinkClass = ({ isActive }) => {
    const baseClasses = "flex items-center gap-4 px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200";
    return isActive 
      ? `${baseClasses} bg-gray-800 text-white` 
      : `${baseClasses} text-gray-400 hover:bg-gray-800 hover:text-white`;
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-6 border-b border-gray-800">
        <div className="flex items-center gap-4">
          <img src="/assets/church_logo-1.png" alt="Logo" className="h-10 w-10" />
          <span className="text-lg font-semibold">DCLM ID System</span>
        </div>
        <Button variant="ghost" size="icon" className="lg:hidden text-gray-400 hover:text-white" onClick={() => setSidebarOpen(false)}>
          <X className="h-5 w-5" />
        </Button>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {navLinks.map((link) => (
          <NavLink key={link.label} to={link.to} className={getNavLinkClass} onClick={() => setSidebarOpen(false)}>
            <link.icon className="h-5 w-5" />
            {link.label}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto p-4 border-t border-gray-800">
        <div className="flex items-center gap-3 mb-4">
          <Avatar>
            <AvatarFallback>A</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-semibold">Admin</p>
            <p className="text-xs text-gray-400">{user?.email || 'admin@dclm.org'}</p>
          </div>
        </div>
        <Button variant="ghost" className="w-full justify-start gap-3 text-gray-400 hover:bg-gray-800 hover:text-white" onClick={handleLogout}>
          <LogOut className="h-5 w-5" />
          Log Out
        </Button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && <div className="fixed inset-0 bg-black/60 z-30 lg:hidden" onClick={() => setSidebarOpen(false)}></div>}
      
      {/* Static sidebar for Desktop */}
      <aside className="hidden lg:flex fixed top-0 left-0 z-40 h-screen w-64 bg-gray-900 text-white flex-col border-r border-gray-800">
        <SidebarContent />
      </aside>
      
      {/* Sliding sidebar for Mobile */}
      <aside className={cn("fixed top-0 left-0 z-40 h-screen w-64 bg-gray-900 text-white flex-col border-r border-gray-800 transition-transform duration-300 ease-in-out lg:hidden", sidebarOpen ? 'translate-x-0' : '-translate-x-full')}>
        <SidebarContent />
      </aside>
    </>
  );
};

export default Sidebar;