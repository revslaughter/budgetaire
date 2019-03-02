import React from "react";
import "./App.css";
import AppStore from "./store";
import dispatcher from "./dispatcher";
import { Account } from "./utils";
import * as Actions from "./actions";
import GetData from "./data/getData";
import AccountTransaction from "./utils/transaction";
import AccountEntry from "./components/account/accountEntry";
import AccountRegister from "./components/account/accountRegister";
import VarianceDisplay from "./components/budget/varianceDisplay";
import ThreeColContainer from "./components/containers/gridContainer";

let theAppStore = new AppStore();
dispatcher.register(theAppStore.handleActions.bind(theAppStore));

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

const App = () => {
  let theAccount = theAppStore.accounts[0];
  let theLayout = [
    { i: "entry", x: 0, y: 0, w: 2, h: 1 },
    { i: "vardispPercent", x: 0, y: 1, w: 1, h: 1 },
    { i: "vardispDollar", x: 1, y: 1, w: 1, h: 1 },
    { i: "register", x: 0, y: 2, w: 3, h: 5 }
  ];
  return (
    <div>
      <div>
        <h1>{theAccount.name}</h1>
      </div>
      <ThreeColContainer layout={theLayout}>
        <AccountEntry
          key="entry"
          store={theAppStore}
          account={theAccount}
          name={theAccount.name}
        />
        <VarianceDisplay
          key="varDispPercent"
          store={theAppStore}
          account={theAccount}
        />
        <VarianceDisplay
          key="varDispDollar"
          store={theAppStore}
          account={theAccount}
          displayDollar
        />
        <div key="register" className="registerContainer">
          <AccountRegister
            store={theAppStore}
            account={theAccount}
            name={theAccount.name}
          />
        </div>
      </ThreeColContainer>
    </div>
  );
};

export default App;
