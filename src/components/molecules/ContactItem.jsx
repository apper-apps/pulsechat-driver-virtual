import React from 'react';
import ApperIcon from '@/components/ApperIcon';
import { motion } from 'framer-motion';

const ContactItem = ({ contact }) => {
  return (
    <motion.div
      className="p-4 hover:bg-surface-100 transition-colors cursor-pointer"
      whileHover={{ x: 4 }}
    >
      <div className="flex items-center space-x-3">
        {/* Avatar */}
        <div className="relative flex-shrink-0">
          <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white font-semibold">
            {contact.name.charAt(0)}
          </div>
          {contact.isOnline && (
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-accent-500 border-2 border-white rounded-full"></div>
          )}
        </div>

        {/* Contact Info */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 truncate">
            {contact.name}
          </h3>
          <p className="text-sm text-gray-600 truncate">
            {contact.status}
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2 flex-shrink-0">
          <button className="p-2 hover:bg-surface-200 rounded-lg transition-colors">
            <ApperIcon name="MessageCircle" size={18} className="text-primary-600" />
          </button>
          <button className="p-2 hover:bg-surface-200 rounded-lg transition-colors">
            <ApperIcon name="Phone" size={18} className="text-gray-600" />
          </button>
          <button className="p-2 hover:bg-surface-200 rounded-lg transition-colors">
            <ApperIcon name="Video" size={18} className="text-gray-600" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ContactItem;