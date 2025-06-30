import React, { useState } from 'react';
import SearchBar from '@/components/molecules/SearchBar';
import ChatItem from '@/components/molecules/ChatItem';
import ApperIcon from '@/components/ApperIcon';
import { motion } from 'framer-motion';

const ChatList = ({ chats, selectedChat, onChatSelect }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all'); // all, unread, archived

  const filteredChats = chats.filter(chat => {
    const matchesSearch = chat.participants.some(p => 
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
    ) || (chat.lastMessage?.content || '').toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter = filter === 'all' || 
      (filter === 'unread' && chat.unreadCount > 0) ||
      (filter === 'archived' && chat.isArchived);

    return matchesSearch && matchesFilter;
  });

  const filterOptions = [
    { value: 'all', label: 'All', count: chats.length },
    { value: 'unread', label: 'Unread', count: chats.filter(c => c.unreadCount > 0).length },
    { value: 'archived', label: 'Archived', count: chats.filter(c => c.isArchived).length }
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-surface-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-display font-bold text-gray-900">Messages</h2>
          <button className="p-2 hover:bg-surface-100 rounded-xl transition-colors group">
            <ApperIcon name="Plus" size={20} className="text-gray-600 group-hover:text-primary-600" />
          </button>
        </div>
        
        <SearchBar 
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search conversations..."
        />
      </div>

      {/* Filter Tabs */}
      <div className="px-4 py-3 border-b border-surface-200">
        <div className="flex space-x-1">
          {filterOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setFilter(option.value)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                filter === option.value
                  ? 'bg-primary-500 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-surface-100'
              }`}
            >
              {option.label}
              {option.count > 0 && (
                <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                  filter === option.value
                    ? 'bg-white bg-opacity-20 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {option.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {filteredChats.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center px-4">
            <div className="w-16 h-16 bg-surface-100 rounded-full flex items-center justify-center mb-4">
              <ApperIcon name="MessageCircle" size={24} className="text-gray-400" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">No conversations found</h3>
            <p className="text-gray-600 text-sm">
              {searchQuery ? 'Try a different search term' : 'Start a new conversation to get started'}
            </p>
          </div>
        ) : (
          <div className="space-y-1 p-2">
            {filteredChats.map((chat, index) => (
              <motion.div
                key={chat.Id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <ChatItem
                  chat={chat}
                  isSelected={selectedChat?.Id === chat.Id}
                  onClick={() => onChatSelect(chat)}
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatList;