import chatsData from '@/services/mockData/chats.json';

class ChatService {
  constructor() {
    this.chats = [...chatsData];
  }

  async getAll() {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Sort by last message timestamp
    const sortedChats = [...this.chats].sort((a, b) => {
      const aTime = a.lastMessage ? new Date(a.lastMessage.timestamp).getTime() : 0;
      const bTime = b.lastMessage ? new Date(b.lastMessage.timestamp).getTime() : 0;
      return bTime - aTime;
    });
    
    return sortedChats;
  }

  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const chat = this.chats.find(c => c.Id === parseInt(id));
    if (!chat) {
      throw new Error('Chat not found');
    }
    
    return { ...chat };
  }

  async create(chatData) {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const newChat = {
      Id: Math.max(...this.chats.map(c => c.Id)) + 1,
      participants: chatData.participants,
      lastMessage: null,
      unreadCount: 0,
      isPinned: false,
      isArchived: false,
      theme: {
        background: '#ffffff',
        accent: '#00a884'
      },
      createdAt: new Date().toISOString()
    };
    
    this.chats.push(newChat);
    return { ...newChat };
  }

  async update(id, updateData) {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const index = this.chats.findIndex(c => c.Id === parseInt(id));
    if (index === -1) {
      throw new Error('Chat not found');
    }
    
    this.chats[index] = { ...this.chats[index], ...updateData };
    return { ...this.chats[index] };
  }

  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const index = this.chats.findIndex(c => c.Id === parseInt(id));
    if (index === -1) {
      throw new Error('Chat not found');
    }
    
    this.chats.splice(index, 1);
    return { success: true };
  }

  async sendMessage(chatId, messageData) {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const chatIndex = this.chats.findIndex(c => c.Id === parseInt(chatId));
    if (chatIndex === -1) {
      throw new Error('Chat not found');
    }
    
    // Update chat's last message
    this.chats[chatIndex].lastMessage = messageData;
    this.chats[chatIndex].unreadCount = 0; // Reset for current user
    
    return { success: true };
  }

  async markAsRead(chatId) {
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const chatIndex = this.chats.findIndex(c => c.Id === parseInt(chatId));
    if (chatIndex !== -1) {
      this.chats[chatIndex].unreadCount = 0;
    }
    
    return { success: true };
  }

  async togglePin(chatId) {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const chatIndex = this.chats.findIndex(c => c.Id === parseInt(chatId));
    if (chatIndex === -1) {
      throw new Error('Chat not found');
    }
    
    this.chats[chatIndex].isPinned = !this.chats[chatIndex].isPinned;
    return { ...this.chats[chatIndex] };
  }

  async archive(chatId) {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const chatIndex = this.chats.findIndex(c => c.Id === parseInt(chatId));
    if (chatIndex === -1) {
      throw new Error('Chat not found');
    }
    
    this.chats[chatIndex].isArchived = true;
    return { ...this.chats[chatIndex] };
  }
}

export const chatService = new ChatService();