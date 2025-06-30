import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const Empty = ({ type = 'generic' }) => {
  const emptyStates = {
    generic: {
      icon: 'Inbox',
      title: 'Nothing here yet',
      description: 'When you have content, it will appear here.',
      action: null
    },
    chats: {
      icon: 'MessageCircle',
      title: 'No conversations yet',
      description: 'Start chatting with your contacts to see your conversations here.',
      action: { label: 'Start New Chat', icon: 'Plus' }
    },
    contacts: {
      icon: 'Users',
      title: 'No contacts found',
      description: 'Add contacts to start connecting and messaging with friends and colleagues.',
      action: { label: 'Add Contacts', icon: 'UserPlus' }
    },
    messages: {
      icon: 'MessageSquare',
      title: 'No messages yet',
      description: 'Send your first message to start the conversation.',
      action: { label: 'Send Message', icon: 'Send' }
    },
    search: {
      icon: 'Search',
      title: 'No results found',
      description: 'Try adjusting your search terms or filters to find what you\'re looking for.',
      action: { label: 'Clear Search', icon: 'X' }
    }
  };

  const state = emptyStates[type] || emptyStates.generic;

  return (
    <div className="flex items-center justify-center h-full bg-gradient-to-br from-surface-50 to-surface-100 p-8">
      <motion.div
        className="text-center max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="w-20 h-20 bg-gradient-to-br from-surface-200 to-surface-300 rounded-full flex items-center justify-center mb-6 mx-auto"
          animate={{ 
            scale: [1, 1.05, 1],
            rotate: [0, 2, -2, 0]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        >
          <ApperIcon name={state.icon} size={32} className="text-gray-500" />
        </motion.div>
        
        <h2 className="text-2xl font-display font-bold text-gray-900 mb-3">
          {state.title}
        </h2>
        
        <p className="text-gray-600 mb-6 leading-relaxed">
          {state.description}
        </p>
        
        {state.action && (
          <Button
            variant="primary"
            icon={state.action.icon}
            className="w-full"
          >
            {state.action.label}
          </Button>
        )}
        
        <div className="mt-8 pt-6 border-t border-surface-200">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <ApperIcon name="MessageCircle" size={16} className="text-primary-600" />
              </div>
              <p className="text-xs text-gray-600">Real-time Chat</p>
            </div>
            <div>
              <div className="w-8 h-8 bg-accent-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <ApperIcon name="Zap" size={16} className="text-accent-600" />
              </div>
              <p className="text-xs text-gray-600">Instant Delivery</p>
            </div>
            <div>
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                <ApperIcon name="Shield" size={16} className="text-purple-600" />
              </div>
              <p className="text-xs text-gray-600">Secure & Private</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Empty;