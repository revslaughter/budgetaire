import React from "react";
import { transact } from "../../actions";
import { Account, Muny } from "../../utils";

interface AccountActionButtonProps {
  account: Account;
  type: string;
  val?: number;
  children: string;
}

const AccountActionButton = (props: AccountActionButtonProps) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    transact({
      account: props.account,
      transaction: {
        date: new Date(),
        type: props.type,
        amount: new Muny(props.val)
      }
    });
  };

  return <button onClick={handleClick}>{props.children}</button>;
};

export default AccountActionButton;
