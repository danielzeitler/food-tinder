import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import img from "../img/placeholder_user.png";
import leftArrowIcon from "../img/left_arrow.svg";
import auth from "../service/Auth";
import apiService from "../service/apiService";
import RestaurantGrid from "./RestaurantGrid";
import UserProfileSidebar from "./UserProfileSidebar";

const animateMenu = keyframes`
  from { transform: translateX(-20px); }
  to { transform: translateX(0); }
`;

const Menu = styled.div`
  background-color: ${props => props.backgroundColor || "white"};
  min-width: 300px;
  height: 100vh;
  border-right: 1px solid #e5e8ec;
  overflow: hidden;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 0px;
    background: transparent;
  }

  @media (max-width: 750px) {
    min-width: 200px;
  }

  @media (max-width: 650px) {
    min-width: 100px;
  }

  @media (max-width: 650px) {
    display: none;
  }
`;

const UserProfileImage = styled.img`
  border-radius: 50%;
  border: 2px solid #fff;
  height: 46px;
  width: 46px;
  margin-right: 17px;
  object-fit: cover;
  animation: ${animateMenu} 0.4s ease;
`;

const UserMenuBar = styled.div`
  padding: 14px 25px;
  color: white;
  font-size: 2.2rem;
  font-weight: 100;
  background-image: ${props => props.theme.gradient};
  display: flex;
  align-items: center;
  align-content: center;

  a {
    margin-top: 3px;
    display: inherit;
    color: #fff;
    animation: ${animateMenu} 0.4s ease;
  }
`;

const LeftArrowIcon = styled.img`
  margin-right: 24px;
  padding: 0;
  height: 24px;
`;

class SidebarMenu extends Component {
  state = {
    likedRestaurants: [],
    userImage: []
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.dirty !== this.props.dirty) {
      this.getRestaurants();
    }
  }

  componentDidMount() {
    this.getRestaurants();
    this.getUserImage();
  }

  getUserImage = () => {
    apiService.getUserImage(auth.activeUser.id).then(response => {
      this.setState({ userImage: response });
    });
  };

  getRestaurants = () => {
    apiService.getYelpData(auth.activeUser.id).then(response => {
      const restaurants = [];
      response.forEach(data => {
        restaurants.push(JSON.parse(data));
      });

      this.setState({ likedRestaurants: restaurants });
    });
  };

  render() {
    return (
      <Menu
        backgroundColor={!this.props.likedRestaurants ? "#f5f7fa" : "white"}
      >
        <UserMenuBar>
          {this.props.match.path !== "/" ? (
            <Link to="/">
              <LeftArrowIcon src={leftArrowIcon} />
            </Link>
          ) : null}
          <UserProfileImage
            src={
              this.state.userImage.image
                ? "http://localhost:5000/" + this.state.userImage.image
                : img
            }
          />
          <Link to="/app/profile">My Profile</Link>
        </UserMenuBar>

        {this.props.match.path !== "/app/profile" ? (
          <RestaurantGrid
            homeView={this.props.homeView}
            handleRestaurantChange={this.props.handleRestaurantChange}
            likedRestaurants={this.state.likedRestaurants}
          />
        ) : (
          <UserProfileSidebar
            homeView
            getUserImage={this.getUserImage}
            userImage={this.state.userImage}
          />
        )}
      </Menu>
    );
  }
}

export default withRouter(SidebarMenu);
