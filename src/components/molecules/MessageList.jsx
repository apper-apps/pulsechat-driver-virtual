import React, { useState } from 'react';
import MessageBubble from '@/components/atoms/MessageBubble';
import EmojiPicker from '@/components/molecules/EmojiPicker';
import { motion, AnimatePresence } from 'framer-motion';

const MessageList = ({ messages, onReaction }) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(null);

  const handleReaction = (messageId, emoji) => {
    onReaction(messageId, emoji);
    setShowEmojiPicker(null);
  };

  const groupedMessages = messages.reduce((groups, message, index) => {
    const currentDate = new Date(message.timestamp).toDateString();
    const prevMessage = messages[index - 1];
    const prevDate = prevMessage ? new Date(prevMessage.timestamp).toDateString() : null;
    
    if (currentDate !== prevDate) {
      groups.push({
        type: 'date',
        date: currentDate,
        messages: [message]
      });
    } else {
      groups[groups.length - 1].messages.push(message);
    }
    
    return groups;
  }, []);

  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-4">
      <AnimatePresence>
        {groupedMessages.map((group, groupIndex) => (
          <div key={group.date} className="space-y-2">
            {/* Date separator */}
            <div className="flex justify-center">
              <div className="bg-surface-200 text-gray-600 text-xs px-3 py-1 rounded-full">
                {new Date(group.date).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
            </div>
            
            {/* Messages */}
            {group.messages.map((message, messageIndex) => (
              <motion.div
                key={message.Id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: messageIndex * 0.1 }}
                className="relative"
              >
                <MessageBubble
                  message={message}
                  onReactionClick={() => setShowEmojiPicker(message.Id)}
                />
                
                {/* Emoji Picker */}
                {showEmojiPicker === message.Id && (
                  <div className="absolute top-full left-0 z-10 mt-2">
                    <EmojiPicker
                      onEmojiSelect={(emoji) => handleReaction(message.Id, emoji)}
                      onClose={() => setShowEmojiPicker(null)}
                    />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default MessageList;