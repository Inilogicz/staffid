// src/components/shared/Header.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { UserNav } from '@/components/shared/UserNav';
import { PlusCircle, Menu } from 'lucide-react';

const Header = ({ setSidebarOpen }) => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b bg-background px-4 sm:px-6">
      {/* Left side: Mobile Toggle & App Title */}
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          className="shrink-0 lg:hidden"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
        {/* <h1 className="hidden md:block text-xl font-semibold">
          DEEPER CHRISTIAN LIFE MINISTRY STAFF ID SYSTEM 
        </h1> */}
        <img src="/assets/dclm.png" alt="" 
        width={350} height={350} className="hidden md:block" />
      </div>
      
      {/* Right side: Header Actions */}
      <div className="flex items-center gap-4">
        {/* <Button onClick={() => navigate('/staff/new')}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create New ID
        </Button> */}
        <UserNav />
      </div>
    </header>
  );
};

export default Header;