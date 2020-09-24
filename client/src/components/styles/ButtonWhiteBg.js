import styled from "styled-components";

const ButtonWhiteBg = styled.button`
  background-color: #fff;
  border: none;
  font-size: 2rem;
  color: #fff;
  padding: 0px 24px;
  height: 42px;
  border-radius: 4px;
  span {
    background-image: ${props => props.theme.gradient};
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  &:hover {
    background: ${props => props.theme.gradient};
    span {
      -webkit-text-fill-color: #fff;
    }
  }

  &:focus {
    outline: none;
  }
`;

export default ButtonWhiteBg;
