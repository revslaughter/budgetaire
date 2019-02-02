import dispatcher from "../dispatcher";

export const credit = creditTransaction => {
  dispatcher.dispatch({
    name: "CREDIT",
    transaction: creditTransaction
  });
};

export const debit = debitTransaction => {
  dispatcher.dispatch({
    name: "DEBIT",
    transaction: debitTransaction
  });
};

export const reset = () => {
  dispatcher.dispatch({ name: "RESET" });
};

export const set = setTransaction => {
  dispatcher.dispatch({ name: "SET", transaction: setTransaction });
};
