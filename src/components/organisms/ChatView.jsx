import React, { useState, useEffect, useRef } from 'react';
import ChatHeader from '@/components/molecules/ChatHeader';
import MessageList from '@/components/molecules/MessageList';
import MessageInput from '@/components/molecules/MessageInput';
import { messageService } from '@/services/api/messageService';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';

const ChatView = ({ chat, onSendMessage, onBack }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (chat) {
      loadMessages();
    }
  }, [chat]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const loadMessages = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await messageService.getByChatId(chat.Id);
      setMessages(data);
    } catch (err) {
      setError('Failed to load messages. Please try again.');
      console.error('Error loading messages:', err);
    } finally {
      setLoading(false);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (content, type = 'text') => {
    const newMessage = {
      Id: Date.now(),
      chatId: chat.Id.toString(),
      senderId: 'current-user',
      content,
      type,
      timestamp: new Date().toISOString(),
      status: 'sending',
      reactions: []
    };

    // Optimistically add message
    setMessages(prev => [...prev, newMessage]);

    try {
      await onSendMessage(content, type);
      
      // Update message status to sent
      setMessages(prev => prev.map(msg => 
        msg.Id === newMessage.Id 
          ? { ...msg, status: 'sent' }
          : msg
      ));
      
      // Simulate delivery and read status updates
      setTimeout(() => {
        setMessages(prev => prev.map(msg => 
          msg.Id === newMessage.Id 
            ? { ...msg, status: 'delivered' }
            : msg
        ));
      }, 1000);
      
      setTimeout(() => {
        setMessages(prev => prev.map(msg => 
          msg.Id === newMessage.Id 
            ? { ...msg, status: 'read' }
            : msg
        ));
      }, 2000);
      
    } catch (err) {
      // Update message status to failed
      setMessages(prev => prev.map(msg => 
        msg.Id === newMessage.Id 
          ? { ...msg, status: 'failed' }
          : msg
      ));
    }
  };

  const handleReaction = async (messageId, emoji) => {
    try {
      setMessages(prev => prev.map(msg => {
        if (msg.Id === messageId) {
          const existingReaction = msg.reactions.find(r => r.emoji === emoji && r.userId === 'current-user');
          if (existingReaction) {
            // Remove reaction
            return {
              ...msg,
              reactions: msg.reactions.filter(r => !(r.emoji === emoji && r.userId === 'current-user'))
            };
          } else {
            // Add reaction
            return {
              ...msg,
              reactions: [...msg.reactions, { emoji, userId: 'current-user', timestamp: new Date().toISOString() }]
            };
          }
        }
        return msg;
      }));
    } catch (err) {
      console.error('Error updating reaction:', err);
    }
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadMessages} />;

  return (
    <div className="flex flex-col h-full bg-surface-50">
      <ChatHeader 
        chat={chat}
        onBack={onBack}
        isTyping={isTyping}
      />
      
      <div className="flex-1 overflow-hidden">
        <MessageList 
          messages={messages}
          onReaction={handleReaction}
        />
        <div ref={messagesEndRef} />
      </div>
      
      <MessageInput 
        onSendMessage={handleSendMessage}
        onTypingStart={() => setIsTyping(true)}
        onTypingStop={() => setIsTyping(false)}
      />
    </div>
  );
};

export default ChatView;