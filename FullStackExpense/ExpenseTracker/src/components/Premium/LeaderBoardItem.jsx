import { FaMedal } from "react-icons/fa6";
const LeaderBoardItem = (props) => {
  return (
    <>
      <tr>
        <td>
          <h4>{props.id}</h4>
        </td>
        <td>
          <div class="d-flex align-items-center">
            <img
              src="https://mdbootstrap.com/img/new/avatars/8.jpg"
              alt=""
              style={{ width: "45px", height: "45px" }}
              class="rounded-circle"
            />
            <div class="ms-3">
              <p class="fw-bold mb-1">{props.name}</p>
              <p class="text-muted mb-0">{props.email}</p>
            </div>
          </div>
        </td>
        <td>
          {props.id == 1 && (
            <FaMedal style={{ fontSize: "20px", color: "gold" }} />
          )}
          {props.id == 2 && (
            <FaMedal style={{ fontSize: "20px", color: "silver" }} />
          )}
          {props.id == 3 && (
            <FaMedal style={{ fontSize: "20px", color: "bronze" }} />
          )}
        </td>
        <td>
          <h5>{props.total}</h5>
        </td>
      </tr>
    </>
  );
};
export default LeaderBoardItem;
