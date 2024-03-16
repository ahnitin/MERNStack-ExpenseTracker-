import axios from "axios";
import { useEffect, useState } from "react";
import { IoMdDownload } from "react-icons/io";

const DownloadedFiles = () => {
  const [files, setFiles] = useState([]);
  useEffect(() => {
    DownloadedFiles();
  }, []);
  async function DownloadedFiles() {
    try {
      let token = localStorage.getItem("token");
      let res = await axios.get("http://localhost:3000/download-history", {
        headers: { Authorization: token },
      });
      console.log(res.data.files);
      setFiles(res.data.files);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <center>
      <table style={{ width: "80%" }} class="table">
        <thead>
          <tr class="table-dark">
            <th scope="col">Sr</th>
            <th scope="col">Name</th>
            <th scope="col">Download</th>
          </tr>
        </thead>
        <tbody>
          {files.map((file, i) => (
            <tr class="table-warning">
              <th scope="row">{i + 1}</th>
              <td>{file.date}</td>
              <td>
                <a href={file.url}>
                  <IoMdDownload style={{ fontSize: "25px", color: "green" }} />
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </center>
  );
};
export default DownloadedFiles;
