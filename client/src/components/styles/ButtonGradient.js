import styled from "styled-components";

const ButtonGradient = styled.button`
  border: none;
  cursor: pointer;
  margin: ${props => props.margin || 0};
  box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.27);
  font-size: 1.5rem;
  text-transform: uppercase;
  border-radius: 100px;
  width: ${props => props.width || "260px"};
  height: ${props => props.height || "50px"};
  color: ${props => props.textColor || props.theme.white};
  background-image: linear-gradient(
    to right,
    #fd267d,
    #ff7854,
    #ff7854,
    #fd267d
  );

  background-size: 300% 100%;
  -o-transition: all 0.4s ease-in-out;
  -webkit-transition: all 0.4s ease-in-out;
  transition: all 0.4s ease-in-out;

  &:hover {
    background-position: 100% 0;
    -o-transition: all 0.4s ease-in-out;
    -webkit-transition: all 0.4s ease-in-out;
    transition: all 0.4s ease-in-out;
  }

  &:focus {
    outline: none;
  }
`;

export default ButtonGradient;
