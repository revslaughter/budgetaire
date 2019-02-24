import React, { useState, useEffect } from "react";
import { ButtonGroup } from "reactstrap";
import styled from "styled-components";
import AccountActionButton from "./accountActionButton";
import AppStore from "../../store";
import { Account } from "../../utils";

interface AccountEntryProps {
  account: Account;
  name: string;
  className?: string;
  store: AppStore;
}

interface AccountEntryState {
  account: Account;
  balance?: string;
  inputVal?: number;
}

const AccountEntry = (props: AccountEntryProps) => {
  const TRANSACTION_TYPES = [
    { action: "debit", color: "primary" },
    { action: "credit", color: "success" },
    { action: "set", color: "warning" },
    { action: "reset", color: "danger" }
  ];

  const [state, setState] = useState<AccountEntryState>({
    account: props.account,
    balance: props.account.balance,
    inputVal: 0
  });

  useEffect(() => {
    props.store.on("transaction", () =>
      setState({
        account: props.account,
        balance: props.account.balance,
        inputVal: 0
      })
    );
  }, []);

  const amountCatcher = (value: string) => {
    setState({
      account: state.account,
      balance: state.balance,
      inputVal: parseFloat(value)
    });
  };

  return (
    <div className={props.className}>
      <div>Balance: {state.balance}</div>
      <div>Budget Target: {state.account.target.formatted()}</div>
      <div>
        <input
          type="number"
          value={state.inputVal}
          onChange={event => amountCatcher(event.target.value)}
        />
        <ButtonGroup>
          {TRANSACTION_TYPES.map(txType => (
            <AccountActionButton
              key={txType.action}
              val={state.inputVal}
              type={txType.action}
              account={props.account}
              color={txType.color}
            >
              {txType.action}
            </AccountActionButton>
          ))}
        </ButtonGroup>
      </div>
    </div>
  );
};

export default styled(AccountEntry)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 5rem;
  margin: 1rem;
`;
