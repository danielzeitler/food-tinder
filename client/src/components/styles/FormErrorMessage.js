import styled from "styled-components";

const FormErrorMessage = styled.p`
  margin: 0;
  padding: 0;
  font-size: 1.4rem;
  color: ${props => props.theme.red} !important;
`;

export default FormErrorMessage;
