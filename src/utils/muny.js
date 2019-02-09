/**
 * Sets and displays monetary values to avoid floating
 * point difficulties.
 */
class Muny {
  /**
   * Convert a number and its hundredths to an integer
   * Rounds with the assumption that floating point errors will be closest
   * to the nearest integer. Maybe not the best assumption.
   * @param {number} num The number to convert
   */
  makeTotalCents = num => Math.floor(Math.round(num * 100));

  /**
   * # Private function
   * Get just the whole dollar amount of the money
   */
  _getDollars = () =>
    Math.abs(this._cents) < 100
      ? 0
      : parseInt(this._cents.toString().slice(0, -2));

  /**
   * # Private function
   * Get just the cent value only of the money
   */
  _getCents = () => this._cents % 100;

  /**
   * Return formatted string value for the money
   * Negative numbers should be in parentheses
   * @returns {string} Formatted with dollar sign, decimal place, and parentheses
   */
  formatted = () => {
    let dollarAmount = Math.abs(this._getDollars());
    let centAmount = Math.abs(this._getCents());
    let centFormat;
    let isZero = centAmount === 0;
    let isLessThanTen = centAmount < 10;

    if (isZero) {
      centFormat = "00";
    } else if (isLessThanTen) {
      centFormat = `0${centAmount}`;
    } else {
      centFormat = `${centAmount}`;
    }
    let format = `$${dollarAmount}.${centFormat}`;
    return this.amount < 0 ? `(${format})` : format;
  };

  /**
   * Handles input for arithmetic functions, can handle Muny or number inputs
   * @param {Muny | number} possibleNumber, the number to do an operation with
   * @returns {number} Returns the integer version of the money
   */
  _numberDetermine = possibleNumber => {
    if (typeof possibleNumber === "number") {
      return this.makeTotalCents(possibleNumber) / 100;
    } else if (possibleNumber instanceof Muny) {
      return possibleNumber.amount;
    } else {
      throw new Error("Input must be a number or a Muny");
    }
  };

  /**
   * Adds the input amount to this Muny.
   * @param {Muny | number} otherAmt The amount to add
   */
  add = otherAmt => {
    this.amount += this._numberDetermine(otherAmt);
  };

  /**
   * Subtracts an amount from this Muny
   * @param {Muny | number} otherAmt the amount to subtract
   */
  subtract(otherAmt) {
    let amtToSub;
    if (otherAmt instanceof Muny) {
      amtToSub = otherAmt.amount;
    } else {
      amtToSub = otherAmt;
    }
    this.add(amtToSub * -1);
  }

  /**
   * Get the numeric amount in dollars and cents
   * @returns {number} the value of the money as a number
   */
  get amount() {
    return this._cents / 100;
  }
  /**
   * Set the amount of money to an amount
   * @param {number} amount
   */
  set amount(m) {
    this._cents = this.makeTotalCents(m);
  }

  /**
   * Set money amount, can take number or another Muny object
   * @param {number | Muny} amt
   */
  constructor(amt) {
    if (amt instanceof Muny) {
      this._cents = amt._cents;
    } else {
      amt ? (this.amount = amt) : (this.amount = 0);
    }
  }
}

export default Muny;
