import { Muny } from ".";

class Account {
  constructor(history) {
    super();
    if (history && Array.isArray(history)) {
      this.register = history;
      this._balance = new Muny(history[history.length - 1].amount);
    } else {
      this.register = [];
      this._balance = new Muny();
    }
  }

  set(transaction) {
    this._balance = new Muny(transaction.amount);
    this.register.push({
      ...transaction,
      amount: new Muny(transaction.amount),
      balance: this._balance.formatted()
    });
  }
  credit(transaction) {
    this._balance.add(transaction.amount);
    this.register.push({
      ...transaction,
      amount: new Muny(transaction.amount),
      balance: this._balance.formatted()
    });
  }
  debit(transaction) {
    this._balance.subtract(transaction.amount);
    this.register.push({
      ...transaction,
      amount: new Muny(transaction.amount),
      balance: this._balance.formatted()
    });
  }
  reset() {
    this._balance = new Muny();
    this.register = [];
  }
  balance() {
    return this._balance.formatted();
  }
}

export default Account;
