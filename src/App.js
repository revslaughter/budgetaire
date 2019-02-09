import React, { Component } from "react";
import AccountEntry from "./components/account/accountEntry";
import { Account, Muny } from "./utils";
import AppStore from "./store";
import * as Actions from "./actions";

let oneAccount = new Account({
  target: 100,
  history: [
    {
      date: new Date(2018, 11, 11),
      type: "CREDIT",
      amount: new Muny(50),
      balance: new Muny(50)
    },
    {
      date: new Date(2019, 0, 1),
      type: "CREDIT",
      amount: new Muny(50),
      balance: new Muny(100)
    },
    {
      date: new Date(2019, 0, 15),
      type: "DEBIT",
      amount: new Muny(10),
      balance: new Muny(90)
    }
  ]
});

Actions.newAccount(oneAccount);

let twoAccount = new Account({
  target: 200,
  history: [
    {
      date: new Date(2017, 10, 1),
      type: "CREDIT",
      amount: new Muny(150),
      balance: new Muny(150)
    },
    {
      date: new Date(2018, 1, 1),
      type: "CREDIT",
      amount: new Muny(50),
      balance: new Muny(200)
    },
    {
      date: new Date(2018, 1, 15),
      type: "DEBIT",
      amount: new Muny(10),
      balance: new Muny(190)
    }
  ]
});

Actions.newAccount(twoAccount);
class App extends Component {
  render() {
    return (
      <div>
        <div>
          <AccountEntry account={AppStore.accounts[0]} />
        </div>
        <div>
          <AccountEntry account={AppStore.accounts[1]} />
        </div>
      </div>
    );
  }
}

export default App;
