import React, { Component } from "react";
import Navbar from "../components/Navbar";
import HeaderImg from "../components/HeaderImg";

class LandingPage extends Component {
  state = {};

  render() {
    return (
      <div>
        <HeaderImg />
        <Navbar />
      </div>
    );
  }
}

export default LandingPage;
