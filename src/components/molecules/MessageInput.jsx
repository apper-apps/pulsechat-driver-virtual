import React, { useState, useRef } from 'react';
import ApperIcon from '@/components/ApperIcon';
import { motion } from 'framer-motion';

const MessageInput = ({ onSendMessage, onTypingStart, onTypingStop }) => {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [showAttachments, setShowAttachments] = useState(false);
  const fileInputRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setMessage(value);
    
    // Handle typing indicators
    if (value.trim() && !typingTimeoutRef.current) {
      onTypingStart?.();
    }
    
    // Clear existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    
    // Set new timeout
    typingTimeoutRef.current = setTimeout(() => {
      onTypingStop?.();
      typingTimeoutRef.current = null;
    }, 1000);
  };

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage('');
      
      // Clear typing timeout
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
        typingTimeoutRef.current = null;
        onTypingStop?.();
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleAttachment = (type) => {
    setShowAttachments(false);
    
    switch (type) {
      case 'image':
        fileInputRef.current?.click();
        break;
      case 'camera':
        console.log('Open camera');
        break;
      case 'document':
        console.log('Select document');
        break;
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Simulate file upload
      onSendMessage(`📎 ${file.name}`, 'file');
    }
  };

  const attachmentOptions = [
    { type: 'image', icon: 'Image', label: 'Photo', color: 'bg-purple-500' },
    { type: 'camera', icon: 'Camera', label: 'Camera', color: 'bg-pink-500' },
    { type: 'document', icon: 'FileText', label: 'Document', color: 'bg-blue-500' }
  ];

  return (
    <div className="bg-white border-t border-surface-200 p-4">
      {/* Attachment Menu */}
      {showAttachments && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="mb-4 flex space-x-4"
        >
          {attachmentOptions.map((option) => (
            <button
              key={option.type}
              onClick={() => handleAttachment(option.type)}
              className={`flex flex-col items-center space-y-2 p-3 rounded-xl ${option.color} text-white hover:opacity-90 transition-opacity`}
            >
              <ApperIcon name={option.icon} size={24} />
              <span className="text-xs font-medium">{option.label}</span>
            </button>
          ))}
        </motion.div>
      )}

      {/* Message Input */}
      <div className="flex items-end space-x-3">
        {/* Attachment Button */}
        <button
          onClick={() => setShowAttachments(!showAttachments)}
          className="p-3 hover:bg-surface-100 rounded-full transition-colors flex-shrink-0"
        >
          <ApperIcon 
            name={showAttachments ? "X" : "Plus"} 
            size={20} 
            className="text-gray-600" 
          />
        </button>

        {/* Input Field */}
        <div className="flex-1 relative">
          <textarea
            value={message}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            className="w-full px-4 py-3 bg-surface-100 rounded-2xl resize-none max-h-32 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all"
            rows={1}
            style={{
              minHeight: '48px',
              maxHeight: '120px',
              height: 'auto'
            }}
          />
        </div>

        {/* Voice/Send Button */}
        {message.trim() ? (
          <motion.button
            onClick={handleSend}
            className="p-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-full hover:shadow-lg transition-all flex-shrink-0"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ApperIcon name="Send" size={20} />
          </motion.button>
        ) : (
          <motion.button
            onClick={() => setIsRecording(!isRecording)}
            className={`p-3 rounded-full transition-all flex-shrink-0 ${
              isRecording
                ? 'bg-red-500 text-white animate-pulse-gentle'
                : 'bg-surface-100 text-gray-600 hover:bg-surface-200'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ApperIcon name="Mic" size={20} />
          </motion.button>
        )}
      </div>

      {/* Voice Recording Indicator */}
      {isRecording && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-3 flex items-center justify-center space-x-3 p-3 bg-red-50 rounded-xl"
        >
          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          <span className="text-red-600 font-medium">Recording voice message...</span>
          <button
            onClick={() => setIsRecording(false)}
            className="text-red-600 hover:text-red-700"
          >
            <ApperIcon name="X" size={16} />
          </button>
        </motion.div>
      )}

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
};

export default MessageInput;