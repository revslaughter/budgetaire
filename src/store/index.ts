import { EventEmitter } from "events";
import dispatcher from "../dispatcher";
import { Account } from "../utils";
import AccountTransaction from "../utils/transaction";

class AppStore extends EventEmitter {
  accounts: Account[];
  constructor(accounts = new Array<Account>()) {
    super();
    this.accounts = accounts;
  }

  /**
   * Adds a new account to the store
   */
  newAccount(account: Account) {
    this.accounts.push(account);
    this.emit("accountCreated");
  }

  /**
   * Update an account and emit update event
   * @param {Account} account
   * @param {{type: string, balance}} transaction
   */
  handleTransaction(account: Account, transaction: AccountTransaction) {
    switch (transaction.type.toLowerCase()) {
      case "reset":
        account.reset();
        break;
      case "credit":
        account.credit(transaction);
        break;
      case "debit":
        account.debit(transaction);
        break;
      case "set":
        account.set(transaction);
        break;
      default:
        throw new Error("No transaction type or type not recognized");
    }
    this.emit("transaction");
  }
  handleActions(action: {
    name: string;
    account: Account;
    transaction: AccountTransaction;
  }) {
    switch (action.name) {
      case "TRANSACTION":
        this.handleTransaction(action.account, action.transaction);
        break;
      case "NEW_ACCOUNT":
        this.newAccount(action.account);
        break;
      default:
        break;
    }
  }
}

export default AppStore;
