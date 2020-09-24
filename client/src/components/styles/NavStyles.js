import styled from "styled-components";

const NavStyles = styled.ul`
  margin: 0;
  padding: 25px 50px;
  font-size: 2rem;
  display: flex;
  background: transparent;
  justify-content: space-between;
  a {
    z-index: 999;
    padding: 0 20px;
    position: relative;
    cursor: pointer;
    color: white;
    &:after {
      height: 2px;
      background: ${props => props.theme.gradient};
      content: "";
      width: 0;
      position: absolute;
      transform: translateX(-50%);
      transition: width 0.4s;
      transition-timing-function: cubic-bezier(1, -0.65, 0, 2.31);
      left: 50%;
      margin-top: 3.3rem;
    }
    &:hover,
    &:focus {
      outline: none;
      &:after {
        width: calc(100% - 40px);
      }
    }
  }
`;

export default NavStyles;
