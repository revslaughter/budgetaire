import Muny from "./muny";

function Transaction(
  registerItem = {
    type: "CREDIT",
    date: new Date(),
    amount: Muny(),
    balance: Muny()
  }
) {
  let type, date, amount, balance;
  type = registerItem.type.toUpperCase();
  amount = Muny(registerItem.amount);

  if (registerItem.date !== undefined) {
    date = new Date(registerItem.date);
  } else {
    date = new Date();
  }

  if (registerItem.balance !== undefined) {
    balance = Muny(registerItem.balance);
  } else {
    balance = Muny();
  }
  return { type, date, amount, balance };
}

export default Transaction;
