import React, { FunctionComponent, useState, useEffect } from "react";
import CenteredBox from "../containers/centeredBox";
import { Account } from "../../utils";
interface balanceDisplayProps {
  account: Account;
}

const AccountBalance: FunctionComponent<balanceDisplayProps> = props => {
  const [state, setState] = useState({
    account: props.account,
    balance: props.account.balance,
    inputVal: 0
  });

  return <CenteredBox>Balance: {state.balance}</CenteredBox>;
};

export default AccountBalance;
