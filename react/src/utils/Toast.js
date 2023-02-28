import React, { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';

const Toast = () => {

  return (
    <Toaster
      position="bottom-center"
      reverseOrder={false}
      gutter={8}
      containerClassName=""
      containerStyle={{
        bottom: '25%',
      }}
      toastOptions={{
        className: '',
        duration: 2500,
        style: {
          fontSize: '2rem',
          fontWeight: '600',
          background: '#ddd',
          color: '#333',
          padding: '40px',
        },

        success: {
          duration: 2000,
          style: {
            background: '#8bb63b',
            color: '#f5f4f4', 
          },
        },

        error: {
          duration: 3000,
          style: {
            background: 'red',
            color: '#f5f4f4', 
          },
        },
        
      }}
    />
    
  );
};

export default Toast;