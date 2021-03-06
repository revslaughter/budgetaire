import { Muny, Budget } from ".";
import Transaction from "./transaction";

interface AccountArg {
  history: Transaction[];
  target: number;
  name: string;
}

/**
 * Account stores a balance and the history of transactions.
 */
class Account {
  _balance: Muny;
  register: Transaction[];
  budget: Budget;
  name: string;

  dateLatest = (a: Date, b: Date) => a > b;
  dateEarliest = (a: Date, b: Date) => a < b;

  sorter = (
    oneTx: Transaction,
    anotherTx: Transaction,
    comp: (a: Date, b: Date) => Boolean
  ) => {
    if (comp(oneTx.date, anotherTx.date)) {
      return -1;
    } else if (
      !comp(oneTx.date, anotherTx.date) &&
      oneTx.date != anotherTx.date
    ) {
      return 1;
    } else {
      return 0;
    }
  };

  sortEarliest = (a: Transaction, b: Transaction) =>
    this.sorter(a, b, this.dateEarliest);
  sortLatest = (a: Transaction, b: Transaction) =>
    this.sorter(a, b, this.dateLatest);

  /**
   * Set the account with the given list of transactions, and a budget target
   */
  constructor(
    acctArgs: AccountArg = {
      history: new Array<Transaction>(),
      target: 0,
      name: "Account"
    }
  ) {
    let history: Array<Transaction>;
    let target: number;

    ({ history = [], target = 0 } = acctArgs);
    if (history.length != 0) {
      // got to make sure history is in order of date for dateEarliest
      // so tht the balance is calculated correctly
      history.sort(this.sortEarliest);
      this._balance = this.balanceAccount(history);
      this.register = this.addBalanceEntries(history).map(
        h => new Transaction(h)
      );
    } else {
      this._balance = new Muny();
      this.register = history;
    }
    this.name = acctArgs.name;
    this.budget = new Budget({ target });
  }

  /**
   * Go through history to get correct balance
   * @param history
   */
  balanceAccount(history: Transaction[]): Muny {
    if (history.length === 0) {
      return new Muny();
    } else if (history.length === 1) {
      history = this.addBalanceEntries(history);
      return new Muny(history[0].amount);
    } else {
      history = this.addBalanceEntries(history);
      return history[history.length - 1].balance || new Muny();
    }
  }

  addBalanceEntries(history: Transaction[]) {
    let cBal = new Muny();
    let historyWithBalance: Transaction[] = new Array<Transaction>();
    history.forEach((txn: Transaction) => {
      cBal = this.transactionLogic(txn.type, cBal, txn.amount);
      historyWithBalance.push({
        ...txn,
        balance: new Muny(cBal)
      });
    });
    return historyWithBalance;
  }

  transactionLogic(type: string, start: Muny, amount: Muny | number): Muny {
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
    return this.budget.variance(this._balance.amount);
  }
  /**
   * Get the variance percentage from the budget target for the current balance
   */
  get variancePercent() {
    return this.budget.variancePercent(this._balance.amount);
  }
  /**
   * Set the balance to the amount of the transaction
   */
  set(transaction: Transaction) {
    this._balance = new Muny(transaction.amount);
    this.register.push({
      ...transaction,
      amount: new Muny(transaction.amount),
      balance: new Muny(this._balance)
    });
    this.register.sort(this.sortEarliest);
  }

  /**
   * Add to the balance, push transaction to the register
   */
  credit(transaction: Transaction) {
    this._balance.add(transaction.amount);
    this.register.push({
      ...transaction,
      amount: new Muny(transaction.amount),
      balance: new Muny(this._balance)
    });
    this.register.sort(this.sortEarliest);
  }
  /**
   * Subtract from the balance, push transaction to the register
   */
  debit(transaction: Transaction) {
    this._balance.subtract(transaction.amount);
    this.register.push({
      ...transaction,
      amount: new Muny(transaction.amount),
      balance: new Muny(this._balance)
    });
    this.register.sort(this.sortEarliest);
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
   */
  get balance() {
    return this._balance.formatted();
  }
}

export default Account;
