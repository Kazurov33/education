import { SignsClass } from "./SignsClass.js";

class Calculator extends SignsClass {
  static instance;

  static get Instance() {
    return this.instance || (this.instance = new this());
  }

  listOfSigns = {
    "u+": (x) => x,
    "u-": (x) => -x,
  };

  listOfOperators = {
    "+": (x, y) => x + y,
    "-": (x, y) => x - y,
    "*": (x, y) => x * y,
    "/": (x, y) => x / y,
  };

  count(expressionInPolreverseNotation) {
    let containerForWaiting = [];
    expressionInPolreverseNotation.split(" ").forEach((oneSign) => {
      if (oneSign in this.listOfOperators) {
        let [y, x] = [containerForWaiting.pop(), containerForWaiting.pop()];
        containerForWaiting.push(this.listOfOperators[oneSign](x, y));
      } else if (oneSign in this.listOfSigns) {
        let x = containerForWaiting.pop();
        containerForWaiting.push(this.listOfSigns[oneSign](x));
      } else {
        containerForWaiting.push(parseFloat(oneSign));
      }
    });
    return containerForWaiting.pop();
  }
}

// export a singleton instance in the global namespace
export const calculator = Calculator.Instance;
