import React from "react";
import { connect } from "react-redux";
import { Account } from "./utils";
import * as Constants from "./utils/constants";
import AccountEntry from "./components/account/accountEntry";
import AccountRegister from "./components/account/accountRegister";
import VarianceDisplay from "./components/budget/varianceDisplay";
import ColContainer from "./components/containers/colContainer";
import AccountBalance from "./components/account/accountBalance";
import TargetDisplay from "./components/budget/targetDisplay";
import { AppState } from "./reducers";

const App = (props: { layout: ReactGridLayout.Layout[]; account: Account }) => {
  return (
    <div id="App">
      <div className="header">
        <h1>{props.account.name}</h1>
      </div>
      <ColContainer
        rowHeight={Constants.ROW_HEIGHT}
        width={Constants.APP_WIDTH}
        cols={Constants.APP_COLS}
        layout={props.layout}
      >
        <div key="balance">
          <AccountBalance account={props.account} />
        </div>
        <div key="target">
          <TargetDisplay target={props.account.budget.target} />
        </div>
        <div key="entry">
          <AccountEntry
            account={props.account}
            name={props.account.name}
            className="entryContainer"
          />
        </div>
        <div key="vardispPercent">
          <VarianceDisplay account={props.account} />
        </div>
        <div key="vardispDollar">
          <VarianceDisplay account={props.account} displayDollar />
        </div>
        <div key="register">
          <div className="registerContainer">
            <AccountRegister
              account={props.account}
              name={props.account.name}
            />
          </div>
        </div>
      </ColContainer>
    </div>
  );
};

const mapStateToProps = (state: AppState) => {
  return { account: state.selectedAccount };
};

export default connect(mapStateToProps)(App);
