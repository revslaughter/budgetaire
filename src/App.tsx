import React, { useState, useEffect } from "react";
import AppStore from "./store";
import dispatcher from "./dispatcher";
import { Account } from "./utils";
import * as Actions from "./actions";
import GetData from "./data/getData";
import AccountTransaction from "./utils/transaction";
import * as Constants from "./utils/constants";
import AccountEntry from "./components/account/accountEntry";
import AccountRegister from "./components/account/accountRegister";
import VarianceDisplay from "./components/budget/varianceDisplay";
import ColContainer from "./components/containers/colContainer";
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
  const [state, updateState] = useState(theAppStore.accounts[0]);
  useEffect(() => {
    theAppStore.on("transaction", () => updateState(theAppStore.accounts[0]));
  }, []);

  return (
    <div id="App">
      <div className="header">
        <h1>{state.name}</h1>
      </div>
      <ColContainer
        rowHeight={Constants.ROW_HEIGHT}
        width={Constants.APP_WIDTH}
        cols={Constants.APP_COLS}
        layout={Constants.LAYOUT}
      >
        <div key="balance">
          <AccountBalance store={theAppStore} account={state} />
        </div>
        <div key="target">
          <TargetDisplay target={state.budget.target} />
        </div>
        <div key="entry">
          <AccountEntry
            store={theAppStore}
            account={state}
            name={state.name}
            className="entryContainer"
          />
        </div>
        <div key="vardispPercent">
          <VarianceDisplay store={theAppStore} account={state} />
        </div>
        <div key="vardispDollar">
          <VarianceDisplay store={theAppStore} account={state} displayDollar />
        </div>
        <div key="register">
          <div className="registerContainer">
            <AccountRegister
              store={theAppStore}
              account={state}
              name={state.name}
            />
          </div>
        </div>
      </ColContainer>
    </div>
  );
};

export default App;
