import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { BounceLoader } from "react-spinners";
import styled from "styled-components";
import apiService from "../service/apiService";
import CarouselSlider from "./CarouselSlider";
import RestaurantProfileDetail from "./RestaurantProfileDetail";
import ProfileCard from "../components/styles/ProfileCard";

const CenterContent = styled.div`
  display: flex;
  width: 25%;
  height: 100vh;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-width: 324px;
  border-left: 1px solid #e5e8ec;
  position: relative;

  @media (max-width: 650px) {
    margin: 0 auto;
  }
`;

const ButtonGrey = styled.button`
  border: none;
  cursor: pointer;
  margin: ${props => props.margin || 0};
  font-size: 1.5rem;
  position: absolute;
  bottom: 0;
  right: 0;
  text-transform: uppercase;
  width: ${props => props.width || "260px"};
  height: ${props => props.height || "50px"};
  color: ${props => props.theme.secondaryColor};
  background-color: ${props => props.theme.backgroundApp};

  &:hover {
    transition: all 0.1s ease-in-out;
    background-image: linear-gradient(to right, #fd267d, #ff7854);
    color: ${props => props.theme.white};
  }

  &:focus {
    outline: none;
  }
`;

const CenterContentRight = styled.div`
  width: 25%;
  height: 100vh;
  min-width: 324px;
  background-color: #fff;
  border-left: 1px solid #e5e8ec;
  overflow: hidden;
  position: relative;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 0px;
    background: transparent;
  }

  @media (max-width: 975px) {
    display: none;
  }
`;

const EmptyComment = styled.div`
  color: ${props => props.theme.secondaryColor};
  font-size: 16px;
  margin: 10px 17px;
  padding: 17px;

  p {
    margin: 0;
    color: ${props => props.theme.black};
    line-height: 1.8;
  }

  h6 {
    font-size: 16px;
    font-weight: 600;
    margin: 0;
    color: ${props => props.theme.black};

    span {
      font-weight: 300;
    }
  }
`;

class FoodDetailview extends Component {
  state = {
    restaurant: null
  };

  // gets all restaurant details.
  // The details can be viewed at the yelp api documentation (yelp fusion)
  getRestaurantDetail = () => {
    let yelp_id = this.props.activeRestaurantId;

    if (yelp_id) {
      apiService.getRestaurantById(yelp_id).then(restaurant => {
        this.setState({ restaurant: restaurant });
      });
    } else {
      this.setState({ restaurant: null });
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.activeRestaurantId !== this.props.activeRestaurantId) {
      this.getRestaurantDetail();
    }
  }

  componentDidMount() {
    this.getRestaurantDetail();
  }

  render() {
    const { restaurant } = this.state;

    if (this.props.activeRestaurantId === null) {
      return (
        <CenterContent>
          <EmptyComment>Please pick a new restaurant</EmptyComment>
        </CenterContent>
      );
    }

    if (!restaurant) {
      return (
        <CenterContent>
          <BounceLoader sizeUnit={"px"} size={80} color={"#ff7854"} />
        </CenterContent>
      );
    }

    return (
      <CenterContentRight>
        <CarouselSlider restaurant={this.state.restaurant.photos} />
        <RestaurantProfileDetail restaurant={this.state.restaurant} />
        <hr />
        <ProfileCard>
          <p>If you don't like the restaurant anymore. Just delete it!</p>
          <ButtonGrey width={"100%"} onClick={this.props.confirmationHandler}>
            Delete
          </ButtonGrey>
        </ProfileCard>
      </CenterContentRight>
    );
  }
}

export default withRouter(FoodDetailview);
