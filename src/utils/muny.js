/**
 * Sets and displays monetary values to avoid floating
 * point difficulties.
 *
 */
class Muny {
  /**
   * Convert a number and its hundredths to an integer
   * @param {number} num The number to convert
   */
  makeTotalCents = num => Math.floor(num * 100);

  /**
   * Get just the whole dollar amount of the money
   */
  _getDollars = () => Math.floor(this._cents / 100);

  /**
   * Get just the cent value only of the money
   */
  _getCents = () => this._cents % 100;

  /**
   * Return formatted string value for the money
   * Negative numbers should be in parentheses
   */
  formatted = () => {
    let centAmount = this._getCents();
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
    let format = `$${this._getDollars()}.${centFormat}`;
    return this.Amount < 0 ? `( ${format} )` : format;
  };

  /**
   * Get the numeric amount in dollars and cents
   * @returns {number} the value of the money
   */
  get Amount() {
    return this._cents / 100;
  }
  /**
   * Set the amount of money
   */
  set Amount(m) {
    this._cents = this.makeTotalCents(m);
  }

  /**
   * Set money amount
   * @param {number} amt
   */
  constructor(amt) {
    amt ? (this.Amount = amt) : (this.Amount = 0);
  }
}

export default Muny;
