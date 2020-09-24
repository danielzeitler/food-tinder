import React, { Component } from "react";
import SidebarMenu from "../components/SidebarMenu";
import FlexContainer from "../components/styles/FlexContainer";
import CenterContent from "../components/styles/CenterContent";

class FoodSwipeProfile extends Component {
  state = {};

  render() {
    return (
      <div>
        <FlexContainer>
          <SidebarMenu homeView />
          <CenterContent>
            <h4>More cool stuff here soon! 🥳</h4>
          </CenterContent>
        </FlexContainer>
      </div>
    );
  }
}

export default FoodSwipeProfile;
