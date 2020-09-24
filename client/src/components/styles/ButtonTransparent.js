import styled from "styled-components";

const ButtonTransparent = styled.button`
  background-color: transparent;
  border: none;
  font-size: 2rem;
  color: #fff;
  padding: ${props => props.padding || null};
  height: ${props => props.height || null};
  border-radius: 4px;
  opacity: ${props => props.opacity || 0.5};
  cursor: pointer;
  transform: scale(1);
  transition: all 0.3s ease;

  &:hover {
    transition: all 0.3s ease;
    opacity: ${props => props.hoverOpacity || 1};
    transform: scale(${props => props.hoverScale || 1});
  }

  &:focus {
    outline: none;
  }

  img {
    width: 26px;
    height: 26px;
    margin-top: 1px;
  }
`;

export default ButtonTransparent;
