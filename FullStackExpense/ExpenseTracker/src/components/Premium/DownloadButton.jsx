import axios from "axios";

const DownloadButton = () => {
  async function DownloadExpenseHandler() {
    try {
      const token = localStorage.getItem("token");
      let res = await axios.get("http://localhost:3000/download-expenses", {
        headers: { Authorization: token },
      });
      if (res.status == 201) {
        var a = document.createElement("a");
        a.href = res.data.fileUrl;
        a.download = res.data.filename;
        a.click();
      }
    } catch (error) {
      console.log(error);
      console.log("Something Went Wrong While Downloading !");
    }
  }
  return (
    <>
      <div>
        <button
          style={{ float: "right" }}
          className="btn btn-success"
          onClick={DownloadExpenseHandler}
        >
          Download Expenses
        </button>
      </div>
    </>
  );
};
export default DownloadButton;
