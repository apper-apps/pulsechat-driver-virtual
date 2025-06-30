import React, { useState } from 'react';
import SearchBar from '@/components/molecules/SearchBar';
import ContactItem from '@/components/molecules/ContactItem';
import ApperIcon from '@/components/ApperIcon';
import { motion } from 'framer-motion';

const ContactList = ({ contacts }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Group contacts by first letter
  const groupedContacts = filteredContacts.reduce((groups, contact) => {
    const firstLetter = contact.name.charAt(0).toUpperCase();
    if (!groups[firstLetter]) {
      groups[firstLetter] = [];
    }
    groups[firstLetter].push(contact);
    return groups;
  }, {});

  const sortedGroups = Object.keys(groupedContacts).sort();

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-surface-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-display font-bold text-gray-900">Contacts</h2>
          <div className="flex items-center space-x-2">
            <button className="p-2 hover:bg-surface-100 rounded-xl transition-colors group">
              <ApperIcon name="UserPlus" size={20} className="text-gray-600 group-hover:text-primary-600" />
            </button>
            <button className="p-2 hover:bg-surface-100 rounded-xl transition-colors group">
              <ApperIcon name="MoreVertical" size={20} className="text-gray-600 group-hover:text-primary-600" />
            </button>
          </div>
        </div>
        
        <SearchBar 
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search contacts..."
        />
      </div>

      {/* Stats */}
      <div className="px-4 py-3 border-b border-surface-200">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">
            {filteredContacts.length} contact{filteredContacts.length !== 1 ? 's' : ''}
          </span>
          <span className="text-accent-500 font-medium">
            {contacts.filter(c => c.isOnline).length} online
          </span>
        </div>
      </div>

      {/* Contact List */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {filteredContacts.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center px-4">
            <div className="w-16 h-16 bg-surface-100 rounded-full flex items-center justify-center mb-4">
              <ApperIcon name="Users" size={24} className="text-gray-400" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">No contacts found</h3>
            <p className="text-gray-600 text-sm">
              {searchQuery ? 'Try a different search term' : 'Add some contacts to get started'}
            </p>
          </div>
        ) : (
          <div className="py-2">
            {sortedGroups.map((letter) => (
              <div key={letter} className="mb-2">
                <div className="px-4 py-2 bg-surface-100 border-b border-surface-200">
                  <h3 className="font-semibold text-gray-700 text-sm">{letter}</h3>
                </div>
                <div className="space-y-1">
                  {groupedContacts[letter].map((contact, index) => (
                    <motion.div
                      key={contact.Id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <ContactItem contact={contact} />
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactList;