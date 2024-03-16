import { useContext, useEffect, useState } from "react";
import ExpenseContext from "./expense-context";
import axios from "axios";
import AuthContext from "./auth-context";
const ExpenseContextProvider = (props) => {
  const { logIn } = useContext(AuthContext);
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(5);
  const [previous, setPrevious] = useState(false);
  const [next, setNext] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getExpenses();
    }
  }, [logIn, page, itemPerPage]);
  const getExpenses = async () => {
    let token = localStorage.getItem("token");
    try {
      let res = await axios.get(
        `http://localhost:3000/expenses?page=${page}&item=${itemPerPage}`,
        {
          headers: { Authorization: token },
        }
      );
      setItems(res.data.expenses);
      if (res.data.hasNextPage) setNext(true);
      if (!res.data.hasNextPage) setNext(false);
      if (!res.data.hasPreviousPage) setPrevious(false);
      if (res.data.hasPreviousPage) setPrevious(true);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const deleteExpense = async (id) => {
    let token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:3000/expenses/${id}`, {
        headers: { Authorization: token },
      });
    } catch (error) {
      console.log(error);
    }
  };
  const addExpenseHandler = (obj) => {
    console.log(obj);
    setItems([...items, obj]);
  };
  const deleteExpenseHandler = (obj) => {
    let updatedExpenses = items.filter((item) => {
      return item._id.toString() !== obj._id.toString();
    });
    deleteExpense(obj._id);
    setItems(updatedExpenses);
  };
  function previousHandler() {
    let updatedPage = page - 1;
    setPage(updatedPage);
  }
  function nextHandler() {
    let updatedPage = page + 1;
    setPage(updatedPage);
  }

  return (
    <ExpenseContext.Provider
      value={{
        items: items,
        addExpense: addExpenseHandler,
        deleteExpense: deleteExpenseHandler,
        next: next,
        previous: previous,
        previousHandler: previousHandler,
        nextHandler: nextHandler,
      }}
    >
      {props.children}
    </ExpenseContext.Provider>
  );
};
export default ExpenseContextProvider;
