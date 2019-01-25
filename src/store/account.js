import currency from "currency";
import { EventEmitter } from "events";

class Account extends EventEmitter {
  constructor(initialAmount) {
    super();
    if (initialAmount === undefined || initialAmount === null)
      initialAmount = 0;
    this._balance = currency(initialAmount);
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
    this._balance = currency(0);
    this.emit("reset");
  }
  amount() {
    return this._balance.format();
  }
}
