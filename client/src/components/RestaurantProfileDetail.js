import React from "react";
import styled from "styled-components";
import StarRatingComponent from "react-star-rating-component";
import ProfileCard from "./styles/ProfileCard";

const StarRatingStyles = styled.div`
  display: inline;
  position: absolute;
  top: 0px;
  left: 52px;
`;

const RestaurantProfileDetail = props => {
  return (
    <ProfileCard>
      <h4>{props.restaurant.name}</h4>
      <ul>
        <li>Price: {props.restaurant.price}</li>
        <li>
          Rating:
          <div>
            <StarRatingStyles>
              <StarRatingComponent
                name="rate1"
                starCount={5}
                value={props.restaurant.rating}
              />
            </StarRatingStyles>
          </div>
        </li>
        <li>Phone: {props.restaurant.display_phone}</li>
        <li>
          Location: {props.restaurant.location.address1},{" "}
          {props.restaurant.location.zip_code} {props.restaurant.location.city}
        </li>
        <li>
          <span role="img" aria-label="finger pointing to the right">
            👉
          </span>
          <a
            href={props.restaurant.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            View More Details At Yelp.com
          </a>
        </li>
      </ul>
    </ProfileCard>
  );
};

export default RestaurantProfileDetail;
