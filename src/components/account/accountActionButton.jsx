import React from "react";
import { Button } from "reactstrap";
import { transact } from "../../actions";
import { Account, Muny } from "../../utils";

const AccountActionButton = (
  props = {
    account: Account(),
    type: "credit",
    val: 0,
    color: "primary"
  }
) => {
  const handleClick = e => {
    transact({
      account: props.account,
      transaction: {
        date: new Date(),
        type: props.type,
        amount: new Muny(props.val)
      }
    });
  };

  const stopPropagation = e => {
    e.stopPropagation();
  };

  return (
    <Button
      color={props.color}
      onClick={handleClick}
      onMouseDown={stopPropagation}
    >
      {props.children}
    </Button>
  );
};

export default AccountActionButton;
