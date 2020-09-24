import React, { Component } from "react";
import styled, { keyframes } from "styled-components";
import { Carousel } from "react-responsive-carousel";
import { toast } from "react-toastify";
import StarRatingComponent from "react-star-rating-component";
import downArrow from "../img/down_arrow.svg";
import apiService from "../service/apiService";
import Input from "./styles/Input";
import ButtonGradient from "./styles/ButtonGradient";
import FormErrorMessage from "./styles/FormErrorMessage";
import CenterContent from "./styles/CenterContent";
import ProfileCard from "./styles/ProfileCard";

const animateButton = keyframes`
  from { transform: translateY(100px); }
  to { transform: translateY(0); }
`;

const Form = styled.form`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-top: 16px;
`;

const Card = styled.div`
  width: ${props => props.width || null};
  height: ${props => props.height || null};
  background-color: #fff;
  border-radius: 10px;
  background-size: cover;
  position: relative;
  margin: 7px 7px;
  box-shadow: 0 2px 10px 0 rgba(155, 155, 155, 0.77);
  overflow: hidden;
`;

const FlexContainer = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: 0px;
  padding: 16px 0;
  width: 100%;
  z-index: 1;
  background-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0),
    rgba(255, 255, 255, 1)
  );
`;

const RoundButton = styled.button`
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  background-color: ${props => props.backgroundColor || "white"};
  box-shadow: 0 4px 9px 0 rgba(213, 218, 224, 0.3);
  font-size: 20px;
  margin: 17px 4px 0 4px;
  animation: ${animateButton} 0.4s ease;
  transform: scale(1);
  transition: all 0.1s ease;
  outline: none;

  i {
    color: ${props => props.color || "white"};
  }

  &:hover {
    transition: all 0.1s ease;
    transform: scale(1.1);
  }
`;

const CircleButtonGradient = styled.button`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: none;
  position: absolute;
  padding: 0;
  right: 16px;
  top: 10px;
  outline: none;
  opacity: 1;
  transition: all 0.3s ease;
  z-index: 3;
  &:hover {
    opacity: 0.4;
    transform: scale(1.1);
    transition: all 0.2s ease;
  }

  img {
    width: 24px;
    height: 24px;
  }
`;

const CardContent = styled.div`
  height: 100%;
  width: 100%;
  overflow-y: scroll;
  margin-bottom: 200px;
  ::-webkit-scrollbar {
    width: 0px;
    background: transparent;
  }
`;

const Label = styled.label`
  position: absolute;
  display: block;
  left: 19px;
  top: 16px;
  color: #424242;
  font-size: 0.7em;
`;

const Image = styled.div`
  width: 100%;
  border-radius: 10px 10px 0 0;
  background: url(${props => props.img}) center center no-repeat;
  background-size: cover;
  overflow-y: scroll;
`;

const InputBox = styled.div`
  position: relative;
`;

const Separator = styled.div`
  margin-bottom: 100px;
`;

const StarRatingStyles = styled.div`
  display: inline;
  position: absolute;
  top: 0px;
  left: 52px;
`;

class SwipecardOpen extends Component {
  state = {
    userNumber: "",
    error: ""
  };

  // Send restaurant to phone
  handleSubmit = e => {
    e.preventDefault();

    // Check if number
    let regex = /^[0-9]*$/gm;
    let phoneNumber = this.state.userNumber;
    let isValidNumber = phoneNumber.match(regex);

    if (!isValidNumber || this.state.userNumber === "") {
      this.setState({ error: "Not valid number or field empty" });
    } else {
      this.setState({ userNumber: "" });
    }

    const restaurantData = this.props.restaurantData;
    const userNumber = this.state.userNumber;
    apiService
      .sendRestaurantToPhone(restaurantData, userNumber)
      .then(response => {
        toast("Your restaurant is on the way!");
      });
  };

  handleChange = e => {
    this.setState({ userNumber: e.target.value });
  };

  render() {
    const { restaurantData } = this.props;
    const photos = Object.assign({}, restaurantData.photos);

    return (
      <React.Fragment>
        <CenterContent>
          <Card height="650px" width="375px">
            <FlexContainer>
              <RoundButton onClick={this.props.likeRestaurant} color="#04de8a">
                <i className="fa fa-heart" />
              </RoundButton>
              <RoundButton onClick={this.props.nextRestaurant} color="#fd5068">
                <i className="fa fa-times" />
              </RoundButton>
            </FlexContainer>
            <CardContent>
              <CircleButtonGradient onClick={this.props.handleCloseCard}>
                <img src={downArrow} alt="" />
              </CircleButtonGradient>
              <Image>
                <Carousel
                  showThumbs={false}
                  showArrows={false}
                  showStatus={false}
                >
                  <img src={photos[0]} alt="" />
                  <img src={photos[1]} alt="" />
                  <img src={photos[2]} alt="" />
                </Carousel>
              </Image>
              <ProfileCard>
                <h4>{restaurantData.name}</h4>
                <ul>
                  <li>Price: {restaurantData.price}</li>
                  <li>
                    Rating:
                    <div>
                      <StarRatingStyles>
                        <StarRatingComponent
                          name="rate1"
                          starCount={5}
                          value={restaurantData.rating}
                        />
                      </StarRatingStyles>
                    </div>
                  </li>
                  <li>Phone: {restaurantData.display_phone}</li>
                  <li>
                    Location: {restaurantData.location.address1},{" "}
                    {restaurantData.location.zip_code}{" "}
                    {restaurantData.location.city}
                  </li>
                  <li>
                    <span role="img" aria-label="finger pointing to the right">
                      👉
                    </span>
                    <a
                      href={restaurantData.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View More Details At Yelp.com
                    </a>
                  </li>
                </ul>
              </ProfileCard>
              <hr />
              <Separator>
                <ProfileCard>
                  <p>
                    You want the details for {restaurantData.name} Restaurant?
                    No worries, enter your phone number and we send everything
                    to you.
                  </p>
                  <Form onSubmit={this.handleSubmit}>
                    <FormErrorMessage>{this.state.error}</FormErrorMessage>
                    <InputBox>
                      <Input
                        id="numberInput"
                        padding="15px 56px"
                        borderColor={this.state.error ? "red" : null}
                        type="text"
                        name="userNumber"
                        placeholder="Your Phone Number"
                        value={this.state.userNumber}
                        onChange={this.handleChange}
                      />
                      <Label htmlFor="numberInput">+49</Label>
                    </InputBox>
                    <ButtonGradient
                      textColor="white"
                      onClick={() => this.setState({ isOpen: false })}
                    >
                      Send Details
                    </ButtonGradient>
                  </Form>
                </ProfileCard>
              </Separator>
            </CardContent>
          </Card>
        </CenterContent>
      </React.Fragment>
    );
  }
}

export default SwipecardOpen;
