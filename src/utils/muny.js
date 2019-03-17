/**
 * Sets and displays monetary values to avoid floating
 * point difficulties.
 */
let Muny = (amount = 0) => {
  const makeTotalCents = (num = 0) => Math.floor(Math.round(num * 100));
  const munySmell = m => !(typeof m === "number");
  const format = amt => {
    const getDollars = cents => {
      return Math.abs(cents) < 100
        ? 0
        : parseInt(cents.toString().slice(0, -2));
    };
    const getCents = cents => cents % 100;
    let dollarAmount = Math.abs(getDollars(amt));
    let centAmount = Math.abs(getCents(amt));
    let centFormat = "";

    if (centAmount === 0) {
      centFormat = "00";
    } else if (centAmount < 10) {
      centFormat = `0${centAmount}`;
    } else {
      centFormat = `${centAmount}`;
    }
    let format = `$${dollarAmount}.${centFormat}`;
    return amount < 0 ? `(${format})` : format;
  };

  let cents = 0;
  if (munySmell(amount)) {
    cents = amount.cents;
    amount = amount.value;
  } else {
    cents = makeTotalCents(amount);
  }

  return {
    value: amount,
    cents,
    formatted: format(cents),
    toString: () => this.formatted,
    add: (a = 0) => Muny(amount + (munySmell(a) ? a.value : a)),
    subtract: (s = 0) => Muny(amount - (munySmell(s) ? s.value : s))
  };
};

export default Muny;
