import React from "react";
import AppStore from "./store";
import dispatcher from "./dispatcher";
import { Account } from "./utils";
import * as Actions from "./actions";
import GetData from "./data/getData";
import AccountTransaction from "./utils/transaction";
import AccountEntry from "./components/account/accountEntry";
import AccountRegister from "./components/account/accountRegister";
import VarianceDisplay from "./components/budget/varianceDisplay";
import ThreeColContainer from "./components/containers/threeCol";
import AccountBalance from "./components/account/accountBalance";
import TargetDisplay from "./components/budget/targetDisplay";

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
    { i: "balance", x: 0, y: 0, w: 1, h: 1 },
    { i: "target", x: 1, y: 0, w: 1, h: 1 },
    { i: "entry", x: 2, y: 0, w: 1, h: 1 },
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
        <div key="balance">
          <AccountBalance balance={theAccount.balance} />
        </div>
        <div key="target">
          <TargetDisplay target={theAccount.budget.target} />
        </div>
        <div key="entry">
          <AccountEntry
            store={theAppStore}
            account={theAccount}
            name={theAccount.name}
            className="entryContainer"
          />
        </div>
        <div key="vardispPercent">
          <VarianceDisplay store={theAppStore} account={theAccount} />
        </div>
        <div key="vardispDollar">
          <VarianceDisplay
            store={theAppStore}
            account={theAccount}
            displayDollar
          />
        </div>
        <div key="register">
          <div className="registerContainer">
            <AccountRegister
              store={theAppStore}
              account={theAccount}
              name={theAccount.name}
            />
          </div>
        </div>
      </ThreeColContainer>
    </div>
  );
};

export default App;
