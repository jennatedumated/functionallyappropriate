import React from 'react';
import { NavLink } from 'react-router-dom';
import { Calendar, Target, FileText, BarChart3 } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const navItems = [
    { path: '/scheduling', label: 'Scheduling', icon: <Calendar className="text-teal" size={20} />, accent: 'teal' },
    { path: '/goals', label: 'Goal Writing', icon: <Target className="text-green" size={20} />, accent: 'green' },
    { path: '/reports', label: 'Report Drafting', icon: <FileText className="text-gold" size={20} />, accent: 'gold' },
    { path: '/dashboard', label: 'Student Dashboard', icon: <BarChart3 className="text-purple" size={20} />, accent: 'purple' },
  ];

  return (
    <aside
      className={`fixed top-16 left-0 z-30 h-[calc(100vh-4rem)] bg-bg-primary border-r border-border transition-all duration-300 ease-in-out transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } md:translate-x-0 md:static md:w-68 overflow-y-auto`}
    >
      <nav className="p-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `nav-link ${isActive ? 'active accent-' + item.accent : ''}`
            }
            end
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;