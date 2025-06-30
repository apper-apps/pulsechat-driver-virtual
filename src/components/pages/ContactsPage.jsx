import React, { useState, useEffect } from 'react';
import ContactList from '@/components/organisms/ContactList';
import { contactService } from '@/services/api/contactService';
import Loading from '@/components/ui/Loading';
import Error from '@/components/ui/Error';
import Empty from '@/components/ui/Empty';

const ContactsPage = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    try {
      setLoading(true);
      setError('');
      const data = await contactService.getAll();
      setContacts(data);
    } catch (err) {
      setError('Failed to load contacts. Please check your connection.');
      console.error('Error loading contacts:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadContacts} />;
  if (contacts.length === 0) return <Empty type="contacts" />;

  return (
    <div className="h-full bg-white">
      <ContactList contacts={contacts} />
    </div>
  );
};

export default ContactsPage;