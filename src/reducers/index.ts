import { Layout } from "react-grid-layout";
import IAction, * as Actions from "../actions";
import { LAYOUT } from "../utils/constants";
import { Account, Transaction } from "../utils";

const initialState: AppState = {
  accounts: [],
  userLayout: LAYOUT
};

function findAccount(
  accounts: { id: string; account: Account }[],
  acctID: string
): Account {
  let possAcct = accounts.find(a => a.id === acctID);
  if (possAcct === undefined) {
    throw new Error("Account not found!");
  } else {
    return possAcct.account;
  }
}

export interface AppState {
  accounts: { id: string; account: Account }[];
  userLayout: Layout[];
}

export function TransactionReducer(account: Account, transaction: Transaction) {
  switch (transaction.type.toUpperCase()) {
    case Actions.TRANSACTION_TYPES.CREDIT:
      account.credit(transaction);
      break;
    case Actions.TRANSACTION_TYPES.DEBIT:
      account.debit(transaction);
      break;
    case Actions.TRANSACTION_TYPES.RESET:
      account.reset();
      break;
    case Actions.TRANSACTION_TYPES.SET:
      account.set(transaction);
      break;
    default:
      throw new Error("No transaction type or type not recognized");
  }
}

export const AppReducer = (
  state: AppState = initialState,
  action?: IAction
): AppState => {
  if (action === undefined) {
    return state;
  } else {
    switch (action.type) {
      case Actions.TRANSACTION:
        let currentAccount: Account = findAccount(
          state.accounts,
          action.payload.accountID
        );
        TransactionReducer(currentAccount, action.payload.transaction);
        return state;
        break;
      case Actions.NEW_ACCOUNT:
        return {
          ...state,
          accounts: [...state.accounts, action.payload.account]
        };
        break;
      default:
        return state;
    }
  }
};

export default AppReducer;
