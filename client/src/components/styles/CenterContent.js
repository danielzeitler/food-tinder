import styled from "styled-components";

const CenterContent = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-width: 324px;
  border-left: 1px solid #e5e8ec;
  position: relative;

  @media (max-width: 650px) {
    margin: 0 auto;
  }
`;

export default CenterContent;
