import readLine from "readline"; // Подключение модуля для чтения данных

import { formatter } from "./FormatterClass.js";
import { calculator } from "./CalculatorClass.js";

let rl = readLine.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "",
});

rl.prompt();
rl.on("line", (inputExpression) => {
  let formattedExpression = formatter.format(inputExpression);
  console.log("Выражение: " + formattedExpression);
  console.log("Сумма: " + calculator.count(formattedExpression));
});
