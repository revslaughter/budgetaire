const fake = require("faker");

const makeFakeAccount = numberTransactions => {
  return {
    name: fake.name.firstName() + " " + fake.finance.accountName(),
    history: makeFakeRegister(numberTransactions),
    target: fake.random.number({ min: 0, max: 1000, precision: 2 })
  };
};
const makeFakeRegister = numberTransactions => {
  let trs = [];
  numberTransactions = Math.abs(numberTransactions);
  while (numberTransactions) {
    trs.push(makeFakeTransaction());
    numberTransactions--;
  }
  return trs.sort((one, another) => {
    if (one.date < another.date) {
      return -1;
    } else if (one.date > another.date) {
      return 1;
    } else {
      return 0;
    }
  });
};
const makeFakeTransaction = () => {
  return {
    type: fake.random.arrayElement(["CREDIT", "DEBIT"]),
    amount: fake.random.number({ min: 0, max: 150, precision: 2 }),
    date: fake.date.past()
  };
};

const fakeListOfAccounts = (desired, txMaxLength) => {
  let acts = [];
  while (desired) {
    acts.push(
      makeFakeAccount(Math.trunc(Math.random() * Math.floor(txMaxLength)))
    );
    desired--;
  }
  return acts;
};

module.exports = {
  makeFakeAccount,
  makeFakeRegister,
  makeFakeTransaction,
  fakeListOfAccounts
};
