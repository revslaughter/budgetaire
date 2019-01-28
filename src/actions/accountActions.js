import dispatcher from "../dispatcher";

export const credit = creditAmount => {
  dispatcher.dispatch({
    name: "CREDIT",
    amount: creditAmount
  });
};

export const debit = debitAmount => {
  dispatcher.dispatch({
    name: "DEBIT",
    amount: debitAmount
  });
};

export const reset = () => {
  dispatcher.dispatch({ name: "RESET" });
};
