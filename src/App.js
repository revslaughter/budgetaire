import React, { Component } from "react";
import AccountEntry from "./components/account/accountEntry";
import AppStore from "./store";
import { Account } from "./utils";
import * as Actions from "./actions";
import GetData from "./data/getData";

//register all accounts
GetData().forEach(account => {
  Actions.newAccount(new Account(account));
});

class App extends Component {
  render() {
    return (
      <div>
        {AppStore.accounts.map(a => {
          return <AccountEntry account={a} name={a.name} key={a.name} />;
        })}
      </div>
    );
  }
}

export default App;
