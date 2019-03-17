import React from "react";
import CenteredBox from "../containers/centeredBox";
import { Account } from "../../utils";

const AccountBalance = (
  props = {
    account: Account()
  }
) => <CenteredBox>Balance: {props.account.balance.formatted}</CenteredBox>;

export default AccountBalance;
