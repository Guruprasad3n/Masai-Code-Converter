import axios from "axios";
import React, { useState } from "react";

function CodeConvert() {
  const [inputCode, setInputCode] = useState("");
  const [convertedCode, setConvertedCode] = useState("");
  const [selectLang, setSelectlang] = useState("");
  const [loading, setLoading] = useState(false);
  const handleConvert = () => {
    // https://masai-code-c0nverter.onrender.com
    // http://localhost:8000/convert
    setLoading(true);
    axios
      .post(`https://masai-code-c0nverter.onrender.com/convert`, {
        code: inputCode,
        lang: selectLang,
      })
      .then((response) => {
        setConvertedCode(response.data.convertedCode);
      })
      .catch((error) => {
        console.error("Error converting code:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <div className="code_converter_main">
        <h1>Code Converter</h1>
        {/* <div className="code_converter_main_ch"> */}
        <div className="heading_child">
          <select
            name="selectlang"
            id="selectlang"
            value={selectLang}
            onChange={(e) => {
              setSelectlang(e.target.value);
            }}
          >
            <option value="" hidden>
              Select language
            </option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="javascript">JavaScript</option>
          </select>
          <button
            onClick={handleConvert}
            disabled={loading || inputCode.length === 0}
          >
            {loading ? "Converting..." : "Convert Code"}
          </button>
        </div>
        <div className="code_converter_child">
          <div className="code_converter_child_left">
            <div>
              <textarea
                placeholder="Enter code here"
                rows="32"
                cols="50"
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
              ></textarea>
            </div>
          </div>
          <div className="code_converter_child_right">
            <h2>Converted Code</h2>
            <pre>{convertedCode}</pre>
          </div>
        </div>
        {/* </div> */}
      </div>
    </>
  );
}

export default CodeConvert;
