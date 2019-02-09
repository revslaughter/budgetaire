import React, { Component } from "react";
import AccountRegister from "./accountRegister";
import AccountActionButton from "./accountActionButton";
class AccountEntry extends Component {
  DATE_FORMAT_OPTIONS = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  };

  TRANSACTION_TYPES = ["debit", "credit", "set", "reset"];

  constructor() {
    super();
    this.state = {
      balance: this.props.account.balance(),
      inputVal: 0
    };
  }

  amountCatcher(changeEvent) {
    this.setState({ inputVal: parseFloat(changeEvent.target.value) });
  }

  render() {
    return (
      <div className="App">
        <p>Balance: {this.props.account.balance()}</p>
        <p>
          <input
            type="number"
            value={this.state.inputVal}
            onChange={event => this.amountCatcher(event)}
          />
        </p>
        <p>
          {this.TRANSACTION_TYPES.map(t => (
            <AccountActionButton
              val={this.state.inputVal}
              type={t}
              account={this.props.account}
            />
          ))}
          <AccountRegister
            dateFormat={this.DATE_FORMAT_OPTIONS}
            account={this.props.account}
            name={this.props.name}
          />
        </p>
      </div>
    );
  }
}

export default AccountEntry;
