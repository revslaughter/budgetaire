import React, { useState } from "react";
import { ButtonGroup } from "reactstrap";
import { TwoRowGridBox, DivBlock } from "../containers/misc";
import AccountActionButton from "./accountActionButton";
import { Account } from "../../utils";

const AccountEntry = (props = { account: Account() }) => {
  const TRANSACTION_TYPES = [
    { action: "debit", color: "primary" },
    { action: "credit", color: "success" },
    { action: "set", color: "warning" },
    { action: "reset", color: "danger" }
  ];

  const [state, setState] = useState({
    inputVal: 0
  });

  const amountCatcher = value => {
    setState({
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
