import React, { useState, useEffect } from 'react';

const Toast = (props) => {

  const type = `toast-${props.type}`

  return (
 
      <div className={type}>
        {props.message}
      </div>
    
  );
};

export default Toast;