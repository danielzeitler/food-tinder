import React from "react";
import styled from "styled-components";
import { Carousel } from "react-responsive-carousel";

const Image = styled.div`
  width: 100%;
  background: url(${props => props.img}) center center no-repeat;
  background-size: cover;
  overflow-y: scroll;
`;

const CarouselSlider = props => {
  return (
    <Image>
      <Carousel showThumbs={false} showArrows={false} showStatus={false}>
        <img src={props.restaurant[0]} alt="" />
        <img src={props.restaurant[1]} alt="" />
        <img src={props.restaurant[2]} alt="" />
      </Carousel>
    </Image>
  );
};

export default CarouselSlider;
