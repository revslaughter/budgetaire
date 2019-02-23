import React from "react";
import { Button } from "reactstrap";
import { transact } from "../../actions";
import { Account, Muny } from "../../utils";

interface AccountActionButtonProps {
  account: Account;
  type: string;
  val?: number;
  children: string;
  color: string;
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

  return (
    <Button color={props.color} onClick={handleClick}>
      {props.children}
    </Button>
  );
};

export default AccountActionButton;
