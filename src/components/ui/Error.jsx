import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const Error = ({ message, onRetry }) => {
  return (
    <div className="flex items-center justify-center h-full bg-gradient-to-br from-red-50 to-red-100 p-8">
      <motion.div
        className="text-center max-w-md"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mb-6 mx-auto"
          animate={{ 
            rotate: [0, -10, 10, -10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 0.6,
            times: [0, 0.2, 0.4, 0.6, 1]
          }}
        >
          <ApperIcon name="AlertTriangle" size={32} className="text-white" />
        </motion.div>
        
        <h2 className="text-2xl font-display font-bold text-gray-900 mb-3">
          Oops! Something went wrong
        </h2>
        
        <p className="text-gray-600 mb-6 leading-relaxed">
          {message || 'We encountered an unexpected error. Please try again or contact support if the problem persists.'}
        </p>
        
        <div className="space-y-3">
          <Button
            onClick={onRetry}
            variant="primary"
            icon="RefreshCw"
            className="w-full"
          >
            Try Again
          </Button>
          
          <Button
            onClick={() => window.location.reload()}
            variant="outline"
            icon="RotateCcw"
            className="w-full"
          >
            Refresh Page
          </Button>
        </div>
        
        <div className="mt-8 pt-6 border-t border-red-200">
          <p className="text-sm text-gray-500">
            Error persisting? Contact our support team for assistance.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Error;