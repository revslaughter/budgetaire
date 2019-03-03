import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Budget, Account } from "../../utils";
import AppStore from "../../store";
import CenteredBox from "../containers/centeredBox";

interface VarDisplayProps {
  className?: string;
  account: Account;
  displayDollar?: boolean;
  store: AppStore;
}

interface VarDisplayState {
  budget: Budget;
  actual: number;
}

const IndicatorDiv = styled(CenteredBox)`
  color: ${(props: VarDisplayState) =>
    props.budget.isOverBudget(props.actual) ? "forestgreen" : "firebrick"};
  background-color: ${(props: any) =>
    props.budget.isOverBudget(props.actual) ? "lightgreen" : "pink"};
`;

const VarianceDisplay = (props: VarDisplayProps) => {
  const [state, setState] = useState<VarDisplayState>({
    budget: props.account.budget,
    actual: props.account._balance.amount
  });

  useEffect(() => {
    props.store.on("transaction", () =>
      setState({
        budget: props.account.budget,
        actual: props.account._balance.amount
      })
    );
  }, []);

  let displayPart: string = props.displayDollar
    ? state.budget.variance(state.actual).formatted()
    : state.budget
        .variancePercent(state.actual)
        .toLocaleString("en", { style: "percent" });

  const isOver = state.budget.isOverBudget(state.actual);
  const overUnderMsg = isOver ? "Over" : "Under";

  return (
    <IndicatorDiv budget={state.budget} actual={state.actual}>
      {displayPart} {overUnderMsg}
    </IndicatorDiv>
  );
};

export default VarianceDisplay;
