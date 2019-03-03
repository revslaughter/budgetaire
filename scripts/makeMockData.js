const mockAccountMethods = require("./mockAccounts");
const fs = require("fs");

const mockData = JSON.stringify(mockAccountMethods.fakeListOfAccounts(1, 5));

fs.writeFile("./src/data/mockData.json", mockData, () => {});
