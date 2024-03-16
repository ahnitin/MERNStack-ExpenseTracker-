import { useEffect, useState } from "react";
import LeaderBoardItem from "./LeaderBoardItem";
import axios from "axios";
const LeaderBoard = () => {
  const [users, setusers] = useState([]);
  useEffect(() => {
    getLeaderboard();
  }, []);
  async function getLeaderboard() {
    try {
      let res = await axios.get("http://localhost:3000/leader-board");
      setusers(res.data.users);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <table class="table align-middle mb-0 bg-white">
      <thead class="bg-light">
        <tr>
          <th>Rank</th>
          <th>Name</th>
          <th>Status</th>
          <th>Total Expenses</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, i) => (
          <LeaderBoardItem
            key={user._id}
            name={user.name}
            email={user.email}
            total={user.totalExpense}
            id={i + 1}
          />
        ))}
      </tbody>
    </table>
  );
};
export default LeaderBoard;
