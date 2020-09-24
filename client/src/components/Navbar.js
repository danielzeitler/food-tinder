import React, { Component } from "react";
import NavLinks from "./NavLinks";

class Navbar extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <NavLinks />
      </React.Fragment>
    );
  }
}

export default Navbar;
