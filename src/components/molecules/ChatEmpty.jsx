import React from 'react';
import ApperIcon from '@/components/ApperIcon';
import { motion } from 'framer-motion';

const ChatEmpty = () => {
  return (
    <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-surface-50 to-surface-100 p-8">
      <motion.div
        className="text-center max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="w-24 h-24 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center mb-6 mx-auto">
          <ApperIcon name="MessageCircle" size={36} className="text-primary-600" />
        </div>
        
        <h2 className="text-2xl font-display font-bold text-gray-900 mb-3">
          Welcome to PulseChat
        </h2>
        
        <p className="text-gray-600 mb-6 leading-relaxed">
          Select a conversation from the sidebar to start messaging, or create a new chat to connect with your contacts.
        </p>
        
        <div className="space-y-3">
          <motion.button
            className="w-full px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center justify-center space-x-2">
              <ApperIcon name="Plus" size={20} />
              <span>Start New Chat</span>
            </div>
          </motion.button>
          
          <motion.button
            className="w-full px-6 py-3 bg-white border border-surface-300 text-gray-700 rounded-xl font-semibold hover:bg-surface-50 transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center justify-center space-x-2">
              <ApperIcon name="Users" size={20} />
              <span>View Contacts</span>
            </div>
          </motion.button>
        </div>
        
        <div className="mt-8 pt-6 border-t border-surface-200">
          <h3 className="font-semibold text-gray-900 mb-3">Enhanced Features</h3>
          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <ApperIcon name="Clock" size={16} className="text-primary-500" />
              <span>Message Scheduling</span>
            </div>
            <div className="flex items-center space-x-2">
              <ApperIcon name="Search" size={16} className="text-primary-500" />
              <span>Smart Search</span>
            </div>
            <div className="flex items-center space-x-2">
              <ApperIcon name="Smile" size={16} className="text-primary-500" />
              <span>Quick Reactions</span>
            </div>
            <div className="flex items-center space-x-2">
              <ApperIcon name="Palette" size={16} className="text-primary-500" />
              <span>Custom Themes</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ChatEmpty;