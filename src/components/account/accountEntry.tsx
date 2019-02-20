import React, { useState, useEffect } from "react";
import AccountRegister from "./accountRegister";
import AccountActionButton from "./accountActionButton";
import AppStore from "../../store";
import { Account } from "../../utils";

interface AccountEntryProps {
  account: Account;
  name: string;
}

interface AccountEntryState {
  account?: Account;
  balance?: string;
  inputVal?: number;
}

const AccountEntry = (props: AccountEntryProps) => {
  const TRANSACTION_TYPES = ["debit", "credit", "set", "reset"];

  const [state, setState] = useState<AccountEntryState>({
    account: props.account,
    balance: props.account.balance,
    inputVal: 0
  });

  useEffect(() => {
    AppStore.on("transaction", () =>
      setState({
        account: props.account,
        balance: props.account.balance,
        inputVal: 0
      })
    );
    return () => {
      AppStore.removeAllListeners();
    };
  });

  const amountCatcher = (changeEvent: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      account: state.account,
      balance: state.balance,
      inputVal: parseFloat(changeEvent.target.value)
    });
  };

  return (
    <div className="App">
      <div>
        <AccountRegister account={props.account} name={props.name} />
      </div>
      <p>Balance: {state.balance}</p>
      <p>
        <input
          type="number"
          value={state.inputVal}
          onChange={event => amountCatcher(event)}
        />
      </p>
      <div>
        {TRANSACTION_TYPES.map(typeName => (
          <AccountActionButton
            key={typeName}
            val={state.inputVal}
            type={typeName}
            account={props.account}
          >
            {typeName}
          </AccountActionButton>
        ))}
      </div>
    </div>
  );
};

export default AccountEntry;
