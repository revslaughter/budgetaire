import { AccountActions } from "../actions";
import AccountStore from "./account";

it("can initialize", () => {
  expect(AccountStore.balance()).toEqual("$0.00");
});

it("can debit", () => {
  AccountStore.debit({ amount: 5 });
  expect(AccountStore.balance()).toEqual("($5.00)");
});

it("can credit", () => {
  AccountStore.credit({ amount: 10 });
  expect(AccountStore.balance()).toEqual("$5.00");
});

it("can reset", () => {
  AccountStore.reset();
  expect(AccountStore.balance()).toEqual("$0.00");
});

it("can handle CREDIT action", () => {
  AccountActions.credit({ amount: 20 });
  expect(AccountStore.balance()).toEqual("$20.00");
});

it("can handle RESET action", () => {
  AccountActions.reset();
  expect(AccountStore.balance()).toEqual("$0.00");
});

it("can handle DEBIT action", () => {
  AccountActions.debit({ amount: 20 });
  expect(AccountStore.balance()).toEqual("($20.00)");
});

it("can handle SET action", () => {
  AccountActions.set({ amount: 80.08 });
  expect(AccountStore.balance()).toEqual("$80.08");
});
