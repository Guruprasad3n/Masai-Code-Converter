import axios from "axios";
import React, { useState } from "react";

function CodeConvert() {
  const [inputCode, setInputCode] = useState("");
  const [convertedCode, setConvertedCode] = useState("");
  const [selectLang, setSelectlang] = useState("");
  const [loading, setLoading] = useState(false);

  //   , {
  //     code: inputCode,
  //     lang: selectlang,
  //   }
  // https://tame-pear-panda-wrap.cyclic.app/convert
  //   http://localhost:8000/convert?code${inputCode}&lang=${selectlang}
  const handleConvert = () => {
    setLoading(true);
    axios
      .post(`http://localhost:8000/convert`, {
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
        <div className="heading_child">
          <select
            name="selectlang"
            id="selectlang"
            value={selectLang}
            onChange={(e) => {
              setSelectlang(e.target.value), console.log("Cliccked");
            }}
          >
            <option value="" hidden>
              Select language
            </option>
            <option value="python">Python</option>
            <option value="java">Java</option>
            <option value="javascript">JavaScript</option>
          </select>
          <button onClick={handleConvert} disabled={loading}>
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
            <div>
             
            </div>
          </div>
          <div className="code_converter_child_right">
            <h2>Converted Code</h2>
            <pre  >{convertedCode}</pre>
          </div>
        </div>
      </div>
    </>
  );
}

export default CodeConvert;

// import axios from "axios";
// import React, { useState } from "react";

// function CodeConvert() {
//   const [inputCode, setInputCode] = useState("");
//   const [convertedCode, setConvertedCode] = useState("");
//   const [selectlang, setSelectlang] = useState("");
//   const [loading, setLoading] = useState(false);

// //   http://localhost:8000/shayari?type=${selectShayari}&keyword=${keyword}
// // http://localhost:8000/convert?code${inputCode}&lang=${selectlang}

//   const handleConvert = () => {
//     setLoading(true);
//     axios
//       .post(`http://localhost:8000/convert`, {
//         code: inputCode,
//         lang: selectlang,
//       })
//       .then((response) => {
//         setConvertedCode(response.data.convertedCode);
//       })
//       .catch((error) => {
//         console.error("Error converting code:", error);
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   };

//   return (
//     <>
//       <div className="code_converter_main">
//         <h1>Code Converter</h1>
//         <div className="heading_child">
//           <select name="" id="" value={selectlang} onChange={(e) => setSelectlang(e.target.value)}>
//             <option value="" hidden>
//               Select language
//             </option>
//             <option value="python">Python</option>
//             <option value="java">Java</option>
//             <option value="javascript">JavaScript</option>
//           </select>
//         </div>
//         <div className="code_converter_child">
//           <div className="code_converter_child_left">
//             <div>
//               <textarea
//                 placeholder="Enter code here"
//                 rows="30"
//                 cols="50"
//                 value={inputCode}
//                 onChange={(e) => setInputCode(e.target.value)}
//               ></textarea>
//             </div>
//             <div>
//               <button onClick={handleConvert} disabled={loading}>
//                 {loading ? "Converting..." : "Convert Code"}
//               </button>
//             </div>
//           </div>
//           <div className="code_converter_child_right">
//             <h2>Converted Code</h2>
//             <pre>{convertedCode}</pre>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
// export default CodeConvert;

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
