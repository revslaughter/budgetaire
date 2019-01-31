import React, { Component } from "react";
import AccountRegister from "./components/account/accountRegister";
import AccountStore from "./store/account";
import { AccountActions } from "./actions";
class App extends Component {
  constructor() {
    AccountActions.set({ date: new Date(), amount: 100 });
    AccountActions.debit({ date: new Date(), amount: 10 });
    AccountActions.debit({ date: new Date(), amount: 10 });
    AccountActions.credit({ date: new Date(), amount: 70 });
  }
  render() {
    return (
      <div className="App">
        <AccountRegister register={AccountStore.register} name="Test Account" />
      </div>
    );
  }
}

export default App;
