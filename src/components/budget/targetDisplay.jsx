import React from "react";
import CenteredBox from "../containers/centeredBox";

const TargetDisplay = props => (
  <CenteredBox>Budget: {props.target.formatted()}</CenteredBox>
);

export default TargetDisplay;
