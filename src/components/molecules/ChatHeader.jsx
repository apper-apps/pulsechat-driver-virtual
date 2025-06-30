import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

function ChatHeader({ chat, onBack, isTyping }) {
  const [showKebabMenu, setShowKebabMenu] = useState(false)
  const [showMoreSubmenu, setShowMoreSubmenu] = useState(false)
  const kebabMenuRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (kebabMenuRef.current && !kebabMenuRef.current.contains(event.target)) {
        setShowKebabMenu(false)
        setShowMoreSubmenu(false)
      }
    }

    if (showKebabMenu) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
}, [showKebabMenu])

  const otherParticipant = chat?.participants?.find(p => p.id !== 'current-user');

return (
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
        <div className="relative" ref={kebabMenuRef}>
          <motion.button
            onClick={() => setShowKebabMenu(!showKebabMenu)}
            className="p-2 hover:bg-surface-100 rounded-lg transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ApperIcon name="MoreVertical" size={20} className="text-gray-600" />
          </motion.button>
          
          <AnimatePresence>
            {showKebabMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-lg border border-surface-200 py-2 z-50"
              >
                <button 
                  onClick={() => setShowKebabMenu(false)}
                  className="w-full px-4 py-3 text-left hover:bg-surface-50 transition-colors flex items-center space-x-3"
                >
                  <ApperIcon name="User" size={18} className="text-gray-600" />
                  <span className="text-gray-900">Contact info</span>
                </button>
                <button 
                  onClick={() => setShowKebabMenu(false)}
                  className="w-full px-4 py-3 text-left hover:bg-surface-50 transition-colors flex items-center space-x-3"
                >
                  <ApperIcon name="Image" size={18} className="text-gray-600" />
                  <span className="text-gray-900">Media, links and docs</span>
                </button>
                <button 
                  onClick={() => setShowKebabMenu(false)}
                  className="w-full px-4 py-3 text-left hover:bg-surface-50 transition-colors flex items-center space-x-3"
                >
                  <ApperIcon name="Search" size={18} className="text-gray-600" />
                  <span className="text-gray-900">Search</span>
                </button>
                <button 
                  onClick={() => setShowKebabMenu(false)}
                  className="w-full px-4 py-3 text-left hover:bg-surface-50 transition-colors flex items-center space-x-3"
                >
                  <ApperIcon name="BellOff" size={18} className="text-gray-600" />
                  <span className="text-gray-900">Mute notifications</span>
                </button>
                <button 
                  onClick={() => setShowKebabMenu(false)}
                  className="w-full px-4 py-3 text-left hover:bg-surface-50 transition-colors flex items-center space-x-3"
                >
                  <ApperIcon name="Timer" size={18} className="text-gray-600" />
                  <span className="text-gray-900">Disappearing messages</span>
                </button>
                <button 
                  onClick={() => setShowKebabMenu(false)}
                  className="w-full px-4 py-3 text-left hover:bg-surface-50 transition-colors flex items-center space-x-3"
                >
                  <ApperIcon name="Palette" size={18} className="text-gray-600" />
                  <span className="text-gray-900">Wallpaper</span>
                </button>
                <div className="h-px bg-surface-200 my-2"></div>
                <div className="relative">
                  <button 
                    onClick={() => setShowMoreSubmenu(!showMoreSubmenu)}
                    className="w-full px-4 py-3 text-left hover:bg-surface-50 transition-colors flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-3">
                      <ApperIcon name="MoreHorizontal" size={18} className="text-gray-600" />
                      <span className="text-gray-900">More</span>
                    </div>
                    <ApperIcon name="ChevronRight" size={16} className="text-gray-400" />
                  </button>
                  
                  <AnimatePresence>
                    {showMoreSubmenu && (
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.15 }}
                        className="absolute left-full top-0 ml-2 w-56 bg-white rounded-lg shadow-lg border border-surface-200 py-2"
                      >
                        <button 
                          onClick={() => {
                            setShowKebabMenu(false);
                            setShowMoreSubmenu(false);
                          }}
                          className="w-full px-4 py-3 text-left hover:bg-surface-50 transition-colors flex items-center space-x-3"
                        >
                          <ApperIcon name="Trash2" size={18} className="text-red-600" />
                          <span className="text-red-600">Clear chat</span>
                        </button>
                        <button 
                          onClick={() => {
                            setShowKebabMenu(false);
                            setShowMoreSubmenu(false);
                          }}
                          className="w-full px-4 py-3 text-left hover:bg-surface-50 transition-colors flex items-center space-x-3"
                        >
                          <ApperIcon name="Download" size={18} className="text-gray-600" />
                          <span className="text-gray-900">Export chat</span>
                        </button>
                        <button 
                          onClick={() => {
                            setShowKebabMenu(false);
                            setShowMoreSubmenu(false);
                          }}
                          className="w-full px-4 py-3 text-left hover:bg-surface-50 transition-colors flex items-center space-x-3"
                        >
                          <ApperIcon name="UserPlus" size={18} className="text-gray-600" />
                          <span className="text-gray-900">Add to contacts</span>
                        </button>
                        <div className="h-px bg-surface-200 my-2"></div>
                        <button 
                          onClick={() => {
                            setShowKebabMenu(false);
                            setShowMoreSubmenu(false);
                          }}
                          className="w-full px-4 py-3 text-left hover:bg-surface-50 transition-colors flex items-center space-x-3"
                        >
                          <ApperIcon name="UserX" size={18} className="text-red-600" />
                          <span className="text-red-600">Block</span>
                        </button>
                        <button 
                          onClick={() => {
                            setShowKebabMenu(false);
                            setShowMoreSubmenu(false);
                          }}
                          className="w-full px-4 py-3 text-left hover:bg-surface-50 transition-colors flex items-center space-x-3"
                        >
                          <ApperIcon name="Flag" size={18} className="text-red-600" />
                          <span className="text-red-600">Report</span>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;