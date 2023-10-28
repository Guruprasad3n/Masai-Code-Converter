// // import { useState } from "react";

// // function FileSummarise() {
// //   const [documents, setDocuments] = useState("");
// //   const [summary, setSummary] = useState("");

// //   const handleSummarize = async () => {
// //     // Send the user's documents to the backend for summarization.
// //     const response = await fetch("http://localhost:8000/summarize", {
// //       method: "POST",
// //       headers: { "Content-Type": "application/json" },
// //       body: JSON.stringify({ documents }),
// //     });

// //     if (response.ok) {
// //       const data = await response.json();
// //       setSummary(data.summary);
// //     }
// //   };

// //   return (
// //     <>
// //       <div>
// //         <h1>Multi-Document Summarization</h1>
// //         <textarea
// //           placeholder="Enter your documents here..."
// //           value={documents}
// //           onChange={(e) => setDocuments(e.target.value)}
// //         />
// //         <button onClick={handleSummarize}>Summarize</button>
// //         <div>
// //           <h2>Summary:</h2>
// //           <p>{summary}</p>
// //         </div>
// //       </div>
// //     </>
// //   );
// // }

// // export default FileSummarise

// import React, { useState } from "react";
// import axios from "axios";

// const FileSummarise = () => {
//   const [selectedFiles, setSelectedFiles] = useState(null);
//   const [generatedSummary, setGeneratedSummary] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   const handleFileChange = (e) => {
//     const files = e.target.files;
//     setSelectedFiles(files);
//   };

//   const handleSubmit = async () => {
//     if (!selectedFiles || selectedFiles.length === 0) {
//       alert("Please select at least one file for summarization.");
//       return;
//     }

//     const formData = new FormData();
//     for (let i = 0; i < selectedFiles.length; i++) {
//       formData.append("files", selectedFiles[i]);
//     }

//     setIsLoading(true);

//     try {
//       const response = await axios.post(
//         "http://localhost:8000/convert-pdf",
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       setGeneratedSummary(response.data.summary);
//     } catch (error) {
//       console.error("Error while making the POST request:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="summarization">
//       <h2>Multi Doc FileSummarise</h2>

//       <div className="input">
//         <label>Select Files</label>
//         <input type="file" multiple onChange={handleFileChange} />
//       </div>
//       <button onClick={handleSubmit}>Generate Summary</button>

//       {isLoading && <p>Loading...</p>}

//       {generatedSummary && (
//         <div className="output">
//           <h3>Generated Summary:</h3>
//           <p>{generatedSummary}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default FileSummarise;

import React, { useState } from "react";
import axios from "axios";
// import "../App.css";

const Emotions = () => {
  const [text, setText] = useState("");
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleChange = (e) => {
    setText(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let out = "";
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        "http://localhost:8000/extract-data",
        { text }
      );
      out = data.result;
    } catch (error) {
      console.log(error);
    } finally {
      setOutput(out);
      setIsLoading(false);
    }
  };

  return (
    <div style={{display:"flex", flexDirection:"column", width:"50%", margin:"auto", textAlign:"center"}}>
      <h2>Emotion Recognition Service</h2>
      <div style={{display:"flex", flexDirection:"column", gap:"15px"}} >
        <input style={{padding:"10px 20px", boxSizing:"border-box",color:"white", background:"grey", borderRadius:"10px" }}
          type="text"
          onChange={(e) => handleChange(e)}
          placeholder="Your Emotion"
        />
        <button style={{width:"30%", margin:"auto"}}
          type="submit"
          onClick={(e) => {
            handleSubmit(e);
          }}
        >
          Submit
        </button>
      </div>
      <div>
        {isLoading ? (
          "...Loading"
        ) : (
          <div className="output">
            <h3>Result From The AI</h3>
            <p>{output}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Emotions;
