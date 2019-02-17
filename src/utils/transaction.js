import Muny from "./muny";

class AccountTransaction {
  constructor(registerItem) {
    this.type = registerItem.type.toUpperCase();
    this.date = new Date(registerItem.date);
    this.amount = new Muny(registerItem.amount);
    this.balance = new Muny(registerItem.balance);
  }
}

export default AccountTransaction;
