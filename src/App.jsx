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
import { accountBag } from "./store/accountBag";

//create initial
let theData = GetData();
let dataAccounts;
if (theData.length > 1) {
  dataAccounts = theData
    .map((accountInfo, index) => {
      let acctTxns = accountInfo.history.map(txn => Transaction(txn));
      return Account(
        acctTxns,
        accountInfo.target,
        accountInfo.name,
        `${index}`
      );
    })
    .reduce((b, a, ix) => {
      if (ix === 1) {
        b = accountBag(b);
      }
      return accountBag(a, b);
    });
} else {
  let data = theData[0];
  let register = data.history.map(txn => Transaction(txn));
  dataAccounts = accountBag(Account(register, data.target, data.name, "0"));
}
let theAppStore = AppStore(dataAccounts, dataAccounts["0"]);

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
        <h1>{state.selectedAccount.name}</h1>
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
