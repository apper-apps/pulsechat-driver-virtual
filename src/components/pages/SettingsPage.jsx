import React, { useState } from 'react';
import SettingsPanel from '@/components/organisms/SettingsPanel';

const SettingsPage = () => {
  const [settings, setSettings] = useState({
    notifications: {
      messageAlerts: true,
      soundEnabled: true,
      vibrationEnabled: true,
      showPreviews: true
    },
    privacy: {
      readReceipts: true,
      lastSeen: true,
      profilePhoto: 'everyone',
      status: 'contacts'
    },
    appearance: {
      theme: 'light',
      fontSize: 'medium',
      chatWallpaper: 'default'
    },
    storage: {
      autoDownload: 'wifi',
      deleteMedia: '1month'
    }
  });

  const handleSettingChange = (category, setting, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: value
      }
    }));
  };

  return (
    <div className="h-full bg-white">
      <SettingsPanel 
        settings={settings}
        onSettingChange={handleSettingChange}
      />
    </div>
  );
};

export default SettingsPage;