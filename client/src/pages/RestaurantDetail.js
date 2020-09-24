import React, { Component } from "react";
import styled, { keyframes } from "styled-components";
import SidebarMenu from "../components/SidebarMenu";
import FlexContainer from "../components/styles/FlexContainer";
import CommentSection from "../components/CommentSection";
import FoodDetailview from "../components/FoodDetailview";
import DeleteRestaurantModal from "../components/DeleteRestaurantModal";

const animatePage = keyframes`
  from { transform: translateX(800px); }
  to { transform: translateX(0); }
`;

const CenterContent = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  overflow-y: scroll;
  animation: ${animatePage} 0.6s ease;
`;

class RestaurantDetail extends Component {
  state = {
    isOpen: false,
    dirty: false,
    activeRestaurantId: null
  };

  // Handling the active restaurant
  componentDidMount() {
    const restaurantId = this.props.history.location.state.restaurantId;
    const activeRestaurantId = this.state.activeRestaurantId;

    if (activeRestaurantId === null && restaurantId) {
      this.setState({ activeRestaurantId: restaurantId });
    }
  }

  showModal = () => {
    this.setState({ isOpen: true });
  };

  closeModal = () => {
    this.setState({ isOpen: false });
  };

  changeDirtyStatus = () => {
    this.setState({ dirty: !this.state.dirty, activeRestaurantId: null });
  };

  changeActiveRestaurantId = id => {
    this.setState({ activeRestaurantId: id });
  };

  render() {
    return (
      <div>
        {/* Delete Modal Dialog */}
        <DeleteRestaurantModal
          closeHandler={this.closeModal}
          isOpen={this.state.isOpen}
          showModal={this.showModal}
          changeActiveRestaurantId={this.changeActiveRestaurantId}
          activeRestaurantId={this.state.activeRestaurantId}
          handleDirtyStatus={this.changeDirtyStatus}
        />

        {/* Full Restaurant Detail Page */}
        <FlexContainer>
          <SidebarMenu
            dirty={this.state.dirty}
            handleRestaurantChange={this.changeActiveRestaurantId}
          />
          <CenterContent>
            <CommentSection
              activeRestaurantId={this.state.activeRestaurantId}
            />
            <FoodDetailview
              activeRestaurantId={this.state.activeRestaurantId}
              confirmationHandler={this.showModal}
              changeActiveRestaurantId={this.changeActiveRestaurantId}
            />
          </CenterContent>
        </FlexContainer>
      </div>
    );
  }
}

export default RestaurantDetail;
