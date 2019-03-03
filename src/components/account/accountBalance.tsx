import React, { FunctionComponent, useState, useEffect } from "react";
import CenteredBox from "../containers/centeredBox";
import { Account } from "../../utils";
import AppStore from "../../store";
interface balanceDisplayProps {
  account: Account;
  store: AppStore;
}

const AccountBalance: FunctionComponent<balanceDisplayProps> = props => {
  const [state, setState] = useState({
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
  return <CenteredBox>Balance: {state.balance}</CenteredBox>;
};

export default AccountBalance;
