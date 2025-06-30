import contactsData from '@/services/mockData/contacts.json';

class ContactService {
  constructor() {
    this.contacts = [...contactsData];
  }

  async getAll() {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Sort contacts alphabetically by name
    const sortedContacts = [...this.contacts].sort((a, b) => 
      a.name.localeCompare(b.name)
    );
    
    return sortedContacts;
  }

  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const contact = this.contacts.find(c => c.Id === parseInt(id));
    if (!contact) {
      throw new Error('Contact not found');
    }
    
    return { ...contact };
  }

  async create(contactData) {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const newContact = {
      Id: Math.max(...this.contacts.map(c => c.Id)) + 1,
      name: contactData.name,
      avatar: contactData.avatar || null,
      status: contactData.status || 'Available',
      lastSeen: new Date().toISOString(),
      isOnline: false
    };
    
    this.contacts.push(newContact);
    return { ...newContact };
  }

  async update(id, updateData) {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const index = this.contacts.findIndex(c => c.Id === parseInt(id));
    if (index === -1) {
      throw new Error('Contact not found');
    }
    
    this.contacts[index] = { ...this.contacts[index], ...updateData };
    return { ...this.contacts[index] };
  }

  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const index = this.contacts.findIndex(c => c.Id === parseInt(id));
    if (index === -1) {
      throw new Error('Contact not found');
    }
    
    this.contacts.splice(index, 1);
    return { success: true };
  }

  async search(query) {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const results = this.contacts.filter(contact =>
      contact.name.toLowerCase().includes(query.toLowerCase()) ||
      contact.status.toLowerCase().includes(query.toLowerCase())
    );
    
    return results.map(c => ({ ...c }));
  }

  async getOnlineContacts() {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const onlineContacts = this.contacts.filter(c => c.isOnline);
    return onlineContacts.map(c => ({ ...c }));
  }

  async updateOnlineStatus(id, isOnline) {
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const index = this.contacts.findIndex(c => c.Id === parseInt(id));
    if (index !== -1) {
      this.contacts[index].isOnline = isOnline;
      if (!isOnline) {
        this.contacts[index].lastSeen = new Date().toISOString();
      }
    }
    
    return { success: true };
  }
}

export const contactService = new ContactService();