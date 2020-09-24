import styled from "styled-components";

let buttonTransition = "all 0.4s ease";

const Input = styled.input`
  background: transparent;
  border: 2px solid ${props => props.borderColor || props.theme.backgroundGrey};
  border-radius: 50px;
  width: ${props => props.width || "300px"};
  padding: ${props => props.padding || "15px 20px"};
  outline: none;
  margin: 10px 0;
  transition: ${buttonTransition};

  ::placeholder {
    color: ${props => props.borderColor || props.theme.backgroundGrey};
    font-size: 1.5em;
    margin-top: 10px;
    font-weight: 500;
    transition: ${buttonTransition};
  }

  &:focus {
    outline: 0;
    border-color: ${props => props.borderColor || props.theme.secondaryColor};
    transition: ${buttonTransition};
    ::placeholder {
      color: ${props => props.borderColor || props.theme.secondaryColor};
      transition: ${buttonTransition};
    }
  }
`;

export default Input;
