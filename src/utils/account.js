import { Muny, Budget } from ".";
import AccountTransaction from "./transaction";

/**
 * Account stores a balance and the history of transactions.
 */
class Account {
  /**
   * Set the account with the given list of transactions, and a budget target
   * @param {{history: {amount: number}[], target: number}} accountArg Contains History and Budget Target
   *
   */
  constructor(acctArgs) {
    let history, target;
    if (acctArgs === undefined) {
      history = [];
      target = 0;
    } else {
      ({ history = [], target = 0 } = acctArgs);
    }
    if (history && Array.isArray(history)) {
      this._balance = this.balanceAccount(history);
    } else {
      this._balance = new Muny();
    }
    if (history) {
      this.register = this.addBalanceEntries(history).map(
        h => new AccountTransaction(h)
      );
    }
    this.budget = new Budget(target);
  }

  /**
   * Go through history to get correct balance
   * @param {{amount: number}} history
   */
  balanceAccount(history) {
    if (history.length === 0) {
      return new Muny();
    } else if (history.length === 1) {
      history = this.addBalanceEntries(history);
      return new Muny(history[0].amount);
    } else {
      history = this.addBalanceEntries(history);
      return history.reduce((bal, a, i) => {
        if (bal && bal.type) {
          bal = new Muny(bal.amount);
        }
        bal = this.transactionLogic(a.type, bal, a.amount);
        return new Muny(bal);
      });
    }
  }

  addBalanceEntries(history) {
    let cBal = new Muny();
    let historyWithBalance = [];
    history.forEach(txn => {
      cBal = this.transactionLogic(txn.type, cBal, txn.amount);
      historyWithBalance.push({
        ...txn,
        balance: cBal
      });
    });
    return historyWithBalance;
  }

  transactionLogic(type, start, amount) {
    switch (type.toUpperCase()) {
      case "CREDIT":
        start.add(amount);
        break;
      case "DEBIT":
        start.subtract(amount);
        break;
      case "RESET":
        start = new Muny();
        break;
      case "SET":
        start = new Muny(amount);
        break;
      default:
        break;
    }
    return new Muny(start);
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
