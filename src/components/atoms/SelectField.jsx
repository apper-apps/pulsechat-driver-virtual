import React from 'react';
import ApperIcon from '@/components/ApperIcon';

const SelectField = ({ value, onChange, options, placeholder = "Select option..." }) => {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 bg-surface-100 border border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white focus:border-primary-200 transition-all appearance-none pr-10"
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <ApperIcon name="ChevronDown" size={18} className="text-gray-400" />
      </div>
    </div>
  );
};

export default SelectField;