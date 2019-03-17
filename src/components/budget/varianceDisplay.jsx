import React from "react";
import styled from "styled-components";
import { Budget } from "../../utils";
import CenteredBox from "../containers/centeredBox";

const IndicatorDiv = styled(CenteredBox)`
  color: ${props =>
    props.budget.isOverBudget(props.actual) ? "forestgreen" : "firebrick"};
  background-color: ${props =>
    props.budget.isOverBudget(props.actual) ? "lightgreen" : "pink"};
`;

const VarianceDisplay = (
  props = { budget: Budget(), actual: 0, displayDollar: true }
) => {
  let displayPart = props.displayDollar
    ? props.budget.variance(props.actual).formatted()
    : props.budget
        .variancePercent(props.actual)
        .toLocaleString("en", { style: "percent" });

  const isOver = props.budget.isOverBudget(props.actual);
  const overUnderMsg = isOver ? "Over" : "Under";

  return (
    <IndicatorDiv budget={props.budget} actual={props.actual}>
      {displayPart} {overUnderMsg}
    </IndicatorDiv>
  );
};

export default VarianceDisplay;
