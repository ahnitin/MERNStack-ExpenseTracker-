import { useContext } from "react";
import { RiDeleteBin6Fill } from "react-icons/ri";
import ExpenseContext from "../../store/expense-context";
const ExpenseItem = (props) => {
  const { deleteExpense } = useContext(ExpenseContext);
  return (
    <tr className="table-secondary">
      <th scope="row">{props.category}</th>
      <td>{props.description}</td>
      <td>{props.amount}</td>
      <td>{props.date}</td>
      <td>
        <button
          className="btn btn-danger"
          onClick={() => deleteExpense(props.expense)}
        >
          <RiDeleteBin6Fill />
        </button>
      </td>
    </tr>
  );
};
export default ExpenseItem;
