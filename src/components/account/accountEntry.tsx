import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { ButtonGroup } from "reactstrap";
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

const TwoRowGridBox = styled.div`
  display: grid;
  padding: 0.5rem;
`;

const DivBlock = styled.div`
  width: 100%;
  display: block;
`;

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
    <TwoRowGridBox className={props.className}>
      <DivBlock>
        <input
          type="number"
          className={props.className}
          value={state.inputVal}
          onChange={event => amountCatcher(event.target.value)}
        />
      </DivBlock>
      <DivBlock>
        <ButtonGroup className={props.className}>
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
      </DivBlock>
    </TwoRowGridBox>
  );
};

export default AccountEntry;
