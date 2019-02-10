import { Muny, Budget } from ".";

/**
 * Account stores a balance and the history of transactions.
 */
class Account {
  /**
   * Set the account with the given list of transactions, and a budget target
   * @param {{history: {amount: number}[], target: number}} accountArg Contains History and Budget Target
   *
   */
  constructor({ history, target }) {
    if (history && Array.isArray(history)) {
      this.register = history;
      this._balance = this.balanceAccount(history);
    } else {
      this.register = [];
      this._balance = new Muny();
    }
    if (target) {
      this.budget = new Budget(target);
    } else {
      this.budget = new Budget(0);
    }
  }

  /**
   * Go through history to get correct balance
   * @param {{amount: number}} history
   */
  balanceAccount(history) {
    if (history.length === 0) {
      return new Muny();
    } else if (history.length === 1) {
      return new Muny(history[0].amount);
    } else {
      return history.reduce((bal, a) => {
        if (bal && bal.type) bal = new Muny(bal.amount);
        switch (a.type.toUpperCase()) {
          case "CREDIT":
            bal.add(a.amount);
            break;
          case "DEBIT":
            bal.subtract(a.amount);
            break;
          case "RESET":
            bal = new Muny();
            break;
          case "SET":
            bal = new Muny(a.amount);
            break;
          default:
            break;
        }
        return new Muny(bal);
      });
    }
  }

  /**
   * The target for the budget.
   */
  set target(amount) {
    this.budget.target = new Muny(amount);
  }
  get target() {
    return this.budget.target;
  }

  /**
   * Get the variance from the budget target for the current balance
   */
  get variance() {
    return this.budget.variance(this._balance);
  }
  /**
   * Get the variance percentage from the budget target for the current balance
   */
  get variancePercent() {
    return this.budget.variancePercent(this._balance);
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
      balance: new Muny(this._balance)
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
      balance: new Muny(this._balance)
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
      balance: new Muny(this._balance)
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
