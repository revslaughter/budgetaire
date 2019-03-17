import { Account, Transaction } from "../utils";

//TODO: Your bug is happening because you're not replacing the
// modified account in accounts[], though I'm not sure why
// the thing is resetting the budget target as well?
function AppStore(accounts = [], selectedAccount = Account()) {
  if (accounts.length === 0) accounts = [selectedAccount];

  function handleTransaction(transaction = Transaction()) {
    return Account(
      [...selectedAccount.register, transaction],
      selectedAccount.target,
      selectedAccount.name
    );
  }
  function handleAction(
    action = {
      name: "TRANSACTION",
      transaction: Transaction()
    }
  ) {
    switch (action.name) {
      case "TRANSACTION":
        return AppStore(
          accounts,
          handleTransaction(Transaction(action.transaction))
        );
      case "NEW_ACCOUNT":
        return AppStore([...accounts, action.account], selectedAccount);
      case "SELECTED_ACCOUNT":
        return AppStore(accounts, action.account);
      default:
        break;
    }
  }
  return {
    accounts,
    selectedAccount,
    handleAction
  };
}

export default AppStore;
