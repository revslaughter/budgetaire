const mockAccountMethods = require("./mockAccounts");
const fs = require("fs");

const mockData = JSON.stringify(mockAccountMethods.fakeListOfAccounts(5, 20));

fs.writeFile("./src/data/mockData.json", mockData, () => {});
