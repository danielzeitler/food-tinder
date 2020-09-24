import React, { Component } from "react";
import styled from "styled-components";
import Logomark from "./styles/Logomark";
import foodswipeLogomark from "../img/foodswipe_logomark.svg";
import Input from "./styles/Input";
import ButtonGradient from "./styles/ButtonGradient";
import FormErrorMessage from "./styles/FormErrorMessage";
import apiService from "../service/apiService";
import SmallText from "./styles/SmallText";

const FormHeader = styled.h3`
  text-transform: uppercase;
  font-style: italic;
  font-size: 2.8rem;
  position: relative;
  margin: 5px 0;
`;

class Register extends Component {
  state = {
    data: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      location: ""
    },
    errors: {}
  };

  // Validate on  change
  validateProperty = input => {
    const errors = { ...this.state.errors };

    if (input.name === "firstname") {
      if (input.value === "") {
        return (errors[input.name] = "❌ Please fill out the firstname field");
      }
    }

    if (input.name === "lastname") {
      if (input.value === "") {
        return (errors[input.name] = "❌ Please fill out the firstname field");
      }
    }

    if (input.name === "email") {
      if (input.value === "") {
        return (errors[input.name] = "❌ Please fill out the email field");
      }
    }

    if (input.name === "password") {
      if (input.value === "") {
        return (errors[input.name] = "❌ Please fill out the password field");
      }
    }

    if (input.name === "location") {
      if (input.value === "") {
        return (errors[input.name] = "❌ Please fill out the location field");
      }
    }
  };

  // validate on submit
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

  // validate on change and handle form input
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
      this.setState({ errors: "" });
      const user = this.state.data;
      apiService.register(user).then(response => {
        this.props.handleRegisterModal(false);
        this.props.handleLoginModal(true);
      });
    }
  };

  render() {
    return (
      <div>
        <Logomark src={foodswipeLogomark} alt="Foodswipe Logo" />
        <FormHeader>Sign Up</FormHeader>
        <form onSubmit={this.handleSubmit}>
          <Input
            borderColor={this.state.errors.firstname ? "red" : null}
            type="text"
            placeholder="Firstname"
            name="firstname"
            value={this.state.data.firstname}
            onChange={this.handleChange}
          />
          <FormErrorMessage>{this.state.errors.firstname}</FormErrorMessage>
          <Input
            type="text"
            borderColor={this.state.errors.lastname ? "red" : null}
            placeholder="Lastname"
            name="lastname"
            value={this.state.data.lastname}
            onChange={this.handleChange}
          />
          <FormErrorMessage>{this.state.errors.lastname}</FormErrorMessage>
          <Input
            type="text"
            borderColor={this.state.errors.email ? "red" : null}
            placeholder="E-Mail"
            name="email"
            value={this.state.data.email}
            onChange={this.handleChange}
          />
          <FormErrorMessage>{this.state.errors.email}</FormErrorMessage>
          <Input
            borderColor={this.state.errors.password ? "red" : null}
            type="password"
            placeholder="Password"
            name="password"
            value={this.state.data.password}
            onChange={this.handleChange}
          />
          <FormErrorMessage>{this.state.errors.password}</FormErrorMessage>
          <Input
            borderColor={this.state.errors.location ? "red" : null}
            type="text"
            onChange={this.handleChange}
            value={this.state.data.location}
            placeholder="Your Location e.g Hamburg"
            name="location"
          />
          <FormErrorMessage>{this.state.errors.location}</FormErrorMessage>
          <SmallText>
            Durch deine Anmeldung erklärst du dich mit unseren
            <span> Nutzungsbedingungen</span>, unserer
            <span> Datenschutzerklärung</span> und unserer
            <span> Cookie-Richtlinie</span> einverstanden.
          </SmallText>
          <ButtonGradient type="Submit" textColor="white" margin="10px 0">
            Submit
          </ButtonGradient>
        </form>
      </div>
    );
  }
}

export default Register;
