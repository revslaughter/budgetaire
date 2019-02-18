import React, { Component } from "react";
import AccountRegister from "./accountRegister";
import AccountActionButton from "./accountActionButton";
import AppStore from "../../store";
class AccountEntry extends Component {
  DATE_FORMAT_OPTIONS = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  };

  TRANSACTION_TYPES = ["debit", "credit", "set", "reset"];

  constructor(props) {
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

  amountCatcher(changeEvent) {
    this.setState({ inputVal: parseFloat(changeEvent.target.value) });
  }

  render() {
    return (
      <div className="App">
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
          <AccountRegister
            dateFormat={this.DATE_FORMAT_OPTIONS}
            account={this.props.account}
            name={this.props.name}
          />
        </div>
      </div>
    );
  }
}

export default AccountEntry;
