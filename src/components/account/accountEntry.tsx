import React, { Component } from "react";
import AccountRegister from "./accountRegister";
import AccountActionButton from "./accountActionButton";
import AppStore from "../../store";
import { Account, Muny } from "../../utils";

interface AccountEntryProps {
  account: Account;
  name: string;
}

interface AccountEntryState {
  account: Account;
  balance: string;
  inputVal: number;
}

class AccountEntry extends Component<AccountEntryProps, AccountEntryState> {
  TRANSACTION_TYPES = ["debit", "credit", "set", "reset"];

  constructor(props: AccountEntryProps) {
    super(props);
    this.state = {
      account: this.props.account,
      balance: this.props.account.balance,
      inputVal: 0
    };
  }

  componentWillMount() {
    const setAccountState = () => {
      this.setState({
        account: this.props.account,
        balance: this.props.account.balance
      });
    };
    AppStore.on("transaction", setAccountState);
  }

  componentWillUnmount() {
    AppStore.removeAllListeners();
  }

  amountCatcher(changeEvent: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ inputVal: parseFloat(changeEvent.target.value) });
  }

  render() {
    return (
      <div className="App">
        <div>
          <AccountRegister
            account={this.props.account}
            name={this.props.name}
          />
        </div>
        <p>Balance: {this.state.balance}</p>
        <p>
          <input
            type="number"
            value={this.state.inputVal}
            onChange={event => this.amountCatcher(event)}
          />
        </p>
        <div>
          {this.TRANSACTION_TYPES.map(typeName => (
            <AccountActionButton
              key={typeName}
              val={this.state.inputVal}
              type={typeName}
              account={this.props.account}
            >
              {typeName}
            </AccountActionButton>
          ))}
        </div>
      </div>
    );
  }
}

export default AccountEntry;
