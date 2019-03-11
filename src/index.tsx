import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

import * as serviceWorker from "./serviceWorker";

import "./App.scss";
import App from "./App";
import AppStore from "./store";

import * as Actions from "./actions";
import GetData from "./data/getData";
import { Account, Transaction } from "./utils";
import { LAYOUT } from "./utils/constants";

//register all accounts
let theData = GetData();

const addAccountFromData = (accountInfo: any) => {
  let acctTxns = accountInfo.history.map((t: any) => new Transaction(t));
  let acct: Account = new Account({
    history: acctTxns,
    target: accountInfo.target,
    name: accountInfo.name
  });
  Actions.makeNewAccount(acct);
};

addAccountFromData(theData[0]);

ReactDOM.render(
  <Provider store={AppStore}>
    <App layout={LAYOUT} />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
