import React, { useState } from "react";
import Form from "./ModalForm";

const Modal = (props) => {
  // Handler for clicking outside the modal to close it
  const handleClickOutside = (e) => {
    if (e.target.className.includes("modal-background")) {
      props.onClose();
    }
  };

  // Handler for closing the modal
  const handleCloseModal = () => {
    props.onClose();
  };

  return (
    // Modal background with click handler to close the modal
    <div
      className="modal-background fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleClickOutside}
    >
      {/* Modal content */}
      <div className="modal-content w-full max-w-md rounded bg-white p-6 text-center">
        {/* Close button */}
        <button
          className="close-button absolute top-2 right-2 text-2xl"
          onClick={props.onClose}
        >
          &times;
        </button>
        <Form closeModal={handleCloseModal} />
      </div>
    </div>
  );
};

export default Modal;
