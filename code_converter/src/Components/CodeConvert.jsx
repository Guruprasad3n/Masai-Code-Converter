import React, { useState } from "react";

function CodeConvert() {
  const [inputCode, setInputCode] = useState("");
  const [convertedCode, setConvertedCode] = useState("");
  const [loading, setLoading] = useState(false);

  const handleConvert = () => {};

  return (
    <>
      <div className="code_converter_main">
        <h1>Code Converter</h1>

        <div className="code_converter_child">
          <div className="code_converter_child_left">
            <div>
              <textarea
                placeholder="Enter code here"
                rows="30"
                cols="50"
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
              ></textarea>
            </div>
            <div>
              <button onClick={handleConvert} disabled={loading}>
                {loading ? "Converting..." : "Convert Code"}
              </button>
            </div>
          </div>
          <div className="code_converter_child_right">
            <h2>Converted Code</h2>
            <pre>{convertedCode}</pre>
          </div>
        </div>
      </div>
    </>
  );
}
export default CodeConvert;

{
  /* <div>
          <h1>Code Converter</h1>
        </div>

        <div className="code_converter_child">
         <div>
         <select name="" id="" onChange={handleChange}>
            <option value="" hidden>
              Select Language
            </option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="javascript">JavaScrript</option>
          </select>

         </div>
         <div>Output</div>
        </div> */
}
