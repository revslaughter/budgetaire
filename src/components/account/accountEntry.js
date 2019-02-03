import React, { Component } from "react";
import AccountStore from "../../store/account";
import { AccountActions } from "../../actions";
import AccountRegister from "./accountRegister";
import AccountActionButton from "./accountActionButton";
class App extends Component {
  dateFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  };

  constructor() {
    super();
    this.state = { balance: AccountStore.balance(), inputVal: 0 };
  }

  componentWillMount() {
    const setAccountState = () => {
      this.setState({
        balance: AccountStore.balance()
      });
    };
    AccountStore.on("set", setAccountState);
    AccountStore.on("credit", setAccountState);
    AccountStore.on("reset", setAccountState);
    AccountStore.on("debit", setAccountState);
  }

  componentWillUnmount() {
    AccountStore.removeAllListeners();
  }

  amountCatcher(changeEvent) {
    this.setState({ inputVal: parseFloat(changeEvent.target.value) });
  }

  render() {
    return (
      <div className="App">
        <p>Balance: {AccountStore.balance()}</p>
        <p>
          <input
            type="number"
            value={this.state.inputVal}
            onChange={event => this.amountCatcher(event)}
          />
        </p>
        <p>
          <AccountActionButton
            val={this.state.inputVal}
            action={AccountActions.credit}
            label="credit"
          />
          <AccountActionButton
            val={this.state.inputVal}
            action={AccountActions.debit}
            label="debit"
          />
          <AccountActionButton
            val={this.state.inputVal}
            action={AccountActions.set}
            label="set"
          />
          <AccountActionButton
            val={this.state.inputVal}
            action={AccountActions.reset}
            label="reset"
          />
          <AccountRegister
            dateFormat={this.dateFormatOptions}
            account={AccountStore}
            name="Test Account"
          />
        </p>
      </div>
    );
  }
}

export default App;
