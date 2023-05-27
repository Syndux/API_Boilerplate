import React, { createContext, useContext, useState } from 'react';

// Create the ModalContext
const ModalContext = createContext();

// Custom hook to access the modal context
export function useModal() {
  return useContext(ModalContext);
}

// ModalProvider component to wrap the application and provide modal functionality
export function ModalProvider({ children }) {
  const [modalContent, setModalContent] = useState(null);
  const [onModalClose, setOnModalClose] = useState(null);

  const closeModal = () => {
    setModalContent(null);
    if (onModalClose) {
      onModalClose();
      setOnModalClose(null);
    }
  };

  const modalContextValue = {
    setModalContent,
    setOnModalClose,
    closeModal,
  };

  return (
    <ModalContext.Provider value={modalContextValue}>
      {children}
      {modalContent && (
        <div className="modal">
          <div className="modal-content">{modalContent}</div>
        </div>
      )}
    </ModalContext.Provider>
  );
}
