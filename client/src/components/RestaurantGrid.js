import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
  padding: 7px;
`;

const NoLikesNotification = styled.p`
  text-align: center;
  font-size: 20px;
`;

const FoodImageContainer = styled.div`
  position: absolute;
  bottom: 0px;
  width: 100%;
  padding-bottom: ${props => props.paddingBottom || "30px"};
  padding-left: ${props => props.paddingLeft || "22px"};
  padding-right: ${props => props.paddingRight || "22px"};
  padding-top: ${props => props.paddingTop || "100px"};
  margin: 0;
  display: flex;
  justify-content: space-between;
  background-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0.5)
  );
  border-radius: 10px;
  cursor: pointer;

  h4 {
    margin: 0;
    color: #fff;
    font-weight: 100;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  p {
    font-size: 12px;
    color: #fff;
    width: 100%;
    margin: 0;
    padding: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const FoodImage = styled.div`
  width: ${props => props.width || null};
  height: ${props => props.height || null};
  background-color: black;
  border-radius: 10px;
  background: url(${props => props.img}) center center no-repeat;
  background-size: cover;
  position: relative;
  margin: 7px 7px;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
    transition: all 0.3s ease;
  }
`;

class RestaurantGrid extends Component {
  // control re-rendering of the restaurants
  changeRestaurant = id => {
    if (!this.props.homeView) {
      this.props.handleRestaurantChange(id);
    } else {
      this.props.history.push({
        pathname: "/app/detail",
        state: { restaurantId: id }
      });
    }
  };

  render() {
    if (this.props.likedRestaurants.length === 0) {
      return (
        <NoLikesNotification>
          You Liked Nothing Yet{" "}
          <span role="img" aria-label="sad face">
            😞
          </span>
        </NoLikesNotification>
      );
    }

    return (
      <GridContainer>
        {this.props.likedRestaurants.map((restaurant, index) => (
          <FoodImage
            key={index}
            onClick={() => this.changeRestaurant(restaurant.id)}
            height="120px"
            img={restaurant.image_url}
          >
            <FoodImageContainer
              paddingTop="24px"
              paddingRight="7px"
              paddingBottom="8px"
              paddingLeft="7px"
            >
              <p>{restaurant.name}</p>
            </FoodImageContainer>
          </FoodImage>
        ))}
      </GridContainer>
    );
  }
}

export default withRouter(RestaurantGrid);
