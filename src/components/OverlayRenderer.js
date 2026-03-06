import React from 'react';
import { useOverlay } from '../contexts/OverlayContext';
import Modal from './Modal';

/**
 * OverlayRenderer manages and renders all active modals
 * Should be placed at the root of your app after OverlayProvider
 * Note: Toasts are now managed by ToastManager in ToastProvider
 */
const OverlayRenderer = () => {
  const { modals, hideModal } = useOverlay();

  return (
    <>
      {/* Render all active modals */}
      {modals.map((modal) => (
        <Modal
          key={modal.id}
          visible={true}
          onClose={() => hideModal(modal.id)}
          {...modal.options}
        >
          {modal.content}
        </Modal>
      ))}
    </>
  );
};

export default OverlayRenderer;
