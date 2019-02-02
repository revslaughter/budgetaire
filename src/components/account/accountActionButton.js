import React from "react";

const AccountActionButton = props => {
  return (
    <button
      onClick={e => props.action({ date: new Date(), amount: props.val })}
    >
      {props.label}
    </button>
  );
};

export default AccountActionButton;
