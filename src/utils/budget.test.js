import { Budget } from ".";

it("can init", () => {
  var testBudget = Budget({
    name: "new budet whee",
    target: 75
  });
});

it("can report variance", () => {
  var testBudget = Budget({
    name: "new budet whee",
    target: 75
  });
  var actual = 100;

  expect(testBudget.variance(actual).value).toEqual(25);
  expect(testBudget.variancePercent(actual)).toEqual(1 / 3);
  expect(testBudget.isOverBudget(actual)).toEqual(true);
  expect(testBudget.isUnderBudget(actual)).toEqual(false);
});
