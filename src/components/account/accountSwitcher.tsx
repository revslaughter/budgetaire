import React from "react";
import { Account } from "../../utils";
import Input from "reactstrap/lib/Input";

const AccountSwitcher = (props: {
  accounts: Account[];
  selected: Account;
  onSelect: () => void;
}) => {
  return (
    <Input onChange={props.onSelect} type="select">
      {props.accounts.map((a, i) => {
        <option key={`${a.name}-${i}`}>a.name</option>;
      })}
    </Input>
  );
};

export default AccountSwitcher;
