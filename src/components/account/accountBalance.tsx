import React, { FunctionComponent } from "react";
interface balanceDisplayProps {
  balance: string;
}

const AccountBalance: FunctionComponent<balanceDisplayProps> = props => (
  <div>Balance: {props.balance}</div>
);

export default AccountBalance;
