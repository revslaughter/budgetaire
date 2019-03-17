import Transaction from "./transaction";

it("can init", () => {
  const jelly = Transaction({
    type: "DEBIT",
    amount: 96,
    date: "2018-03-20T00:17:22.881Z",
    balance: 100
  });
  expect(jelly.balance.value).toEqual(100);
});

it("can empty init", () => {
  expect(Transaction().amount.value).toEqual(0);
});
