import { Account, Transaction } from "../utils";
import { accountBag } from "./accountBag";

function AppStore(accounts = {}, selectedAccount = Account()) {
  if (Object.keys(accounts).length === 0) {
    accounts = accountBag(selectedAccount);
  }

  function handleTransaction(transaction = Transaction()) {
    return Account(
      [...selectedAccount.register, transaction],
      selectedAccount.budget.target,
      selectedAccount.name,
      selectedAccount.id
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
        let newAct = handleTransaction(Transaction(action.transaction));
        return AppStore(accountBag(newAct, accounts), newAct);
      case "NEW_ACCOUNT":
        return AppStore(accountBag(action.account, accounts), selectedAccount);
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
