import React from 'react';
import SettingsSection from '@/components/molecules/SettingsSection';
import ApperIcon from '@/components/ApperIcon';

const SettingsPanel = ({ settings, onSettingChange }) => {
  const sections = [
    {
      title: 'Profile',
      icon: 'User',
      items: [
        {
          type: 'profile',
          data: {
            name: 'John Doe',
            status: 'Available',
            avatar: null
          }
        }
      ]
    },
    {
      title: 'Notifications',
      icon: 'Bell',
      items: [
        {
          type: 'toggle',
          key: 'messageAlerts',
          label: 'Message Alerts',
          description: 'Receive notifications for new messages',
          value: settings.notifications.messageAlerts,
          onChange: (value) => onSettingChange('notifications', 'messageAlerts', value)
        },
        {
          type: 'toggle',
          key: 'soundEnabled',
          label: 'Sound',
          description: 'Play sound for notifications',
          value: settings.notifications.soundEnabled,
          onChange: (value) => onSettingChange('notifications', 'soundEnabled', value)
        },
        {
          type: 'toggle',
          key: 'vibrationEnabled',
          label: 'Vibration',
          description: 'Vibrate on message notifications',
          value: settings.notifications.vibrationEnabled,
          onChange: (value) => onSettingChange('notifications', 'vibrationEnabled', value)
        },
        {
          type: 'toggle',
          key: 'showPreviews',
          label: 'Show Previews',
          description: 'Display message content in notifications',
          value: settings.notifications.showPreviews,
          onChange: (value) => onSettingChange('notifications', 'showPreviews', value)
        }
      ]
    },
    {
      title: 'Privacy & Security',
      icon: 'Shield',
      items: [
        {
          type: 'toggle',
          key: 'readReceipts',
          label: 'Read Receipts',
          description: 'Show when you\'ve read messages',
          value: settings.privacy.readReceipts,
          onChange: (value) => onSettingChange('privacy', 'readReceipts', value)
        },
        {
          type: 'toggle',
          key: 'lastSeen',
          label: 'Last Seen',
          description: 'Show when you were last online',
          value: settings.privacy.lastSeen,
          onChange: (value) => onSettingChange('privacy', 'lastSeen', value)
        },
        {
          type: 'select',
          key: 'profilePhoto',
          label: 'Profile Photo',
          description: 'Who can see your profile photo',
          value: settings.privacy.profilePhoto,
          options: [
            { value: 'everyone', label: 'Everyone' },
            { value: 'contacts', label: 'My Contacts' },
            { value: 'nobody', label: 'Nobody' }
          ],
          onChange: (value) => onSettingChange('privacy', 'profilePhoto', value)
        }
      ]
    },
    {
      title: 'Appearance',
      icon: 'Palette',
      items: [
        {
          type: 'select',
          key: 'theme',
          label: 'Theme',
          description: 'Choose your preferred theme',
          value: settings.appearance.theme,
          options: [
            { value: 'light', label: 'Light' },
            { value: 'dark', label: 'Dark' },
            { value: 'auto', label: 'System Default' }
          ],
          onChange: (value) => onSettingChange('appearance', 'theme', value)
        },
        {
          type: 'select',
          key: 'fontSize',
          label: 'Font Size',
          description: 'Adjust text size for readability',
          value: settings.appearance.fontSize,
          options: [
            { value: 'small', label: 'Small' },
            { value: 'medium', label: 'Medium' },
            { value: 'large', label: 'Large' }
          ],
          onChange: (value) => onSettingChange('appearance', 'fontSize', value)
        }
      ]
    },
    {
      title: 'Storage & Data',
      icon: 'HardDrive',
      items: [
        {
          type: 'select',
          key: 'autoDownload',
          label: 'Auto-download Media',
          description: 'Automatically download photos and videos',
          value: settings.storage.autoDownload,
          options: [
            { value: 'never', label: 'Never' },
            { value: 'wifi', label: 'Wi-Fi Only' },
            { value: 'always', label: 'Wi-Fi + Cellular' }
          ],
          onChange: (value) => onSettingChange('storage', 'autoDownload', value)
        },
        {
          type: 'button',
          label: 'Clear Cache',
          description: 'Free up storage space',
          action: () => console.log('Clear cache')
        }
      ]
    }
  ];

  return (
<div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-3 border-b border-surface-200">
        <h2 className="text-xl font-display font-bold text-gray-900">Settings</h2>
        <p className="text-gray-600 text-sm mt-1">Customize your PulseChat experience</p>
      </div>

{/* Settings Sections */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="space-y-4 p-3">
          {sections.map((section) => (
            <SettingsSection
              key={section.title}
              title={section.title}
              icon={section.icon}
              items={section.items}
            />
          ))}
        </div>
      </div>
{/* Footer */}
      <div className="p-3 border-t border-surface-200 text-center">
        <p className="text-sm text-gray-500">PulseChat v2.1.0</p>
        <p className="text-xs text-gray-400 mt-1">Enhanced Messaging Experience</p>
      </div>
    </div>
  );
};

export default SettingsPanel;