import React from 'react';
import { motion } from 'framer-motion';

const EmojiPicker = ({ onEmojiSelect, onClose }) => {
  const commonEmojis = [
    '👍', '❤️', '😂', '😮', '😢', '😡',
    '🎉', '🔥', '👏', '💯', '⚡', '✨'
  ];

  const handleEmojiClick = (emoji) => {
    onEmojiSelect(emoji);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="bg-white rounded-2xl shadow-2xl border border-surface-200 p-3 min-w-[240px]"
    >
      <div className="grid grid-cols-6 gap-2">
        {commonEmojis.map((emoji) => (
          <button
            key={emoji}
            onClick={() => handleEmojiClick(emoji)}
            className="w-8 h-8 flex items-center justify-center hover:bg-surface-100 rounded-lg transition-colors text-lg"
          >
            {emoji}
          </button>
        ))}
      </div>
      
      <div className="mt-3 pt-3 border-t border-surface-200 flex justify-end">
        <button
          onClick={onClose}
          className="text-sm text-gray-500 hover:text-gray-700 px-2 py-1"
        >
          Close
        </button>
      </div>
    </motion.div>
  );
};

export default EmojiPicker;