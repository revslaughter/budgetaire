import React, { FunctionComponent } from "react";
import { Muny } from "../../utils";

interface TargetDisplayProps {
  target: Muny;
}

const TargetDisplay: FunctionComponent<TargetDisplayProps> = props => (
  <div>Budget Target: {props.target.formatted()}</div>
);

export default TargetDisplay;
