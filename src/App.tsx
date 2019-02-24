import React from "react";
import "./App.css";
import AppStore from "./store";
import { Account } from "./utils";
import * as Actions from "./actions";
import GetData from "./data/getData";
import AccountTransaction from "./utils/transaction";
import AccountEntry from "./components/account/accountEntry";
import AccountRegister from "./components/account/accountRegister";
import VarianceDisplay from "./components/budget/varianceDisplay";

//register all accounts
let theData = GetData();

theData.forEach(accountInfo => {
  let acctTxns = accountInfo.history.map(t => new AccountTransaction(t));
  let acct: Account = new Account({
    history: acctTxns,
    target: accountInfo.target,
    name: accountInfo.name
  });
  Actions.newAccount(acct);
});

const App = () => (
  <div className="container">
    {AppStore.accounts.map(a => {
      return (
        <div key={a.name}>
          <div>
            <h1>{a.name}</h1>
          </div>
          <div>
            <AccountEntry account={a} name={a.name} />
            <VarianceDisplay budget={a.budget} actual={a._balance.amount} />
            <VarianceDisplay
              budget={a.budget}
              actual={a._balance.amount}
              displayDollar
            />
            <div className="registerContainer">
              <AccountRegister account={a} name={a.name} />
            </div>
          </div>
        </div>
      );
    })}
  </div>
);

export default App;
