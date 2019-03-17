import { Muny } from ".";

function Budget(
  budgObj = {
    target: 0,
    name: "Budget"
  }
) {
  let name, target;
  name = budgObj.name;
  target = Muny(budgObj.target);

  function variance(actual = 0) {
    var tmp = Muny(target);
    let actualMuny = Muny(actual);
    return actualMuny.subtract(tmp);
  }
  function variancePercent(actual = 0) {
    return variance(actual).value / target.value;
  }
  function isUnderBudget(actual = 0) {
    return variance(actual).value < 0;
  }
  function isOverBudget(actual = 0) {
    return variance(actual).value >= 0;
  }

  return {
    name,
    target,
    variance,
    variancePercent,
    isUnderBudget,
    isOverBudget
  };
}

export default Budget;
