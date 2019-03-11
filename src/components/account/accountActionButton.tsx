import React from "react";
import { connect } from "react-redux";
import { Button } from "reactstrap";
import { addTransaction, IAction } from "../../actions";
import { Account, Muny, Transaction } from "../../utils";

interface AccountActionButtonProps {
  account: Account;
  type: string;
  val?: number;
  children: string;
  color: string;
  handleClick: (account: Account, type: string, val?: number) => void;
}

const AccountActionButton = (props: AccountActionButtonProps) => {
  return (
    <Button
      color={props.color}
      onClick={() => {
        props.handleClick(props.account, props.type, props.val);
      }}
      onMouseDown={e => e.stopPropagation()}
    >
      {props.children}
    </Button>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  handleClick: (account: Account, type: string, val?: number) => {
    dispatch(
      addTransaction(
        account,
        new Transaction({
          date: new Date(),
          type: type,
          amount: new Muny(val)
        })
      )
    );
  }
});

export default connect(
  (state, ownProps) => {
    return {};
  },
  mapDispatchToProps
)(AccountActionButton);
