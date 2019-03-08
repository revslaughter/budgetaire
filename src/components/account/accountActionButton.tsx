import React from "react";
import { Button } from "reactstrap";
import { addTransaction } from "../../actions";
import { Account, Muny, Transaction } from "../../utils";

interface AccountActionButtonProps {
  account: Account;
  type: string;
  val?: number;
  children: string;
  color: string;
}

const AccountActionButton = (props: AccountActionButtonProps) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    addTransaction(
      props.account,
      new Transaction({
        date: new Date(),
        type: props.type,
        amount: new Muny(props.val)
      })
    );
  };

  return (
    <Button
      color={props.color}
      onClick={handleClick}
      onMouseDown={e => e.stopPropagation()}
    >
      {props.children}
    </Button>
  );
};

export default AccountActionButton;
