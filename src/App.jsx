import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Layout from '@/components/organisms/Layout';
import ChatsPage from '@/components/pages/ChatsPage';
import ContactsPage from '@/components/pages/ContactsPage';
import SettingsPage from '@/components/pages/SettingsPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-surface-100 to-surface-200">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<ChatsPage />} />
            <Route path="chats" element={<ChatsPage />} />
            <Route path="chats/:chatId" element={<ChatsPage />} />
            <Route path="contacts" element={<ContactsPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>
        </Routes>
        
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          toastStyle={{
            fontSize: '14px',
            fontFamily: 'Inter, sans-serif'
          }}
          style={{ zIndex: 9999 }}
        />
      </div>
    </Router>
  );
}

export default App;