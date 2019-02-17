import { Muny } from ".";

class Budget {
  name: string;
  target: Muny;
  constructor({ name, target }: { name: string; target: number }) {
    this.name = name;
    this.target = new Muny(target);
  }

  variance(actual: number): Muny {
    var tmp = new Muny(this.target);
    let actualMuny = new Muny(actual);
    actualMuny.subtract(tmp);
    return actualMuny;
  }
  variancePercent(actual: number): number {
    return this.variance(actual).amount / this.target.amount;
  }
  isUnderBudget(actual: number) {
    return this.variance(actual).amount < 0;
  }
  isOverBudget(actual: number) {
    return this.variance(actual).amount >= 0;
  }
}

export default Budget;
