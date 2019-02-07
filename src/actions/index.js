import * as AccountActions from "./accountActions";
import dispatcher from "../dispatcher";

export const transact = ({ account, transaction }) => {
  dispatcher.dispatch({
    account,
    transaction,
    name: "TRANSACTION"
  });
};
export { AccountActions };
