const express = require("express");
const env = require("dotenv");
env.config();
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

const userRoutes = require("./routes/user");
const expenseRoutes = require("./routes/expense");
const purchaseRoutes = require("./routes/purchase");

app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());
app.use(userRoutes);
app.use(expenseRoutes);
app.use("/purchase", purchaseRoutes);
async function connection() {
  try {
    await mongoose.connect(
      "mongodb+srv://nitinahuja240:good1234@expensetracker.wkjglwe.mongodb.net/"
    );
    app.listen(3000);
    console.log("Connected To Port 3000");
  } catch (error) {
    console.log(error);
  }
}
connection();
