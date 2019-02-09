import Account from "./account";

it("can initialize", () => {
  let testAccount = new Account({
    history: [{ amount: 100 }],
    amount: 100
  });
  expect(testAccount.balance()).toEqual("$100.00");
});

it("can debit", () => {
  let testAccount = new Account({
    history: [{ amount: 100 }],
    amount: 100
  });
  testAccount.debit({ amount: 105 });
  expect(testAccount.balance()).toEqual("($5.00)");
});

it("can credit", () => {
  let testAccount = new Account({
    history: [{ amount: 100 }],
    amount: 100
  });
  testAccount.credit({ amount: 10 });
  expect(testAccount.balance()).toEqual("$110.00");
});

it("can reset", () => {
  let testAccount = new Account({
    history: [{ amount: 100 }],
    amount: 100
  });
  testAccount.reset();
  expect(testAccount.balance()).toEqual("$0.00");
});
