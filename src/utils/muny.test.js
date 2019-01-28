import Muny from "./muny";

it("can give money value", () => {
  let myMoney = new Muny(4.6);
  expect(myMoney._cents).toEqual(460);
});

it("can format negative numbers", () => {
  let inTheRed = new Muny(-50);
  expect(inTheRed.formatted()).toEqual("($50.00)");
});

it("can format money value right", () => {
  let someMoney = new Muny(150.99);
  expect(someMoney.formatted()).toEqual("$150.99");
});

it("can handle cent amounts less than 10", () => {
  let smallCentValue = new Muny(70.07);
  expect(smallCentValue.formatted()).toEqual("$70.07");
});

it("can format cent-only values with no dollar value", () => {
  let likeSevenCents = new Muny(0.07);
  expect(likeSevenCents.formatted()).toEqual("$0.07");
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

it("can add amounts using Muny", () => {
  let oneDolla = new Muny(1);
  let treeFiddy = new Muny(3.5);

  oneDolla.add(treeFiddy);

  expect(oneDolla.formatted()).toEqual("$4.50");
});

it("can add amounts using number", () => {
  let newFella = new Muny(5);

  newFella.add(3.5);

  expect(newFella.formatted()).toEqual("$8.50");
});
it("can subtract amounts using Muny", () => {
  let oneDolla = new Muny(1);
  let treeFiddy = new Muny(3.5);

  treeFiddy.subtract(oneDolla);

  expect(treeFiddy.formatted()).toEqual("$2.50");
});

it("can subtract amounts using number", () => {
  let broke = new Muny();

  broke.subtract(10.05);

  expect(broke.formatted()).toEqual("($10.05)");
});
