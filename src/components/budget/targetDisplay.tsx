import React, { FunctionComponent } from "react";
import { Muny } from "../../utils";
import CenteredBox from "../containers/centeredBox";

interface TargetDisplayProps {
  target: Muny;
}

const TargetDisplay: FunctionComponent<TargetDisplayProps> = props => (
  <CenteredBox>Budget: {props.target.formatted()}</CenteredBox>
);

export default TargetDisplay;
