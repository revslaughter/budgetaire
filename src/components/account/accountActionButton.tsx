import React from "react";
import { transact } from "../../actions";
import { Account, Muny } from "../../utils";

interface AccountActionButtonProps {
  account: Account;
  type: string;
  val: Muny;
  children: JSX.Element[];
}

const AccountActionButton = (props: AccountActionButtonProps) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    transact({
      account: props.account,
      transaction: {
        date: new Date(),
        type: props.type,
        amount: props.val
      }
    });
  };

  return <button onClick={handleClick}>{props.children}</button>;
};

export default AccountActionButton;
