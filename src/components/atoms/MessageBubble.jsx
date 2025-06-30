import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import ApperIcon from '@/components/ApperIcon';
import { motion } from 'framer-motion';

const MessageBubble = ({ message, onReactionClick }) => {
  const isSent = message.senderId === 'current-user';
  const timeString = formatDistanceToNow(new Date(message.timestamp), { addSuffix: true });

  const getStatusIcon = () => {
    if (!isSent) return null;
    
    switch (message.status) {
      case 'sending':
        return <ApperIcon name="Clock" size={12} className="text-gray-400 animate-spin" />;
      case 'sent':
        return <ApperIcon name="Check" size={12} className="text-gray-400" />;
      case 'delivered':
        return <ApperIcon name="CheckCheck" size={12} className="text-gray-400" />;
      case 'read':
        return <ApperIcon name="CheckCheck" size={12} className="text-primary-500" />;
      case 'failed':
        return <ApperIcon name="AlertCircle" size={12} className="text-red-500" />;
      default:
        return null;
    }
  };

  const renderMessageContent = () => {
    switch (message.type) {
      case 'image':
        return (
          <div className="space-y-2">
            <div className="w-48 h-32 bg-surface-200 rounded-lg flex items-center justify-center">
              <ApperIcon name="Image" size={24} className="text-gray-400" />
            </div>
            {message.content && <p>{message.content}</p>}
          </div>
        );
      
      case 'voice':
        return (
          <div className="flex items-center space-x-3 py-2">
            <button className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
              <ApperIcon name="Play" size={16} className="text-white ml-0.5" />
            </button>
            <div className="flex-1 h-1 bg-gray-300 rounded-full">
              <div className="h-full w-1/3 bg-primary-500 rounded-full"></div>
            </div>
            <span className="text-xs text-gray-500">0:32</span>
          </div>
        );
      
      case 'file':
        return (
          <div className="flex items-center space-x-3 py-2">
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
              <ApperIcon name="FileText" size={18} className="text-white" />
            </div>
            <div className="flex-1">
              <p className="font-medium">{message.content}</p>
              <p className="text-xs text-gray-500">Document • 2.4 MB</p>
            </div>
          </div>
        );
      
      default:
        return <p className="whitespace-pre-wrap">{message.content}</p>;
    }
  };

  return (
    <motion.div
      className={`flex ${isSent ? 'justify-end' : 'justify-start'} group`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className={`relative max-w-sm ${isSent ? 'ml-16' : 'mr-16'}`}>
        {/* Message Bubble */}
        <div
          className={`message-bubble ${isSent ? 'sent' : 'received'} group-hover:shadow-md transition-shadow cursor-pointer`}
          onClick={onReactionClick}
        >
          {renderMessageContent()}
          
          {/* Time and Status */}
          <div className={`flex items-center justify-end space-x-1 mt-1 ${
            isSent ? 'text-white text-opacity-70' : 'text-gray-500'
          }`}>
            <span className="text-xs">{timeString.replace('about ', '')}</span>
            {getStatusIcon()}
          </div>
        </div>

        {/* Reactions */}
        {message.reactions && message.reactions.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1">
            {message.reactions.reduce((acc, reaction) => {
              const existing = acc.find(r => r.emoji === reaction.emoji);
              if (existing) {
                existing.count++;
                if (reaction.userId === 'current-user') {
                  existing.byCurrentUser = true;
                }
              } else {
                acc.push({
                  emoji: reaction.emoji,
                  count: 1,
                  byCurrentUser: reaction.userId === 'current-user'
                });
              }
              return acc;
            }, []).map((reaction, index) => (
              <span
                key={index}
                className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs ${
                  reaction.byCurrentUser
                    ? 'bg-primary-100 text-primary-700 border border-primary-200'
                    : 'bg-surface-100 text-gray-700 border border-surface-200'
                }`}
              >
                <span>{reaction.emoji}</span>
                <span className="font-medium">{reaction.count}</span>
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default MessageBubble;