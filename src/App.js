import React, { Component } from "react";
import AccountStore from "./store/account";
import { AccountActions } from "./actions";
import AccountRegister from "./components/account/accountRegister";
import AccountActionButton from "./components/account/accountActionButton";
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
    this.setState({ inputVal: parseInt(changeEvent.target.value) });
  }

  render() {
    return (
      <div className="App">
        <AccountRegister
          dateFormat={this.dateFormatOptions}
          account={AccountStore}
          name="Test Account"
        />
        <p>Balance: {AccountStore.balance()}</p>
        <p>
          <input
            width="150px"
            type="number"
            value={this.state.inputVal}
            onChange={event => this.amountCatcher(event)}
          />
        </p>
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
      </div>
    );
  }
}

export default App;
