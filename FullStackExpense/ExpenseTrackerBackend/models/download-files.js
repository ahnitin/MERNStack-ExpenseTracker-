const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const downloadFilesSchema = new Schema(
  {
    url: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    collection: "download_files",
  }
);
module.exports = mongoose.model("DownloadFile", downloadFilesSchema);
