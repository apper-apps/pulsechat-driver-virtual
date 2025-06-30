import React from 'react';
import ApperIcon from '@/components/ApperIcon';
import { motion } from 'framer-motion';

const ChatHeader = ({ chat, onBack, isTyping }) => {
  const otherParticipant = chat.participants.find(p => p.id !== 'current-user');

  return (
    <div className="bg-white border-b border-surface-200 px-4 py-3">
      <div className="flex items-center justify-between">
        {/* Back button and participant info */}
        <div className="flex items-center space-x-3">
          <button
            onClick={onBack}
            className="md:hidden p-2 hover:bg-surface-100 rounded-lg transition-colors"
          >
            <ApperIcon name="ArrowLeft" size={20} className="text-gray-600" />
          </button>
          
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white font-semibold">
              {otherParticipant?.name?.charAt(0) || 'U'}
            </div>
            {otherParticipant?.isOnline && (
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-accent-500 border-2 border-white rounded-full"></div>
            )}
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900">
              {otherParticipant?.name || 'Unknown User'}
            </h3>
            <p className="text-sm text-gray-600">
              {isTyping ? (
                <span className="flex items-center space-x-1">
                  <span>Typing</span>
                  <div className="typing-indicator">
                    <div className="typing-dot"></div>
                    <div className="typing-dot"></div>
                    <div className="typing-dot"></div>
                  </div>
                </span>
              ) : otherParticipant?.isOnline ? (
                'Online'
              ) : (
                `Last seen ${otherParticipant?.lastSeen || 'recently'}`
              )}
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center space-x-2">
          <motion.button
            className="p-2 hover:bg-surface-100 rounded-lg transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ApperIcon name="Phone" size={20} className="text-gray-600" />
          </motion.button>
          <motion.button
            className="p-2 hover:bg-surface-100 rounded-lg transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ApperIcon name="Video" size={20} className="text-gray-600" />
          </motion.button>
          <motion.button
            className="p-2 hover:bg-surface-100 rounded-lg transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ApperIcon name="MoreVertical" size={20} className="text-gray-600" />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;