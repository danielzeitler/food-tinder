import React, { Component } from "react";
import { toast } from "react-toastify";
import { withRouter } from "react-router-dom";
import foodswipeLogomark from "../img/foodswipe_logomark.svg";
import apiService from "../service/apiService";
import Dialog from "../components/Dialog";
import Logomark from "../components/styles/Logomark";
import ButtonGradient from "../components/styles/ButtonGradient";

class DeleteRestaurantModal extends Component {
  deleteRestaurant = yelpId => {
    apiService
      .deleteRestaurantById(yelpId)
      .then(response => {
        toast("Restaurant successfully deleted");
        this.props.handleDirtyStatus();
        this.props.closeHandler();

        // Reset restaurant id so when page gets reloaded the correct restaurant renders
        this.props.history.push({
          pathname: "/app/detail",
          state: { restaurantId: null }
        });
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <Dialog isOpen={this.props.isOpen} onClose={this.props.closeHandler}>
        <Logomark src={foodswipeLogomark} alt="Foodswipe Logo" />
        <h5>Are you sure you want to delete this Restaurant?</h5>
        <ButtonGradient
          onClick={() => this.deleteRestaurant(this.props.activeRestaurantId)}
          margin={"0 auto"}
        >
          Delete
        </ButtonGradient>
      </Dialog>
    );
  }
}

export default withRouter(DeleteRestaurantModal);
