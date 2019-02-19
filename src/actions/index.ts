import dispatcher from "../dispatcher";
import { Account, AccountTransaction } from "../utils";

const transact = (acctAndTxn: {
  account: Account;
  transaction: AccountTransaction;
}) => {
  dispatcher.dispatch({
    account: acctAndTxn.account,
    transaction: acctAndTxn.transaction,
    name: "TRANSACTION"
  });
};

const newAccount = (account: Account) => {
  dispatcher.dispatch({
    account,
    name: "NEW_ACCOUNT"
  });
};

export { transact, newAccount };
