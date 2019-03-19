import { Muny, Budget, Transaction } from ".";

/**
 * Account stores a balance and the history of transactions.
 */
function Account(history = [], target = 0, name = "Account", id = "unique") {
  const dateLatest = (a, b) => a > b;
  const dateEarliest = (a, b) => a < b;

  const sorter = (
    oneTx = Transaction(),
    anotherTx = Transaction(),
    comp = dateLatest
  ) => {
    if (comp(oneTx.date, anotherTx.date)) {
      return -1;
    } else if (
      !comp(oneTx.date, anotherTx.date) &&
      oneTx.date !== anotherTx.date
    ) {
      return 1;
    } else {
      return 0;
    }
  };

  const sortEarliest = (a, b) => sorter(a, b, dateEarliest);
  const sortLatest = (a, b) => sorter(a, b, dateLatest);

  /**
   * Go through history to get correct balance
   * @param history
   */
  function balanceAccount(history = []) {
    if (history.length === 0) {
      return Muny();
    } else if (history.length === 1) {
      history = addBalanceEntries(history);
      return Muny(history[0].amount);
    } else {
      history = addBalanceEntries(history);
      return history[history.length - 1].balance || Muny();
    }
  }

  function addBalanceEntries(history = []) {
    let cBal = Muny();
    let historyWithBalance = [];
    history.forEach(txn => {
      cBal = transactionReducer(txn.type, cBal, txn.amount);
      historyWithBalance.push({
        ...txn,
        balance: Muny(cBal)
      });
    });
    return historyWithBalance;
  }

  function transactionReducer(type = "CREDIT", start = Muny(), amount = 0) {
    switch (type.toUpperCase()) {
      case "CREDIT":
        return start.add(amount);
      case "DEBIT":
        return start.subtract(amount);
      case "RESET":
        return Muny();
      case "SET":
        return Muny(amount);
      default:
        break;
    }
    return Muny(start);
  }

  let balance = Muny();
  let budget = Budget();
  let register = [];

  /**
   * Set the account with the given list of transactions, and a budget target
   */
  if (history.length !== 0) {
    // got to make sure history is in order of date for dateEarliest
    // so tht the balance is calculated correctly
    history.sort(sortEarliest);
    balance = balanceAccount(history);
    register = addBalanceEntries(history)
      .map(h => Transaction(h))
      .sort(sortLatest);
  }
  budget = Budget({ target });

  return {
    id,
    register,
    balance,
    budget,
    name
  };
}

export default Account;
