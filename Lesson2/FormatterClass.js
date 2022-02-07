import { SignsClass } from "./SignsClass.js";

class Formatter extends SignsClass {
  static instance;

  static get Instance() {
    return this.instance || (this.instance = new this());
  }

  // Formatting to reverse Polish notation
  format(expression) {
    let formatedExpression = "";
    let containerForSigns = [];
    let listOfSigns = expression.split("");
    listOfSigns.forEach((sign, index) => {
      if (sign == " ") {
        return;
      } else if (sign == "(") {
        containerForSigns.push(sign);
      } else if (sign == ")") {
        while (containerForSigns[containerForSigns.length - 1] != "(") {
          formatedExpression += " " + containerForSigns.pop();
        }
        containerForSigns.pop();
      } else if (sign in this.listOfOperators) {
        if (sign == "+" || sign == "-") {
          if (
            listOfSigns[index - 1] in this.listOfOperators ||
            listOfSigns[index - 1] == "("
          ) {
            containerForSigns.push(`u${sign}`);
            return;
          }
        }
        formatedExpression += " ";
        while (
          this._priority(containerForSigns[containerForSigns.length - 1]) >=
          this._priority(sign)
        ) {
          formatedExpression += containerForSigns.pop() + " ";
        }
        containerForSigns.push(sign);
      } else if (!isNaN(sign)) {
        formatedExpression += sign;
      } else {
        return;
      }
    });

    while (containerForSigns.length != 0) {
      formatedExpression += " " + containerForSigns.pop();
    }

    return formatedExpression;
  }
}

// export a singleton instance in the global namespace
export const formatter = Formatter.Instance;
