import React, { FunctionComponent } from "react";
import CenteredBox from "../containers/centeredBox";
interface balanceDisplayProps {
  balance: string;
}

const AccountBalance: FunctionComponent<balanceDisplayProps> = props => (
  <CenteredBox>Balance: {props.balance}</CenteredBox>
);

export default AccountBalance;
