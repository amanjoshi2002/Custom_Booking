import React, { useEffect, useState } from 'react';
import { ToastProps } from '../interface/toast';

const Toast: React.FC<ToastProps> = ({ message, type, duration = 3000, onClose }) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (type !== 'loading') {
      const timer = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress <= 0) {
            clearInterval(timer);
            onClose();
            return 0;
          }
          return prevProgress - (100 / (duration / 100));
        });
      }, 100);

      return () => clearInterval(timer);
    }
  }, [duration, onClose, type]);

  const bgColor = 
    type === 'success' ? 'bg-green-500' : 
    type === 'error' ? 'bg-red-500' : 
    'bg-blue-500';

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
      <div className={`${bgColor} text-white px-4 py-2 rounded-md shadow-lg max-w-md w-full`}>
        <div className="flex justify-between items-center">
          <span>{message}</span>
          {type !== 'loading' && (
            <button onClick={onClose} className="ml-4 text-white hover:text-gray-200">
              ✕
            </button>
          )}
        </div>
        {type !== 'loading' && (
          <div className="w-full bg-white bg-opacity-30 h-1 mt-2">
            <div 
              className="bg-white h-1 transition-all duration-100 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Toast;