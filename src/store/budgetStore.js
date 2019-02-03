import { Muny } from "../utils";
import { EventEmitter } from "events";
import dispatcher from "../dispatcher";

class Budget extends EventEmitter {
  constructor({ name, target }) {
    super();
    this.name = name;
    this.target = new Muny(target);
  }

  variance(actual) {
    return this.target.subtract(actual);
  }
  variancePercent(actual) {
    return this.variance(actual) / this.target;
  }
  isUnderBudget(actual) {
    return this.variance(actual) < 0;
  }
  isOverBudget(actual) {
    return this.variance(actual) >= 0;
  }
}

export default Budget;
