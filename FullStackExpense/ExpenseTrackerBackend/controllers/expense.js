const Expense = require("../models/expense");
const User = require("../models/user");
const DownloadFile = require("../models/download-files");
const S3Services = require("../services/s3-service");
exports.postAddExpense = async (req, res) => {
  try {
    let category = req.body.category;
    let description = req.body.description;
    let amount = req.body.amount;
    let date = req.body.date;
    let userId = req.user._id;
    let total = req.user.totalExpense + Number(amount);
    console.log(total, typeof total);
    console.log("Authentication Working");
    let expense = new Expense({
      category,
      description,
      amount,
      date,
      userId,
    });
    let result = await expense.save();
    await User.findByIdAndUpdate(
      { _id: req.user._id },
      { totalExpense: total }
    );
    res.status(201).json({
      message: "Successfully Added!",
      expense: result,
    });
  } catch (error) {
    res.status(500).json({
      error: "Something Went Wrong",
    });
  }
};
exports.getExpenses = async (req, res) => {
  try {
    let page = Number.parseInt(req.query.page) || 1;
    let itemPerPage = Number.parseInt(req.query.item) || 4;

    // Count total expenses
    let totalExpenses = await Expense.countDocuments({ userId: req.user._id });

    console.log(totalExpenses, "here Get Expenses");

    // Find expenses for the current user, skip and limit based on pagination
    let expenses = await Expense.find({ userId: req.user._id })
      .skip((page - 1) * itemPerPage)
      .limit(itemPerPage);

    // Send response
    res.status(201).json({
      expenses: expenses,
      currentPage: page,
      hasPreviousPage: page > 1,
      hasNextPage: page * itemPerPage < totalExpenses,
      nextPage: page + 1,
      previousPage: page - 1,
      lastPage: Math.ceil(totalExpenses / itemPerPage),
    });
  } catch (error) {
    return res.status(500).json({
      error: "Something Went Wrong !",
    });
  }
};
exports.deleteExpense = async (req, res) => {
  try {
    let id = req.params.id;
    let expense = await Expense.findById({ _id: id });
    let expense_amount = expense.amount;
    let total = req.user.totalExpense - Number(expense_amount);

    await Expense.findByIdAndDelete({ _id: id });
    await User.findByIdAndUpdate(
      { _id: req.user._id },
      { totalExpense: total }
    );
    res.status(200).json({
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      error: "Something Went Wrong",
    });
  }
};
exports.getLeaderBoard = async (req, res) => {
  try {
    let users = await User.aggregate([
      {
        $group: {
          _id: "$_id",
          name: { $first: "$name" },
          email: { $first: "$email" },
          totalExpense: { $sum: "$totalExpense" },
        },
      },
      {
        $sort: { totalExpense: -1 },
      },
      {
        $project: { _id: 1, name: 1, email: 1, totalExpense: 1 },
      },
    ]);
    console.log(users, "these are users");
    res.status(202).json({
      users,
    });
  } catch (error) {
    res.status(500).json({
      error: "Something Went Wrong",
    });
  }
};
exports.downloadExpenses = async (req, res) => {
  try {
    let userId = req.user._id;
    const expense = await Expense.find({ userId: req.user._id });
    const stringfyExpense = JSON.stringify(expense);
    let currDate = new Date();
    currDate = `${currDate.getFullYear()}_${currDate.toLocaleString("default", {
      month: "long",
    })}_${currDate.getDate()}_${currDate.getHours()}_${currDate.getMinutes()}`;
    const filename = `expense${userId}/${currDate}_${req.user.name}.txt`;
    const fileUrl = await S3Services.uploadToS3(stringfyExpense, filename);
    console.log(fileUrl);
    let file = new DownloadFile({
      url: fileUrl,
      date: currDate,
      userId,
    });
    await file.save();
    console.log(fileUrl, filename);
    return res.status(201).json({
      fileUrl,
      filename,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Something Went Wrong !",
    });
  }
};
exports.DownloadedFiles = async (req, res) => {
  try {
    console.log("woringsdof");
    let userId = req.user._id;
    let files = await DownloadFile.find({ userId: userId });
    res.status(201).json({
      files,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Something Went Wrong In while fetching downloaded files !",
    });
  }
};

exports.getReports = async (req, res) => {
  try {
    let expenses = await Expense.find({ userId: req.user._id });
    res.status(201).json({
      expenses,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Something Went Wrong !",
    });
  }
};
