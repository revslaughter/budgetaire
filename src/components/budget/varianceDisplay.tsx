import React, { useState, useEffect } from "react";
import { Card } from "reactstrap";
import { Budget, Account } from "../../utils";
import AppStore from "../../store";
import CardHeader from "reactstrap/lib/CardHeader";

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

  const overUnderStyle = isOver
    ? { backgroundColor: "lightgreen", color: "forestgreen" }
    : { backgroundColor: "pink", color: "firebrick" };

  return (
    <div className={props.className}>
      <Card style={overUnderStyle}>
        <CardHeader>{displayPart}</CardHeader>
      </Card>
    </div>
  );
};

export default VarianceDisplay;
