import Account from "./account";

it("can initialize", () => {
  let testAccount = Account([{ amount: 100, type: "credit" }], 100);
  expect(testAccount.balance.formatted).toEqual("$100.00");
});

it("can initialize empty", () => {
  let empty = Account();
  expect(empty.balance.formatted).toEqual("$0.00");
});

it("can debit", () => {
  let testAccount = Account(
    [{ amount: 100, type: "credit" }, { amount: 105, type: "DEBIT" }],
    100
  );

  expect(testAccount.balance.formatted).toEqual("($5.00)");
});

it("can credit", () => {
  let testAccount = Account(
    [{ amount: 100, type: "credit" }, { amount: 10, type: "credit" }],
    100
  );
  expect(testAccount.balance.formatted).toEqual("$110.00");
});
