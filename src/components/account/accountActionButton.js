import React from "react";
import { transact } from "../../actions";

const AccountActionButton = props => {
  return (
    <button
      onClick={e =>
        transact(props.account, {
          date: new Date(),
          type: props.type,
          amount: props.val
        })
      }
    >
      {props.type}
    </button>
  );
};

export default AccountActionButton;
