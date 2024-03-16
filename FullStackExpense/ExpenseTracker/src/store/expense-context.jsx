import { createContext } from "react";
const defaultContext = {
  items: [],
  addExpense: () => {},
  deleteExpense: () => {},
  next: false,
  previous: false,
  previousHandler: () => {},
  nextHandler: () => {},
};

const ExpenseContext = createContext(defaultContext);

export default ExpenseContext;
