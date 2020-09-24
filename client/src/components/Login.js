import React, { Component } from "react";
import styled from "styled-components";
import ButtonGradient from "./styles/ButtonGradient";
import foodswipeLogomark from "../img/foodswipe_logomark.svg";
import FormErrorMessage from "./styles/FormErrorMessage";
import Input from "./styles/Input";
import Logomark from "./styles/Logomark";
import auth from "../service/Auth";
import apiService from "../service/apiService";
import SmallText from "./styles/SmallText";

const FormHeader = styled.h3`
  text-transform: uppercase;
  font-style: italic;
  font-size: 2.8rem;
  position: relative;
  margin: 5px 0;
`;

class Login extends Component {
  state = {
    data: { email: "", password: "" },
    errors: {},
    color: {}
  };

  // Validate on Change
  validateProperty = input => {
    const errors = { ...this.state.errors };

    if (input.name === "email") {
      if (input.value === "") {
        return (errors.email = "❌ Please fill out the email field");
      }
    }

    if (input.name === "password") {
      if (input.value === "") {
        return (errors.password = "❌ Please fill out the password field");
      }
    }
  };

  // Validate when submitted
  validate = () => {
    const data = { ...this.state.data };
    const errors = {};

    for (let key in data) {
      switch (data[key]) {
        case "":
          errors[key] = `❌ Please fill out the ${key} field`;
          break;
        default:
      }
    }

    return errors;
  };

  // Validate on Change and handle input change
  handleChange = e => {
    const data = { ...this.state.data };
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(e.target);

    data[e.target.name] = e.target.value;
    errors[e.target.name] = errors
      ? errorMessage
      : delete errors[e.target.name];

    this.setState({ data, errors });
  };

  handleSubmit = e => {
    e.preventDefault();
    const errors = this.validate();

    if (Object.keys(errors).length) {
      this.setState({ errors });
    } else {
      try {
        const user = this.state.data;

        apiService.login(user).then(data => {
          auth.authenticate(data.userData, data.token, () => {
            window.location = "/";
          });
        });
      } catch (ex) {
        if (ex.response && ex.response.status === 400) {
          const errors = { ...this.state.errors };
          errors.notification = ex.response.data;
          this.setState({ errors });
        }
      }
    }
  };

  render() {
    return (
      <div>
        <Logomark src={foodswipeLogomark} alt="Foodswipe Logo" />
        <FormHeader>Sign In</FormHeader>
        <form onSubmit={this.handleSubmit}>
          <Input
            borderColor={
              this.state.errors.email || this.state.errors.notification
                ? "red"
                : null
            }
            type="text"
            name="email"
            placeholder="E-Mail"
            onChange={this.handleChange}
            value={this.state.data.email}
          />
          <FormErrorMessage>
            {this.state.errors.email || this.state.errors.notification}
          </FormErrorMessage>
          <Input
            borderColor={
              this.state.errors.password || this.state.errors.notification
                ? "red"
                : null
            }
            type="password"
            placeholder="Password"
            name="password"
            onChange={this.handleChange}
            value={this.state.data.password}
          />
          <FormErrorMessage>
            {this.state.errors.password || this.state.errors.notification}
          </FormErrorMessage>
          <SmallText>
            Durch deine Anmeldung erklärst du dich mit unseren
            <span> Nutzungsbedingungen</span>, unserer
            <span> Datenschutzerklärung</span> und unserer
            <span> Cookie-Richtlinie</span> einverstanden.
          </SmallText>
          <ButtonGradient type="submit" textColor="white" margin="10px 0">
            Submit
          </ButtonGradient>
        </form>
      </div>
    );
  }
}

export default Login;
