import React, { Component } from "react";
import Card from "../components/Card";
import SidebarMenu from "../components/SidebarMenu";
import FlexContainer from "../components/styles/FlexContainer";

class FoodswipeHome extends Component {
  state = {
    dirty: false
  };

  changeDirtyFlag = () => {
    this.setState({ dirty: !this.state.dirty });
  };

  render() {
    return (
      <FlexContainer>
        <SidebarMenu dirty={this.state.dirty} homeView />
        <Card handleDirtyFlag={this.changeDirtyFlag} />
      </FlexContainer>
    );
  }
}

export default FoodswipeHome;
