import dispatcher from "../dispatcher";
import { Account, Transaction } from "../utils";

const transact = (
  acctAndTxn = {
    account: Account(),
    transaction: Transaction()
  }
) => {
  dispatcher.dispatch({
    account: acctAndTxn.account,
    transaction: acctAndTxn.transaction,
    name: "TRANSACTION"
  });
};

const newAccount = (account = Account()) => {
  dispatcher.dispatch({
    account,
    name: "NEW_ACCOUNT"
  });
};

export { transact, newAccount };
