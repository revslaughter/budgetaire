import React, { useState, useEffect } from "react";
import { Account } from "./utils";
import * as Actions from "./actions";
import GetData from "./data/getData";
import Transaction from "./utils/transaction";
import * as Constants from "./utils/constants";
import AccountEntry from "./components/account/accountEntry";
import AccountRegister from "./components/account/accountRegister";
import VarianceDisplay from "./components/budget/varianceDisplay";
import ColContainer from "./components/containers/colContainer";
import AccountBalance from "./components/account/accountBalance";
import TargetDisplay from "./components/budget/targetDisplay";

//register all accounts
let theData = GetData();

theData.forEach(accountInfo => {
  let acctTxns = accountInfo.history.map(t => new Transaction(t));
  let acct: Account = new Account({
    history: acctTxns,
    target: accountInfo.target,
    name: accountInfo.name
  });
  Actions.makeNewAccount(acct);
});

const App = (account: Account, layout: ReactGridLayout.Layout) => {
  return (
    <div id="App">
      <div className="header">
        <h1>{account.name}</h1>
      </div>
      <ColContainer
        rowHeight={Constants.ROW_HEIGHT}
        width={Constants.APP_WIDTH}
        cols={Constants.APP_COLS}
        layout={Constants.LAYOUT}
      >
        <div key="balance">
          <AccountBalance account={account} />
        </div>
        <div key="target">
          <TargetDisplay target={account.budget.target} />
        </div>
        <div key="entry">
          <AccountEntry
            account={account}
            name={account.name}
            className="entryContainer"
          />
        </div>
        <div key="vardispPercent">
          <VarianceDisplay account={account} />
        </div>
        <div key="vardispDollar">
          <VarianceDisplay account={account} displayDollar />
        </div>
        <div key="register">
          <div className="registerContainer">
            <AccountRegister account={account} name={account.name} />
          </div>
        </div>
      </ColContainer>
    </div>
  );
};

export default App;
