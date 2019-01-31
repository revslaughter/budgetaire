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

export const set = setAmount => {
  dispatcher.dispatch({ name: "SET", amount: setAmount });
};
