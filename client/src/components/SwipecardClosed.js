import React, { Component } from "react";
import styled, { keyframes } from "styled-components";
import ButtonTransparent from "./styles/ButtonTransparent";
import infoIcon from "../img/info_icon.svg";
import CenterContent from "./styles/CenterContent";

const animateButton = keyframes`
  from { transform: scale(0); }
  to { transform: scale(1); }
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
  box-shadow: 0 2px 10px 0 rgba(155, 155, 155, 0.77);
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

const FlexContainer = styled.div`
  display: flex;
`;

const RoundButton = styled.button`
  border: none;
  border-radius: 50%;
  width: 70px;
  height: 70px;
  background-color: ${props => props.backgroundColor || "white"};
  box-shadow: 0 4px 9px 0 rgba(213, 218, 224, 0.3);
  font-size: 20px;
  margin: 17px 4px 0 4px;
  animation: ${animateButton} 0.3s ease;
  outline: none;

  transform: scale(1);
  transition: all 0.1s ease;

  i {
    color: ${props => props.color || "white"};
  }

  &:hover {
    transition: all 0.1s ease;
    transform: scale(1.1);
  }
`;

class SwipecardClosed extends Component {
  state = {};

  likeRestaurant = () => {
    this.props.likeRestaurant();
    this.props.handleDirtyFlag();
  };

  render() {
    return (
      <CenterContent>
        <FoodImage
          height="565px"
          width="375px"
          img={this.props.restaurantData.image_url}
        >
          <FoodImageContainer>
            <h4>{this.props.restaurantData.name}</h4>
            <ButtonTransparent
              onClick={this.props.handleOpenCard}
              hoverOpacity="0.4"
              hoverScale="1.2"
              opacity="1"
            >
              <img src={infoIcon} alt="" />
            </ButtonTransparent>
          </FoodImageContainer>
        </FoodImage>
        <FlexContainer>
          <RoundButton onClick={this.props.likeRestaurant} color="#04de8a">
            <i className="fa fa-heart" />
          </RoundButton>
          <RoundButton onClick={this.props.nextRestaurant} color="#fd5068">
            <i className="fa fa-times" />
          </RoundButton>
        </FlexContainer>
      </CenterContent>
    );
  }
}

export default SwipecardClosed;
