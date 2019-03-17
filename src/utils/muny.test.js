import Muny from "./muny";

it("can give money value", () => {
  let myMoney = Muny(4.6);
  expect(myMoney.cents).toEqual(460);
});

it("can take Muny in constructor", () => {
  let oldMoney = Muny(99.99);
  let newMoney = Muny(oldMoney);
  expect(newMoney.value).toEqual(99.99);
});

it("can format negative numbers", () => {
  let inTheRed = Muny(-50);
  expect(inTheRed.formatted).toEqual("($50.00)");
});

it("can format money value right", () => {
  let someMoney = Muny(150.99);
  expect(someMoney.formatted).toEqual("$150.99");
});

it("can handle cent amounts less than 10", () => {
  let smallCentValue = Muny(70.07);
  expect(smallCentValue.formatted).toEqual("$70.07");
});

it("can format cent-only values with no dollar value", () => {
  let likeSevenCents = Muny(0.07);
  expect(likeSevenCents.formatted).toEqual("$0.07");
});

it("can handle integer values fine", () => {
  let nonCentsical = Muny(9001);
  expect(nonCentsical.formatted).toEqual("$9001.00");
});

it("can be initialized at zero", () => {
  let noMoneyHere = Muny();
  expect(noMoneyHere.value).toEqual(0);
});

it("can format zero correctly", () => {
  let noMoneyHereEither = Muny();
  expect(noMoneyHereEither.formatted).toEqual("$0.00");
});

it("can add amounts using Muny", () => {
  let added = Muny(1).add(Muny(3.5));
  expect(added.formatted).toEqual("$4.50");
});

it("can add amounts using number", () => {
  expect(Muny(5).add(3.5).formatted).toEqual("$8.50");
});

it("can subtract amounts using Muny", () => {
  let threeFifty = Muny(3.5);
  let oneDollar = Muny(1);
  let twoFifty = threeFifty.subtract(oneDollar);
  expect(twoFifty.formatted).toEqual("$2.50");
});

it("can subtract amounts using number", () => {
  let broke = Muny(3);
  expect(broke.subtract(10.05).formatted).toEqual("($7.05)");
});
