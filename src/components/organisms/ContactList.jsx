import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import ContactItem from "@/components/molecules/ContactItem";
import SearchBar from "@/components/molecules/SearchBar";

function ContactList({ contacts }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [showKebabMenu, setShowKebabMenu] = useState(false)
  const kebabMenuRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (kebabMenuRef.current && !kebabMenuRef.current.contains(event.target)) {
        setShowKebabMenu(false)
      }
    }

    if (showKebabMenu) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
}, [showKebabMenu])

  // Filter contacts based on search term
  const filteredContacts = contacts?.filter((contact) =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.status.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

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
<div className="relative" ref={kebabMenuRef}>
              <button 
                onClick={() => setShowKebabMenu(!showKebabMenu)}
                className="p-2 hover:bg-surface-100 rounded-xl transition-colors group"
              >
                <ApperIcon name="MoreVertical" size={20} className="text-gray-600 group-hover:text-primary-600" />
              </button>
              
              <AnimatePresence>
                {showKebabMenu && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 w-56 bg-white rounded-lg shadow-lg border border-surface-200 py-2 z-50"
                  >
                    <button 
                      onClick={() => setShowKebabMenu(false)}
                      className="w-full px-4 py-3 text-left hover:bg-surface-50 transition-colors flex items-center space-x-3"
                    >
                      <ApperIcon name="Users" size={18} className="text-gray-600" />
                      <span className="text-gray-900">New group</span>
                    </button>
                    <button 
                      onClick={() => setShowKebabMenu(false)}
                      className="w-full px-4 py-3 text-left hover:bg-surface-50 transition-colors flex items-center space-x-3"
                    >
                      <ApperIcon name="Radio" size={18} className="text-gray-600" />
                      <span className="text-gray-900">New broadcast</span>
                    </button>
                    <button 
                      onClick={() => setShowKebabMenu(false)}
                      className="w-full px-4 py-3 text-left hover:bg-surface-50 transition-colors flex items-center space-x-3"
                    >
                      <ApperIcon name="Laptop" size={18} className="text-gray-600" />
                      <span className="text-gray-900">Linked devices</span>
                    </button>
                    <button 
                      onClick={() => setShowKebabMenu(false)}
                      className="w-full px-4 py-3 text-left hover:bg-surface-50 transition-colors flex items-center space-x-3"
                    >
                      <ApperIcon name="Star" size={18} className="text-gray-600" />
                      <span className="text-gray-900">Starred messages</span>
                    </button>
                    <div className="h-px bg-surface-200 my-2"></div>
                    <button 
                      onClick={() => setShowKebabMenu(false)}
                      className="w-full px-4 py-3 text-left hover:bg-surface-50 transition-colors flex items-center space-x-3"
                    >
                      <ApperIcon name="Settings" size={18} className="text-gray-600" />
                      <span className="text-gray-900">Settings</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
<SearchBar 
          value={searchTerm}
          onChange={setSearchTerm}
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
            {contacts?.filter(c => c.isOnline).length || 0} online
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
              {searchTerm ? 'Try a different search term' : 'Add some contacts to get started'}
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