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
        bottom: '15%',
      }}
      toastOptions={{
        className: '',
        duration: 2500,
        style: {
          textAlign: 'center',
          fontSize: '1.5rem',
          fontWeight: '600',
          background: '#ddd',
          color: '#333',
          padding: '30px',
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