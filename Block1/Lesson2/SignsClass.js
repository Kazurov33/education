export class SignsClass {
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

  // Determining the priority of the sign
  _priority(operator) {
    switch (operator) {
      case "u-":
      case "u+":
        return 3;
      case "*":
      case "/":
        return 2;
      case "+":
      case "-":
        return 1;
      default:
        return -1;
    }
  }
}
