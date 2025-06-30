import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ChatList from '@/components/organisms/ChatList';
import ChatView from '@/components/organisms/ChatView';
import ChatEmpty from '@/components/molecules/ChatEmpty';
import { chatService } from '@/services/api/chatService';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';

const ChatsPage = () => {
  const { chatId } = useParams();
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedChat, setSelectedChat] = useState(null);

  useEffect(() => {
    loadChats();
  }, []);

  useEffect(() => {
    if (chatId && chats.length > 0) {
      const chat = chats.find(c => c.Id === parseInt(chatId));
      setSelectedChat(chat || null);
    }
  }, [chatId, chats]);

  const loadChats = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await chatService.getAll();
      setChats(data);
    } catch (err) {
      setError('Failed to load chats. Please check your connection.');
      console.error('Error loading chats:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChatSelect = (chat) => {
    setSelectedChat(chat);
  };

  const handleSendMessage = async (content, type = 'text') => {
    if (!selectedChat || !content.trim()) return;

    try {
      const newMessage = {
        chatId: selectedChat.Id.toString(),
        senderId: 'current-user',
        content: content.trim(),
        type,
        timestamp: new Date().toISOString(),
        status: 'sent',
        reactions: []
      };

      await chatService.sendMessage(selectedChat.Id, newMessage);
      
      // Update the chat's last message
      const updatedChats = chats.map(chat => 
        chat.Id === selectedChat.Id 
          ? { ...chat, lastMessage: newMessage, unreadCount: 0 }
          : chat
      );
      setChats(updatedChats);
      
      // Update selected chat
      const updatedSelectedChat = updatedChats.find(c => c.Id === selectedChat.Id);
      setSelectedChat(updatedSelectedChat);
      
    } catch (err) {
      console.error('Error sending message:', err);
    }
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadChats} />;

  return (
    <div className="flex h-full">
      {/* Chat List - Always visible on mobile, left panel on desktop */}
      <div className={`${selectedChat ? 'hidden md:flex' : 'flex'} md:w-96 w-full flex-col bg-white border-r border-surface-200`}>
        <ChatList 
          chats={chats}
          selectedChat={selectedChat}
          onChatSelect={handleChatSelect}
        />
      </div>

      {/* Chat View - Shows when chat selected on mobile, right panel on desktop */}
      <div className={`${selectedChat ? 'flex' : 'hidden md:flex'} flex-1 flex-col`}>
        {selectedChat ? (
          <ChatView 
            chat={selectedChat}
            onSendMessage={handleSendMessage}
            onBack={() => setSelectedChat(null)}
          />
        ) : (
          <ChatEmpty />
        )}
      </div>
    </div>
  );
};

export default ChatsPage;