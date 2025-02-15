import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
  return (
    <div className="w-64 bg-gray-800 text-white min-h-screen p-4">
      <h2 className="text-2xl font-bold mb-6">Navigation</h2>
      <ul className="space-y-4">
        <li>
          <Link to="/" className="hover:text-blue-400">
            Home
          </Link>
        </li>
        <li>
          <Link to="/crops" className="hover:text-blue-400">
            Crop Information
          </Link>
        </li>
        <li>
          <Link to="/create-account" className="hover:text-blue-400">
            Create Account
          </Link>
        </li>
        <li>
          <Link to="/timeline" className="hover:text-blue-400">
            Timeline
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
