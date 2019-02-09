import { Muny } from ".";

class Budget {
  constructor({ name, target }) {
    this.name = name;
    this.target = new Muny(target);
  }

  variance(actual) {
    var tmp = new Muny(this.target);
    actual = new Muny(actual);
    actual.subtract(tmp);
    return actual;
  }
  variancePercent(actual) {
    return this.variance(actual).amount / this.target.amount;
  }
  isUnderBudget(actual) {
    return this.variance(actual).amount < 0;
  }
  isOverBudget(actual) {
    return this.variance(actual).amount >= 0;
  }
}

export default Budget;
