import { Link } from "react-router-dom";
const Home = () => {
  return (
    <center
      className="px-3"
      style={{
        background:
          "linear-gradient(50deg, #C0C0C0, #A9A9A9, #696969, #808080)",
        height: "100%",
        width: "100%",
        padding: "4%",
      }}
    >
      <h1>Welcome to ExpenseTracker</h1>
      <p>Track Your Expenses Effortlessly</p>
      <p className="lead">
        <h2>Features:</h2>

        <li style={{ listStyleType: "none" }}>
          <strong>Simple and Intuitive Interface:</strong> Easily record your
          expenses with just a few taps.
        </li>
        <li style={{ listStyleType: "none" }}>
          <strong>Categorize Expenses:</strong> Organize your spending into
          categories for better understanding.
        </li>
        <li style={{ listStyleType: "none" }}>
          <strong>Budget Management:</strong> Set budgets for different
          categories and keep track of your spending to stay on track.
        </li>
        <li style={{ listStyleType: "none" }}>
          <strong>Visualize Your Finances:</strong> Interactive charts and
          graphs help you visualize your spending habits.
        </li>
        <li style={{ listStyleType: "none" }}>
          <strong>Secure and Private:</strong> Your financial data is encrypted
          and securely stored.
        </li>
        <li style={{ listStyleType: "none" }}>
          <strong>Multi-Platform Sync:</strong> Access your expense data from
          anywhere, on any device.
        </li>
      </p>
      <p className="lead">
        <Link to="/auth" className="btn btn-lg btn-dark fw-bold border-black ">
          Let's get started!
        </Link>
      </p>
    </center>
  );
};

export default Home;
