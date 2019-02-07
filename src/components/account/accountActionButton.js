import React from "react";

const AccountActionButton = props => {
  return (
    <button
      onClick={e =>
        props.action({ date: new Date(), type: props.type, amount: props.val })
      }
    >
      {props.type}
    </button>
  );
};

export default AccountActionButton;
