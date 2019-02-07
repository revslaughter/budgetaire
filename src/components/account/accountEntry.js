import React, { Component } from "react";
import AppStore from "../../store";
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
      account: this.props.account,
      balance: this.props.account.balance(),
      inputVal: 0
    };
  }

  componentWillMount() {
    const setAccountState = () => {
      this.setState({
        account: this.props.account,
        balance: this.props.account.balance()
      });
    };
    AppStore.on("transaction", setAccountState);
  }

  componentWillUnmount() {
    AppStore.removeAllListeners();
  }

  amountCatcher(changeEvent) {
    this.setState({ inputVal: parseFloat(changeEvent.target.value) });
  }

  render() {
    return (
      <div className="App">
        <p>Balance: {this.state.account.balance()}</p>
        <p>
          <input
            type="number"
            value={this.state.inputVal}
            onChange={event => this.amountCatcher(event)}
          />
        </p>
        <p>
          {this.TRANSACTION_TYPES.map(t => (
            <AccountActionButton val={this.state.inputVal} type={t} />
          ))}
          <AccountRegister
            dateFormat={this.DATE_FORMAT_OPTIONS}
            account={this.state.account}
            name={this.props.name}
          />
        </p>
      </div>
    );
  }
}

export default AccountEntry;
