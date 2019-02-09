import { Budget } from ".";

it("can init", () => {
  var testBudget = new Budget({
    name: "new budet whee",
    target: 75
  });
});

it("can report variance", () => {
  var testBudget = new Budget({
    name: "new budet whee",
    target: 75
  });
  var actual = 100;

  expect(testBudget.variance(actual).amount).toEqual(25);
  expect(testBudget.variancePercent(actual)).toEqual(1 / 3);
  expect(testBudget.isOverBudget(actual)).toEqual(true);
  expect(testBudget.isUnderBudget(actual)).toEqual(false);
});
