import React from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const Sidebar = ({ onClose }) => {
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
    <motion.div 
      className="w-80 bg-white shadow-xl border-r border-surface-200 flex flex-col h-full"
      initial={{ x: -320 }}
      animate={{ x: 0 }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
    >
      {/* Header */}
      <div className="p-6 bg-gradient-to-r from-primary-500 to-primary-600 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
<div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <ApperIcon name="MessageSquare" size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-display font-bold">PulseChat</h1>
              <p className="text-primary-100 text-sm">Messaging Platform</p>
            </div>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
            >
              <ApperIcon name="X" size={20} />
            </button>
          )}
        </div>
      </div>

      {/* User Profile */}
      <div className="p-4 border-b border-surface-200">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white font-semibold">
            JD
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900">John Doe</h3>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-accent-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Online</span>
            </div>
          </div>
          <button className="p-2 hover:bg-surface-100 rounded-lg transition-colors">
            <ApperIcon name="MoreVertical" size={16} className="text-gray-500" />
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4">
        <div className="space-y-1 px-3">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                  isActive
                    ? 'bg-gradient-to-r from-primary-50 to-primary-100 text-primary-700 shadow-sm'
                    : 'text-gray-700 hover:bg-surface-100 hover:text-gray-900'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div className={`p-2 rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-primary-500 text-white shadow-lg' 
                      : 'bg-surface-100 text-gray-600 group-hover:bg-surface-200'
                  }`}>
                    <ApperIcon name={item.icon} size={18} />
                  </div>
                  <span className="font-medium flex-1">{item.label}</span>
                  {item.badge && (
                    <span className="bg-accent-500 text-white text-xs px-2 py-1 rounded-full font-semibold min-w-[20px] text-center">
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-surface-200">
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>v2.1.0</span>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-accent-500 rounded-full animate-pulse"></div>
            <span>Connected</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar;