import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import ApperIcon from '@/components/ApperIcon';
import { motion } from 'framer-motion';

const ChatItem = ({ chat, isSelected, onClick }) => {
  const otherParticipant = chat.participants.find(p => p.id !== 'current-user');
  const lastMessageTime = chat.lastMessage 
    ? formatDistanceToNow(new Date(chat.lastMessage.timestamp), { addSuffix: true })
    : '';

  const getStatusIcon = (status) => {
    switch (status) {
      case 'sent':
        return <ApperIcon name="Check" size={16} className="text-gray-400" />;
      case 'delivered':
        return <ApperIcon name="CheckCheck" size={16} className="text-gray-400" />;
      case 'read':
        return <ApperIcon name="CheckCheck" size={16} className="text-primary-500" />;
      default:
        return null;
    }
  };

  return (
    <motion.div
      className={`p-4 cursor-pointer transition-all duration-200 rounded-xl mx-2 ${
        isSelected 
          ? 'bg-gradient-to-r from-primary-50 to-primary-100 shadow-sm border border-primary-200' 
          : 'hover:bg-surface-100'
      }`}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-start space-x-3">
        {/* Avatar */}
        <div className="relative flex-shrink-0">
          <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white font-semibold">
            {otherParticipant?.name?.charAt(0) || 'U'}
          </div>
          {otherParticipant?.isOnline && (
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-accent-500 border-2 border-white rounded-full"></div>
          )}
          {chat.isPinned && (
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-500 rounded-full flex items-center justify-center">
              <ApperIcon name="Pin" size={10} className="text-white" />
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h3 className={`font-semibold truncate ${
              isSelected ? 'text-primary-700' : 'text-gray-900'
            }`}>
              {otherParticipant?.name || 'Unknown User'}
            </h3>
            <div className="flex items-center space-x-1 text-xs text-gray-500 flex-shrink-0 ml-2">
              {chat.lastMessage?.senderId === 'current-user' && getStatusIcon(chat.lastMessage?.status)}
              <span>{lastMessageTime}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600 truncate">
              {chat.lastMessage?.type === 'image' && (
                <span className="flex items-center">
                  <ApperIcon name="Image" size={14} className="mr-1" />
                  Photo
                </span>
              )}
              {chat.lastMessage?.type === 'voice' && (
                <span className="flex items-center">
                  <ApperIcon name="Mic" size={14} className="mr-1" />
                  Voice message
                </span>
              )}
              {chat.lastMessage?.type === 'text' && chat.lastMessage?.content}
              {!chat.lastMessage && 'No messages yet'}
            </p>
            
            {/* Unread count */}
            {chat.unreadCount > 0 && (
              <div className="bg-accent-500 text-white text-xs px-2 py-1 rounded-full font-semibold min-w-[20px] text-center flex-shrink-0 ml-2">
                {chat.unreadCount > 99 ? '99+' : chat.unreadCount}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ChatItem;