import React, { useState, useEffect } from 'react';

const Toast = (props) => {
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (props.message) {
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    }
  }, [props.message]);

  return (
    showToast && (
      <div className={props.type}>
        {props.message}
      </div>
    )
  );
};

export default Toast;