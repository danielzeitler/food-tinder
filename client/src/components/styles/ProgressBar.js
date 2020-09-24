import React from "react";
import styled from "styled-components";

const Track = styled.div`
  width: 100%;
  height: 10px;
  background-color: ${props => props.theme.backgroundGrey};
  border-radius: 50px;
  box-shadow: inset 0 0 5px #0000;
`;

const Thumb = styled.div`
  width: ${props => props.percentage}%;
  height: 100%;
  background-image: ${props => props.theme.gradient};
  border-radius: 8px;
`;

const ProgressBar = props => {
  return (
    <Track>
      <Thumb percentage={props.loaded} />
    </Track>
  );
};

export default ProgressBar;
