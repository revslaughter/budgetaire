import Transaction from "./transaction";

it("can init", () => {
  const jelly = new Transaction({
    type: "DEBIT",
    amount: 96,
    date: "2018-03-20T00:17:22.881Z"
  });
});
