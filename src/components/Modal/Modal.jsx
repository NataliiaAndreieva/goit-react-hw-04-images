import { createPortal } from "react-dom";
import { Component } from 'react';
import PropTypes from 'prop-types';

import { Backdrop, ModalField } from "./Modal.styled";

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
  };
  componentDidMount() {
    window.addEventListener('keydown', this.keyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.keyDown);
  }

  keyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  onClose = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
   
    return createPortal(
      <Backdrop onClick={this.onClose}>
        <ModalField>
          {this.props.children}
        </ModalField>
      </Backdrop>,
      modalRoot
    );
  }
}


