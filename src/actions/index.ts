import { Account, Transaction } from "../utils";

interface IAction {
  type: string;
  payload: any;
  error?: boolean;
}

export const TRANSACTION = "TRANSACTION";
export const NEW_ACCOUNT = "NEW_ACCOUNT";

export const TRANSACTION_TYPES = {
  CREDIT: "CREDIT",
  DEBIT: "DEBIT",
  SET: "SET",
  RESET: "RESET"
};

export function addTransaction(
  account: Account,
  transaction: Transaction
): IAction {
  return { type: TRANSACTION, payload: { account, transaction } };
}
export function makeNewAccount(account: Account): IAction {
  return {
    type: NEW_ACCOUNT,
    payload: {
      account
    }
  };
}
export default IAction;
