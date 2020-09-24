import styled from "styled-components";

const FlexContainer = styled.div`
  display: flex;
  width: ${props => props.width || null};
`;

export default FlexContainer;
