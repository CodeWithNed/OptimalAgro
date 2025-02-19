import React from 'react';
import { Link } from 'react-router-dom';
import {
  LayoutDashboard,
  ShoppingBasket,
  ClipboardList,
  MessageSquare,
  Settings,
  LogOut,
} from 'lucide-react';

const Sidebar: React.FC = () => {
  const menuItems = [
    { icon: <LayoutDashboard size={24} />, label: 'Home', path: '/' },
    { icon: <ShoppingBasket size={24} />, label: 'Crops', path: '/crops' },
    { icon: <ClipboardList size={24} />, label: 'Timeline', path: '/timeline' },
    { icon: <MessageSquare size={24} />, label: 'Summary', path: '/summary' },
    { icon: <Settings size={24} />, label: 'Settings', path: '/settings' },
  ];

  return (
    <div className="w-64 bg-gray-800 text-white min-h-screen p-4">
      <div className="flex items-center gap-2 mb-8">
        <ShoppingBasket className="text-orange-400" size={32} />
        <span className="text-xl font-bold">Cultivate.ai</span>
      </div>

      <ul className="space-y-4">
        {menuItems.map((item) => (
          <li key={item.label}>
            <Link
              to={item.path}
              className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="absolute bottom-4 w-fit]">
        <button className="flex items-center gap-3 px-4 py-3 w-fit text-white hover:bg-gray-700 rounded-lg transition-colors" >
          <LogOut size={24} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
