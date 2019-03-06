import React, { Component } from 'react';
import './Modal.css';

class Modal extends Component {
  constructor(props) {
    super(props);

    this.onClickToClose = this.onClickToClose.bind(this);
  }

  onClickToClose() {
    this.props.closeModal();
  }

  preventScrolling(e) {
    e.preventDefault();
  }

  render() {
    return (
      <div className="modalCover" onClick={this.onClickToClose} onWheel={this.preventScrolling}>
        {this.props.children}
      </div>
    );
  }
}

export default Modal;
