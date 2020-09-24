import styled from "styled-components";

const animateButton = keyframes`
  from { transform: scale(0); }
  to { transform: scale(1); }
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

  transform: scale(1);
  transition: all 0.1s ease;

  &:hover {
    transition: all 0.1s ease;
    transform: scale(1.1);
  }
`;

export default RoundButton;
