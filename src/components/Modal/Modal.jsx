import { createPortal } from "react-dom";
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { Backdrop, ModalField } from "./Modal.styled";

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ onClose, children }) => {
  useEffect(() => {
    const keyDown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', keyDown);
    return () => {
      window.removeEventListener('keydown', keyDown);
    };
  }, [onClose]);

  const onBackdropClose = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return createPortal(
    <Backdrop onClick={onBackdropClose}>
      <ModalField>{children}</ModalField>
    </Backdrop>,
    modalRoot
  );
};

  Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
  };

export default Modal;

