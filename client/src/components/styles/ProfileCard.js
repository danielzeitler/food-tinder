import styled from "styled-components";

const ProfileCard = styled.div`
  padding: 10px 16px;

  h4 {
    font-size: 1.1em;
    margin: 0;
    padding: 0;
    font-weight: 400;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
    color: ${props => props.theme.secondaryText};
    font-weight: 100;
    font-size: 0.6em;
  }
  li {
    margin: -3px 0;
    padding: 0;

    &:nth-child(2) {
      position: relative;
    }

    a {
      background-image: ${props => props.theme.gradient};
      background-clip: text;
      padding: 2px 0;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }

  p {
    margin: 0;
    padding: 0;
    color: ${props => props.theme.secondaryText};
    font-weight: 100;
    font-size: 0.6em;
    line-height: 1.5;
  }
`;

export default ProfileCard;
