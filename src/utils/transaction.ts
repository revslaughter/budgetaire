import Muny from "./muny";

class AccountTransaction {
  type: string;
  date: Date;
  amount: Muny;
  balance: Muny;

  constructor(registerItem: {
    type: string;
    date?: string | Date;
    amount: number | Muny;
    balance?: number | Muny;
  }) {
    this.type = registerItem.type.toUpperCase();
    if (registerItem.date !== undefined) {
      this.date = new Date(registerItem.date);
    } else {
      this.date = new Date(0, 0, 0, 0, 0, 0, 0);
    }
    this.amount = new Muny(registerItem.amount);
    if (registerItem.balance !== undefined) {
      this.balance = new Muny(registerItem.balance);
    } else {
      this.balance = new Muny();
    }
  }
}

export default AccountTransaction;
