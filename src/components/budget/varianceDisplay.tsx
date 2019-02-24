import React, { useState, useEffect } from "react";
import { Card } from "reactstrap";
import { Budget } from "../../utils";
import AppStore from "../../store";
import styled from "styled-components";
import CardHeader from "reactstrap/lib/CardHeader";

interface VarDisplayProps {
  className?: string;
  budget: Budget;
  actual: number;
  displayDollar?: boolean;
}

interface VarDisplayState {
  budget: Budget;
  actual: number;
}

const VarianceDisplay = (props: VarDisplayProps) => {
  const [state, setState] = useState<VarDisplayState>({
    budget: props.budget,
    actual: props.actual
  });

  useEffect(() => {
    AppStore.on("transaction", () =>
      setState({
        budget: props.budget,
        actual: props.actual
      })
    );
    return () => {
      AppStore.removeAllListeners();
    };
  });

  let displayPart: string = props.displayDollar
    ? state.budget.variance(state.actual).formatted()
    : state.budget
        .variancePercent(state.actual)
        .toLocaleString("en", { style: "percent" });

  const isOver = state.budget.isOverBudget(state.actual);

  return (
    <div className={props.className}>
      <Card
        className={isOver ? "overBudget" : "underBudget"}
        style={{ backgroundColor: isOver ? "lightgreen" : "pink" }}
      >
        <CardHeader>{displayPart}</CardHeader>
      </Card>
    </div>
  );
};

export default styled(VarianceDisplay)`
  .overBudget {
    color: forestgreen;
  }
  .underBudget {
    color: firebrick;
  }
`;
