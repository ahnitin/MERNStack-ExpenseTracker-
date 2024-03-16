const express = require("express");
const router = express.Router();
const expenseController = require("../controllers/expense");
const userAuthentication = require("../middlewares/auth");
router.post(
  "/expenses",
  userAuthentication.authenticate,
  expenseController.postAddExpense
);
router.get(
  "/expenses",
  userAuthentication.authenticate,
  expenseController.getExpenses
);
router.delete(
  "/expenses/:id",
  userAuthentication.authenticate,
  expenseController.deleteExpense
);
router.get(
  "/download-expenses",
  userAuthentication.authenticate,
  expenseController.downloadExpenses
);
router.get(
  "/download-history",
  userAuthentication.authenticate,
  expenseController.DownloadedFiles
);

router.get("/leader-board", expenseController.getLeaderBoard);

module.exports = router;
