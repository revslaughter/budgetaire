import { Muny } from ".";

/**
 * Account stores a balance and the history of transactions.
 */
class Account {
  /**
   * Set the account with the given list of transactions
   * @param {{amount: number}[]} history
   */
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

  /**
   * Set the balance to the amount of the transaction
   * @param {{amount: number}} transaction
   */
  set(transaction) {
    this._balance = new Muny(transaction.amount);
    this.register.push({
      ...transaction,
      amount: new Muny(transaction.amount),
      balance: this._balance.formatted()
    });
  }

  /**
   * Add to the balance, push transaction to the register
   * @param {{amount: number}} transaction
   */
  credit(transaction) {
    this._balance.add(transaction.amount);
    this.register.push({
      ...transaction,
      amount: new Muny(transaction.amount),
      balance: this._balance.formatted()
    });
  }
  /**
   * Subtract from the balance, push transaction to the register
   * @param {{amount: number}} transaction
   */
  debit(transaction) {
    this._balance.subtract(transaction.amount);
    this.register.push({
      ...transaction,
      amount: new Muny(transaction.amount),
      balance: this._balance.formatted()
    });
  }
  /**
   * Reset the history and the balance to zero.
   */
  reset() {
    this._balance = new Muny();
    this.register = [];
  }
  /**
   * Return the balance as a formatted string
   * @returns {string}
   */
  balance() {
    return this._balance.formatted();
  }
}

export default Account;
