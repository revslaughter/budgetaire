import { Muny } from "../utils";
import { EventEmitter } from "events";
import dispatcher from "../dispatcher";

class Account extends EventEmitter {
  constructor(initialAmount) {
    super();
    if (initialAmount === undefined || initialAmount === null)
      initialAmount = 0;
    this._balance = new Muny(initialAmount);
  }

  credit(amount) {
    this._balance.add(amount);
    this.emit("credit");
  }
  debit(amount) {
    this._balance.subtract(amount);
    this.emit("debit");
  }
  reset() {
    this._balance = new Muny(0);
    this.emit("reset");
  }
  amount() {
    return this._balance.format();
  }
  handleActions(action) {
    switch (action.name) {
      case "CREDIT":
        this.credit(action.amount);
        break;
      case "DEBIT":
        this.debit(action.amount);
        break;
      case "RESET":
        this.reset();
        break;
      default:
        break;
    }
  }
}

let theAccountStore = new Account();
dispatcher.register(theAccountStore.handleActions.bind(theAccountStore));
export default theAccountStore;
