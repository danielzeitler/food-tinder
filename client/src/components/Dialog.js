import React, { Component } from "react";
import styled, { keyframes } from "styled-components";
import closeIcon from "../img/cancel.svg";

const animateIn = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(90deg); }
`;

const animateOut = keyframes`
  from { transform: rotate(90deg);}
  to { transform: rotate(0deg); }
`;

const animateScaleIn = keyframes`
  from { transform: scale(0)}
  to { transform: scale(1) }
`;

const DialogStyles = styled.div`
  display: flex;
  flex-direction: column;
  width: 500px;
  max-width: 90%;
  margin: 0 auto;
  animation: ${animateScaleIn} 0.2s linear;
  background-color: #fff;
  padding: 10px 20px 40px;
  border-radius: 8px;
  z-index: 9999;
  padding: 20px;
  height: auto;
  text-align: center;
`;

const DialogCloseButtonStyles = styled.button`
  margin-bottom: 15px;
  z-index: 9999;
  padding: 3px 8px;
  cursor: pointer;
  border-radius: 50%;
  border: none;
  width: 30px;
  height: 30px;
  font-weight: bold;
  background-image: url(${closeIcon});
  align-self: flex-end;
  animation: ${animateIn} 0.1s linear;

  &:hover {
    animation: ${animateOut} 0.1s linear;
    fill: black;
  }

  &:focus {
    outline: none;
  }
`;

const BackgroundFade = styled.div`
  background-color: black;
  width: 100%;
  height: 100vh;
  z-index: 4;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0.6;
`;

const CenterDialog = styled.div`
  position: absolute;
  width: 100%;
  display: flex;
  height: 100%;
  justify-content: center;
  align-content: center;
  align-items: center;
`;

class Dialog extends Component {
  render() {
    if (this.props.isOpen) {
      return (
        <div>
          <CenterDialog>
            <DialogStyles onClick={event => event.stopPropagation()}>
              <DialogCloseButtonStyles onClick={this.props.onClose} />
              {this.props.children}
            </DialogStyles>
          </CenterDialog>
          <BackgroundFade onClick={this.props.onClose} />
        </div>
      );
    } else {
      return null;
    }
  }
}

export default Dialog;
