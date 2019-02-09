import dispatcher from "../dispatcher";

const transact = ({ account, transaction }) => {
  dispatcher.dispatch({
    account,
    transaction,
    name: "TRANSACTION"
  });
};

const newAccount = account => {
  dispatcher.dispatch({
    account,
    name: "NEW_ACCOUNT"
  });
};

export { transact, newAccount };
