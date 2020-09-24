import React, { Component } from "react";
import styled from "styled-components";
import Dialog from "./Dialog";
import Login from "./Login";
import Register from "./Register";
import NavStyles from "./styles/NavStyles";
import ButtonWhiteBg from "./styles/ButtonWhiteBg";
import ButtonTransparent from "./styles/ButtonTransparent";
import foodswipeLogo from "../img/foodswipe_logo_white.svg";
import foodswipeLogomarkWhite from "../img/foodswipe_logomark_white.svg";

const Logo = styled.div`
  background: url(${foodswipeLogo}) no-repeat;
  width: 250px;
  height: auto;
  transition: all 0.3s ease;

  @media (max-width: 700px) {
    width: 50px;
    transition: all 0.3s ease;
    background: url(${foodswipeLogomarkWhite}) no-repeat;
  }
`;

class NavLinks extends Component {
  state = {
    signup: false,
    signin: false
  };

  handleLoginModal = key => {
    this.setState({ signin: key });
  };

  handleRegisterModal = key => {
    this.setState({ signup: key });
  };

  displayDialog = () => {
    return (
      <div>
        {/* Sign In Dialog */}
        <Dialog
          isOpen={this.state.signin}
          onClose={() => this.setState({ signin: !this.state.signin })}
        >
          <Login />
        </Dialog>

        {/* Sign Up Dialog */}
        <Dialog
          isOpen={this.state.signup}
          onClose={() => this.setState({ signup: !this.state.signup })}
        >
          <Register
            handleRegisterModal={this.handleRegisterModal}
            handleLoginModal={this.handleLoginModal}
          />
        </Dialog>
      </div>
    );
  };

  render() {
    return (
      <div>
        {this.displayDialog()}
        <NavStyles>
          <Logo />
          <div>
            <ButtonTransparent
              onClick={() => this.setState({ signin: true })}
              padding="0px 24px"
            >
              Sign In
            </ButtonTransparent>

            <ButtonWhiteBg onClick={() => this.setState({ signup: true })}>
              <span>Sign Up</span>
            </ButtonWhiteBg>
          </div>
        </NavStyles>
      </div>
    );
  }
}

export default NavLinks;
