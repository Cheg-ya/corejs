import React, { Component } from 'react';
import './Modal.css';

class Modal extends Component {
  constructor(props) {
    super(props);
    this.onClickToClose = this.onClickToClose.bind(this);
  }

  componentDidMount() {
    document.body.classList.add('noScroll');
  }

  componentWillUnmount() {
    document.body.classList.remove('noScroll');
  }
  
  onClickToClose(e) {
    if(e.target === e.currentTarget) {
      this.props.closeModal();
    }
  }

  render() {
    return (
      <div className="modalCover" onClick={this.onClickToClose}>
        {this.props.children}
      </div>
    );
  }
}

export default Modal;
