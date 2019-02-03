import React, { Component } from "react";
import AccountEntry from "./components/account/accountEntry";
class App extends Component {
  render() {
    return (
      <div>
        <p>
          <AccountEntry />
        </p>
        <p>
          <AccountEntry />
        </p>
      </div>
    );
  }
}

export default App;
