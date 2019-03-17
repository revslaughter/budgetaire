import React, { useState, useEffect } from "react";
import dispatcher from "./dispatcher";
import AppStore from "./store";

import { Account, Transaction, CONSTANTS } from "./utils";
import GetData from "./data/getData";

import AccountEntry from "./components/account/accountEntry";
import AccountRegister from "./components/account/accountRegister";
import VarianceDisplay from "./components/budget/varianceDisplay";
import ColContainer from "./components/containers/colContainer";
import AccountBalance from "./components/account/accountBalance";
import TargetDisplay from "./components/budget/targetDisplay";

//create initial
let theData = GetData();
let dataAccounts = theData.map(accountInfo => {
  let acctTxns = accountInfo.history.map(t => Transaction(t));
  return Account(acctTxns, accountInfo.target, accountInfo.name);
});
let theAppStore = AppStore(dataAccounts, dataAccounts[0]);

const App = () => {
  const [state, updateState] = useState(theAppStore);
  useEffect(() => {
    dispatcher.register(action =>
      updateState(theAppStore.handleAction(action))
    );
  }, []);

  return (
    <div id="App">
      <div className="header">
        <h1>{state.name}</h1>
      </div>
      <ColContainer
        rowHeight={CONSTANTS.ROW_HEIGHT}
        width={CONSTANTS.APP_WIDTH}
        cols={CONSTANTS.APP_COLS}
        layout={CONSTANTS.LAYOUT}
      >
        <div key="balance">
          <AccountBalance account={state.selectedAccount} />
        </div>
        <div key="target">
          <TargetDisplay target={state.selectedAccount.budget.target} />
        </div>
        <div key="entry">
          <AccountEntry
            account={state.selectedAccount}
            name={state.selectedAccount.name}
            action={state.handleAction}
            className="entryContainer"
          />
        </div>
        <div key="vardispPercent">
          <VarianceDisplay
            budget={state.selectedAccount.budget}
            actual={state.selectedAccount.balance}
          />
        </div>
        <div key="vardispDollar">
          <VarianceDisplay
            budget={state.selectedAccount.budget}
            actual={state.selectedAccount.balance}
            displayDollar
          />
        </div>
        <div key="register">
          <div className="registerContainer">
            <AccountRegister
              account={state.selectedAccount}
              name={state.selectedAccount.name}
            />
          </div>
        </div>
      </ColContainer>
    </div>
  );
};

export default App;
