import Muny from "./muny";

it("can give money value", () => {
  // doesn't pass??? Stupid floating point stupid
  let myMoney = new Muny(4.6);
  expect(myMoney._cents).toEqual(460);
});

it("can format money value right", () => {
  let someMoney = new Muny(150.04);
  expect(someMoney.formatted()).toEqual("$150.04");
});

it("can handle integer values fine", () => {
  let nonCentsical = new Muny(9001);
  expect(nonCentsical.formatted()).toEqual("$9001.00");
});

it("can be initialized at zero", () => {
  let noMoneyHere = new Muny();
  expect(noMoneyHere.amount).toEqual(0);
});

it("can format zero correctly", () => {
  let noMoneyHereEither = new Muny();
  expect(noMoneyHereEither.formatted()).toEqual("$0.00");
});
