import React from 'react';
import ApperIcon from '@/components/ApperIcon';
import ToggleSwitch from '@/components/atoms/ToggleSwitch';
import SelectField from '@/components/atoms/SelectField';
import Button from '@/components/atoms/Button';

const SettingsSection = ({ title, icon, items }) => {
  const renderItem = (item) => {
    switch (item.type) {
      case 'profile':
        return (
          <div className="flex items-center space-x-4 p-4 bg-surface-50 rounded-xl">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
              {item.data.name.charAt(0)}
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">{item.data.name}</h3>
              <p className="text-gray-600 text-sm">{item.data.status}</p>
            </div>
            <button className="p-2 hover:bg-surface-200 rounded-lg transition-colors">
              <ApperIcon name="Edit" size={18} className="text-gray-600" />
            </button>
          </div>
        );
      
      case 'toggle':
        return (
          <div className="flex items-center justify-between py-3">
            <div className="flex-1">
              <h4 className="font-medium text-gray-900">{item.label}</h4>
              {item.description && (
                <p className="text-sm text-gray-600 mt-1">{item.description}</p>
              )}
            </div>
            <ToggleSwitch
              checked={item.value}
              onChange={item.onChange}
            />
          </div>
        );
      
      case 'select':
        return (
          <div className="py-3">
            <label className="block font-medium text-gray-900 mb-2">
              {item.label}
            </label>
            {item.description && (
              <p className="text-sm text-gray-600 mb-3">{item.description}</p>
            )}
            <SelectField
              value={item.value}
              onChange={item.onChange}
              options={item.options}
            />
          </div>
        );
      
      case 'button':
        return (
          <div className="py-3">
            <Button
              variant="outline"
              onClick={item.action}
              className="w-full"
            >
              {item.label}
            </Button>
            {item.description && (
              <p className="text-sm text-gray-600 mt-2">{item.description}</p>
            )}
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-surface-200 overflow-hidden">
      {/* Section Header */}
      <div className="px-4 py-3 bg-gradient-to-r from-surface-50 to-surface-100 border-b border-surface-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
            <ApperIcon name={icon} size={18} className="text-white" />
          </div>
          <h3 className="font-display font-semibold text-gray-900">{title}</h3>
        </div>
      </div>

      {/* Section Items */}
      <div className="px-4 py-2">
        {items.map((item, index) => (
          <div key={index} className={index < items.length - 1 ? 'border-b border-surface-100' : ''}>
            {renderItem(item)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SettingsSection;