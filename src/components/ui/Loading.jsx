import React from 'react';
import { motion } from 'framer-motion';

const Loading = () => {
  return (
    <div className="flex h-full">
      {/* Sidebar Skeleton */}
      <div className="w-80 bg-white border-r border-surface-200 p-4 space-y-4">
        {/* Header Skeleton */}
        <div className="h-16 bg-gradient-to-r from-surface-200 to-surface-300 rounded-xl animate-pulse"></div>
        
        {/* Search Skeleton */}
        <div className="h-12 bg-surface-200 rounded-xl animate-pulse"></div>
        
        {/* Chat Items Skeleton */}
        <div className="space-y-3">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="flex items-center space-x-3 p-3"
              initial={{ opacity: 0.3 }}
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.1
              }}
            >
              <div className="w-12 h-12 bg-surface-300 rounded-full"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-surface-300 rounded w-3/4"></div>
                <div className="h-3 bg-surface-200 rounded w-1/2"></div>
              </div>
              <div className="w-6 h-6 bg-surface-200 rounded-full"></div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Main Content Skeleton */}
      <div className="flex-1 flex flex-col">
        {/* Header Skeleton */}
        <div className="h-16 bg-white border-b border-surface-200 flex items-center justify-between px-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-surface-300 rounded-full animate-pulse"></div>
            <div className="space-y-1">
              <div className="h-4 bg-surface-300 rounded w-24 animate-pulse"></div>
              <div className="h-3 bg-surface-200 rounded w-16 animate-pulse"></div>
            </div>
          </div>
          <div className="flex space-x-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="w-8 h-8 bg-surface-200 rounded-lg animate-pulse"></div>
            ))}
          </div>
        </div>

        {/* Messages Skeleton */}
        <div className="flex-1 p-4 space-y-4 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className={`flex ${i % 2 === 0 ? 'justify-start' : 'justify-end'}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className={`max-w-sm p-4 rounded-2xl ${
                i % 2 === 0 ? 'bg-surface-200' : 'bg-primary-200'
              } animate-pulse`}>
                <div className="space-y-2">
                  <div className="h-4 bg-surface-300 rounded w-full"></div>
                  <div className="h-4 bg-surface-300 rounded w-3/4"></div>
                  <div className="h-3 bg-surface-400 rounded w-16 mt-2"></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Input Skeleton */}
        <div className="h-20 bg-white border-t border-surface-200 flex items-center px-4 space-x-3">
          <div className="w-10 h-10 bg-surface-200 rounded-full animate-pulse"></div>
          <div className="flex-1 h-12 bg-surface-200 rounded-2xl animate-pulse"></div>
          <div className="w-10 h-10 bg-surface-200 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;