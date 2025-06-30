import messagesData from '@/services/mockData/messages.json';

class MessageService {
  constructor() {
    this.messages = [...messagesData];
  }

  async getAll() {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...this.messages];
  }

  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const message = this.messages.find(m => m.Id === parseInt(id));
    if (!message) {
      throw new Error('Message not found');
    }
    
    return { ...message };
  }

  async getByChatId(chatId) {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const chatMessages = this.messages
      .filter(m => m.chatId === chatId.toString())
      .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
    
    return chatMessages.map(m => ({ ...m }));
  }

  async create(messageData) {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const newMessage = {
      Id: Math.max(...this.messages.map(m => m.Id)) + 1,
      chatId: messageData.chatId,
      senderId: messageData.senderId,
      content: messageData.content,
      type: messageData.type || 'text',
      timestamp: new Date().toISOString(),
      status: 'sent',
      reactions: []
    };
    
    this.messages.push(newMessage);
    return { ...newMessage };
  }

  async update(id, updateData) {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const index = this.messages.findIndex(m => m.Id === parseInt(id));
    if (index === -1) {
      throw new Error('Message not found');
    }
    
    this.messages[index] = { ...this.messages[index], ...updateData };
    return { ...this.messages[index] };
  }

  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const index = this.messages.findIndex(m => m.Id === parseInt(id));
    if (index === -1) {
      throw new Error('Message not found');
    }
    
    this.messages.splice(index, 1);
    return { success: true };
  }

  async updateStatus(id, status) {
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const index = this.messages.findIndex(m => m.Id === parseInt(id));
    if (index !== -1) {
      this.messages[index].status = status;
    }
    
    return { success: true };
  }

  async addReaction(messageId, reaction) {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const index = this.messages.findIndex(m => m.Id === parseInt(messageId));
    if (index === -1) {
      throw new Error('Message not found');
    }
    
    const message = this.messages[index];
    const existingReaction = message.reactions.find(
      r => r.emoji === reaction.emoji && r.userId === reaction.userId
    );
    
    if (existingReaction) {
      // Remove existing reaction
      message.reactions = message.reactions.filter(
        r => !(r.emoji === reaction.emoji && r.userId === reaction.userId)
      );
    } else {
      // Add new reaction
      message.reactions.push({
        emoji: reaction.emoji,
        userId: reaction.userId,
        timestamp: new Date().toISOString()
      });
    }
    
    return { ...message };
  }

  async search(query, chatId = null) {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    let results = this.messages.filter(message =>
      message.content.toLowerCase().includes(query.toLowerCase())
    );
    
    if (chatId) {
      results = results.filter(m => m.chatId === chatId.toString());
    }
    
    return results.map(m => ({ ...m }));
  }
}

export const messageService = new MessageService();