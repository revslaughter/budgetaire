import { Account } from "../utils";

export function accountBag(acc = Account(), bag = {}) {
  let tmp = { ...bag };
  tmp[acc.id] = acc;
  return tmp;
}
