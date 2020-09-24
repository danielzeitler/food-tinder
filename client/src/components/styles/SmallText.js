import styled from "styled-components";

const SmallText = styled.p`
  color: ${props => props.color || props.theme.baseColor};
  font-size: 1.4rem;
  line-height: 1.3125;
  margin: ${props => props.margin || null};
  span {
    color: ${props => props.theme.secondaryColor};
    text-decoration: underline;
    cursor: pointer;

    &:hover {
      text-decoration: none;
    }
  }
`;

export default SmallText;
