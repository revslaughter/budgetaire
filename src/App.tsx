import React from "react";
import AccountEntry from "./components/account/accountEntry";
import AppStore from "./store";
import { Account } from "./utils";
import * as Actions from "./actions";
import GetData from "./data/getData";
import AccountTransaction from "./utils/transaction";

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
      return <AccountEntry account={a} name={a.name} key={a.name} />;
    })}
  </div>
);

export default App;
