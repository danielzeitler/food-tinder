import React, { Component } from "react";
import { BounceLoader } from "react-spinners";
import SwipecardClosed from "./SwipecardClosed";
import SwipecardOpen from "./SwipecardOpen";
import auth from "../service/Auth";
import apiService from "../service/apiService";
import CenterContent from "../components/styles/CenterContent";

class Card extends Component {
  state = {
    likedRestaurants: [],
    isOpen: false,
    restaurants: [],
    offset: 1,
    errors: ""
  };

  getRestaurants = () => {
    // Picks random restaurant
    const offset = Math.floor(Math.random() * 100) + 1;
    const location = auth.activeUser.location;

    apiService
      .getRestaurants(offset, location)
      .then(response => this.setState({ restaurants: response }))
      .catch(err =>
        this.setState({
          errors: "An error occured. Please go check your location settings"
        })
      );
  };

  componentDidMount() {
    this.getRestaurants();
  }

  nextRestaurant = () => {
    this.setState({
      offset: Math.floor(Math.random() * 100) + 1,
      restaurants: [],
      isOpen: false
    });

    this.getRestaurants();
  };

  likeRestaurant = () => {
    const data = {
      yelpData: this.state.restaurants,
      user: auth.activeUser
    };

    apiService.likedPosts(data).then(response => {
      this.props.handleDirtyFlag();
    });

    this.setState({
      likedRestaurants: [this.state.restaurants, ...this.state.likedRestaurants]
    });

    this.nextRestaurant();
  };

  isOpenCard = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    if (this.state.errors !== "") {
      return (
        <CenterContent>
          <p>{this.state.errors}</p>
        </CenterContent>
      );
    }

    if (this.state.restaurants.length === 0) {
      return (
        <CenterContent>
          <BounceLoader sizeUnit={"px"} size={80} color={"#ff7854"} />
        </CenterContent>
      );
    }

    return !this.state.isOpen ? (
      <SwipecardClosed
        handleDirtyFlag={this.handleDirtyFlag}
        likeRestaurant={this.likeRestaurant}
        nextRestaurant={this.nextRestaurant}
        handleOpenCard={this.isOpenCard}
        restaurantData={this.state.restaurants}
      />
    ) : (
      <SwipecardOpen
        handleDirtyFlag={this.handleDirtyFlag}
        likeRestaurant={this.likeRestaurant}
        nextRestaurant={this.nextRestaurant}
        handleCloseCard={this.isOpenCard}
        restaurantData={this.state.restaurants}
      />
    );
  }
}

export default Card;
