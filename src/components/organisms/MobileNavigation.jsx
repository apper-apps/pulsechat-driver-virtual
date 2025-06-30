import React from 'react';
import { NavLink } from 'react-router-dom';
import ApperIcon from '@/components/ApperIcon';

const MobileNavigation = () => {
  const navItems = [
    {
      path: '/chats',
      icon: 'MessageCircle',
      label: 'Chats',
      badge: 3
    },
    {
      path: '/contacts',
      icon: 'Users',
      label: 'Contacts'
    },
    {
      path: '/settings',
      icon: 'Settings',
      label: 'Settings'
    }
  ];

  return (
    <nav className="bg-white border-t border-surface-200 px-2 py-2 safe-area-pb">
      <div className="flex items-center justify-around">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center space-y-1 px-3 py-2 rounded-xl transition-colors relative ${
                isActive
                  ? 'text-primary-600'
                  : 'text-gray-500'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div className="relative">
                  <ApperIcon name={item.icon} size={24} />
                  {item.badge && (
                    <span className="absolute -top-2 -right-2 bg-accent-500 text-white text-xs px-1.5 py-0.5 rounded-full font-semibold min-w-[18px] text-center leading-none">
                      {item.badge}
                    </span>
                  )}
                </div>
                <span className="text-xs font-medium">{item.label}</span>
                {isActive && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary-600 rounded-full"></div>
                )}
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default MobileNavigation;