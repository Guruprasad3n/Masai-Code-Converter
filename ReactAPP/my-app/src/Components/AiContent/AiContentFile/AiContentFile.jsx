import React, { useState } from "react";
import axios from "axios";

function AiContentFile() {
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [generatedSummary, setGeneratedSummary] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e) => {
    const files = e.target.files;
    setSelectedFiles(files);
  };

  const handleSubmit = async () => {
    if (!selectedFiles || selectedFiles.length === 0) {
      alert("Please select at least one file for summarization.");
      return;
    }

    const formData = new FormData();
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append("files", selectedFiles[i]);
    }

    setIsLoading(true);

    try {
      const response = await axios.post(
        "https://peach-tick-robe.cyclic.app/summarization",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setGeneratedSummary(response.data.summary);
    } catch (error) {
      console.error("Error while making the POST request:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="summarization"
      style={{
        display: "flex",
        flexDirection: "column",
        width: "50%",
        gap: "20px",
        margin: "auto",
        textAlign: "center",
      }}
    >
      <h2>Multi Doc Summarization</h2>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          margin: "auto",
          gap: "10px",
        }}
      >
        {/* <label>Select Files</label> */}
        <input
          style={{
            width: "100%",
            border: "1px solid white",
            background: "grey",
            padding: "10px 20px",
            margin: "auto",
            borderRadius: "10px",
          }}
          type="file"
          multiple
          onChange={handleFileChange}
        />
      </div>
      <button
        style={{ width: "40%", padding: "7px 20px", margin: "auto" }}
        onClick={handleSubmit}
      >
        {isLoading ? "Loading" : "Generate Text"}
      </button>

      {generatedSummary && (
        <div className="output">
          <h3>Generated Summary:</h3>
          <p>{generatedSummary}</p>
        </div>
      )}
    </div>
  );
}

export default AiContentFile;
