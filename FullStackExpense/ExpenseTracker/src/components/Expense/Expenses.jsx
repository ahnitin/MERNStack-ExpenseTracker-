import { useContext } from "react";
import ExpenseContext from "../../store/expense-context";
import ExpenseItem from "./ExpenseItem";
const Expenses = () => {
  const { items, next, previous, nextHandler, previousHandler } =
    useContext(ExpenseContext);
  return (
    <>
      <table class="table">
        <thead>
          <tr class="table-dark">
            <th scope="col">Category</th>
            <th scope="col">Description</th>
            <th scope="col">Amount</th>
            <th scope="col">Date</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <ExpenseItem
              category={item.category}
              description={item.description}
              amount={item.amount}
              date={item.date}
              expense={item}
            />
          ))}
        </tbody>
      </table>
      <div>
        {previous && (
          <button className="btn btn-outline-dark" onClick={previousHandler}>
            Previous
          </button>
        )}
        {next && (
          <button className="btn btn-outline-dark" onClick={nextHandler}>
            Next
          </button>
        )}
      </div>
    </>
  );
};
export default Expenses;
