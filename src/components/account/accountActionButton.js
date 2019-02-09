import React from "react";
import { transact } from "../../actions";

const AccountActionButton = props => {
  return (
    <button
      onClick={e =>
        transact({
          account: props.account,
          transaction: {
            date: new Date(),
            type: props.type,
            amount: props.val
          }
        })
      }
    >
      {props.children}
    </button>
  );
};

export default AccountActionButton;
