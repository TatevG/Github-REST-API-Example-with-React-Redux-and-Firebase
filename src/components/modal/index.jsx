import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Modal extends Component {
  constructor(props) {
    super(props);
    this.alert = this.alert.bind(this);
    this.state = {
      isOpen: false,
      type: "alert",
      subject: "",
      text: "",
    }
  }
  alert(subject, text) {
    this.setState({ isOpen: true, type: "alert", subject, text });
    return new Promise((resolve, reject) => {
      this.Success = () => {
        this.setState({ isOpen: false });
        resolve(true);
      };
    })
  }
  confirm(subject, text) {
    this.setState({ isOpen: true, type: "confirm", subject, text });
    return new Promise((resolve, reject) => {
      this.Cancel = () => {
        this.setState({ isOpen: false });
        resolve(false);
      };
      this.Success = () => {
        this.setState({ isOpen: false });
        resolve(true);
      };
    })
  }
  render() {
    const { isOpen, type, subject, text } = this.state;
    switch (type) {
      case "confirm":
        return (
          <div className={`modal ${isOpen ? 'active' : ''}`}>
            <div className="modal-content">
              <div className="modal-text">
                <h1>{subject}</h1>
                <p>{text}</p>
              </div>
              <hr />
              <div className="modal-btn">
                <button onClick={()=> this.Success()}>Ok </button>
                <button onClick={()=> this.Cancel()}>Cancel </button>
              </div>
            </div>
          </div>
        );
      case "alert":
        return (
          <div className={`modal alert ${isOpen ? 'active' : ''}`}>
            <div className="modal-content">
              <div className="modal-text">
                <h1>{subject}</h1>
                <p>{text}</p>
              </div>
              <div className="modal-btn">
                <button onClick={()=> this.Success()}>Ok </button>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className={`modal ${isOpen ? 'active' : ''}`}>
            <div className="modal-content">
              <div className="modal-text">
                <h1>{subject}</h1>
                <p>{text}</p>
              </div>
              <div className="modal-btn">
                <button onClick={()=> this.Success()}>Ok </button>
              </div>
            </div>
          </div>
        );
    }
  }
}

Modal.propTypes = {

};

export default Modal;