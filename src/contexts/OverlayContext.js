import React, { createContext, useState, useContext, useCallback } from 'react';

export const OverlayContext = createContext();

export const useOverlay = () => {
  const context = useContext(OverlayContext);
  if (!context) {
    throw new Error('useOverlay must be used within an OverlayProvider');
  }
  return context;
};

/**
 * OverlayProvider manages the state of modals
 * Provides functions to show/hide modals
 */
export const OverlayProvider = ({ children }) => {
  const [modals, setModals] = useState([]);

  // Modal functions
  const showModal = useCallback((id, content, options = {}) => {
    setModals(prev => [...prev, { id, content, options }]);
  }, []);

  const hideModal = useCallback((id) => {
    setModals(prev => prev.filter(modal => modal.id !== id));
  }, []);

  const hideAllModals = useCallback(() => {
    setModals([]);
  }, []);

  const value = {
    // Modal state and functions
    modals,
    showModal,
    hideModal,
    hideAllModals,
  };

  return (
    <OverlayContext.Provider value={value}>
      {children}
    </OverlayContext.Provider>
  );
};
