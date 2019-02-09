import { EventEmitter } from "events";
import dispatcher from "../dispatcher";

class AppStore extends EventEmitter {
  constructor(appInfo) {
    super();
    this.handleAppInfo(appInfo);
  }
  /**
   *
   * @param {{accounts: {type: string, amount: number, balance}[]}} accountHistories
   */
  handleAppInfo(accounts) {
    if (accounts) {
      this.accounts = accounts;
    } else {
      this.accounts = [];
    }
  }

  /**
   * Adds a new account to the store
   * @param {Account} account
   */
  newAccount(account) {
    this.accounts.push(account);
    this.emit("accountCreated");
  }

  /**
   * Update an account and emit update event
   * @param {Account} account
   * @param {{type: string, balance}} transaction
   */
  handleTransaction(account, transaction) {
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
  handleActions(action) {
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

let theAppStore = new AppStore();
dispatcher.register(theAppStore.handleActions.bind(theAppStore));

export default theAppStore;
