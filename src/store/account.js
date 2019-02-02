import { Muny } from "../utils";
import { EventEmitter } from "events";
import dispatcher from "../dispatcher";

class Account extends EventEmitter {
  constructor(history) {
    super();
    this._balance = new Muny();
    if (history && Array.isArray(history)) {
      this.register = history;
    } else {
      this.register = [];
    }
  }

  set(transaction) {
    this._balance = new Muny(transaction.amount);
    this.register.push({
      ...transaction,
      type: "SET",
      amount: new Muny(transaction.amount)
    });
    this.emit("set");
  }
  credit(transaction) {
    this.register.push({
      ...transaction,
      type: "CREDIT",
      amount: new Muny(transaction.amount)
    });
    this._balance.add(transaction.amount);
    this.emit("credit");
  }
  debit(transaction) {
    this.register.push({
      ...transaction,
      type: "DEBIT",
      amount: new Muny(transaction.amount)
    });
    this._balance.subtract(transaction.amount);
    this.emit("debit");
  }

  reset() {
    this._balance = new Muny();
    this.register = [];
    this.emit("reset");
  }
  balance() {
    return this._balance.formatted();
  }
  handleActions(action) {
    switch (action.name) {
      case "RESET":
        this.reset();
        break;
      case "CREDIT":
        this.credit(action.transaction);
        break;
      case "DEBIT":
        this.debit(action.transaction);
        break;
      case "SET":
        this.set(action.transaction);
        break;
      default:
        break;
    }
  }
}

let theAccountStore = new Account();
dispatcher.register(theAccountStore.handleActions.bind(theAccountStore));
export default theAccountStore;
