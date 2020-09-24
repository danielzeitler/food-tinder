import React, { Component } from "react";
import styled, { keyframes } from "styled-components";
import img from "../img/foodBanner_bg.jpg";
import ButtonGradient from "./styles/ButtonGradient";
import Dialog from "./Dialog";
import Register from "./Register";

const fadeIn = keyframes`
  from {
    opacity: 0.4
  }

  to {
    opacity: 2
  }
`;

const BackgroundImg = styled.div`
  background: ${props => props.image} center center no-repeat;
  background-size: cover;
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -2;
  animation: ${fadeIn} 1s linear;
`;

const CenterText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  z-index: -1;
`;

const HeroText = styled.h1`
  font-size: 8rem;
  margin: 0;
  margin-bottom: 70px;
  text-align: center;
  line-height: 10rem;
  color: #fff;
  span {
    font-size: 6.5rem;
  }
`;

const CenterButton = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

class HeaderImg extends Component {
  state = {
    isOpen: false
  };

  render() {
    return (
      <div>
        <Dialog
          isOpen={this.state.isOpen}
          onClose={() => this.setState({ isOpen: false })}
        >
          <Register />
        </Dialog>

        <CenterText>
          <CenterButton>
            <HeroText>
              Explore. Swipe. <br /> Enjoy.{" "}
              <span role="img" aria-label="emoji">
                ✌️
              </span>
            </HeroText>
            <ButtonGradient
              onClick={() => this.setState({ isOpen: true })}
              textColor={"#fff"}
            >
              <span>Sign Up</span>
            </ButtonGradient>
          </CenterButton>
        </CenterText>
        <BackgroundImg image={`url(${img})`} />
      </div>
    );
  }
}

export default HeaderImg;
