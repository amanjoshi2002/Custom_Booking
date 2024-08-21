import React from 'react';

interface LoadingOverlayProps {
  message: string;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ message }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center z-50">
      <div className="bg-white text-black px-6 py-3 rounded-lg shadow-lg mb-4">
        {message}
      </div>
      <div className="flex space-x-2">
        <div className="w-3 h-3 bg-white rounded-full animate-ping"></div>
        <div className="w-3 h-3 bg-white rounded-full animate-ping delay-75"></div>
        <div className="w-3 h-3 bg-white rounded-full animate-ping delay-150"></div>
      </div>
    </div>
  );
};

export default LoadingOverlay;