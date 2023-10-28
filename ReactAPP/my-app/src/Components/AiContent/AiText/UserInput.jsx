// import React, { useEffect, useRef, useState } from "react";
// import axios from "axios";
// import "./ai.css"; // Import the CSS file

// const getData = async (input) => {
//   const { data } = await axios.post(`http://localhost:8000/generate_text`, {
//     messages: input,
//   });
//   console.log(data.message)
//   return data.message
// };

// function UserInput() {
//   const [messages, setMessage] = useState([]);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);
//   const ref = useRef(null);



//   const handleInput = (e) => {
//     setInput(e.target.value);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const newmsg = { role: "user", content: input };
//     const updateMsg = [...messages, newmsg];
//     try {
//       const data  = await (getData);
//       const givenMessage = { role: "assistant", content: data };
//       updateMsg.push(givenMessage);
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setMessage(updateMsg);
//       setLoading(false);
//       setInput("");
//     }
//   };
//   useEffect(() => {
//     if (ref.current) {
//       ref.current.scrollTop = ref.current.scrollHeight;
//     }
//   }, [messages]);

//   return (
//     <div className="user-input-container">
//       <h1 style={{textAlign:"center"}}>AiText</h1>
//       <div
//         ref={ref}
//         className="text-convo"
//         style={{
//           maxHeight: "600px",
//           overflowY: "scroll",
//         }}
//       >
//         {messages.length
//           ? messages.map((el, i) => (
//               <div key={i} className="message">
//                 <p>
//                   <span>{el.role}: </span>
//                   {el.content}
//                 </p>
//               </div>
//             ))
//           : "Please start your conversation"}
//       </div>

//       {loading && <div className="loading-indicator">Loading...</div>}

//       <div className="input">
//         <input
//           type="text"
//           onChange={(e) => handleInput(e)}
//           value={input}
//           placeholder="Your message"
//         />
//         <button
//           type="submit"
//           onClick={(e) => {
//             setMessage([...messages, { role: "user", content: input }]);
//             handleSubmit(e);
//           }}
//         >
//           Submit
//         </button>
//       </div>
//     </div>

   
//   );
// }

// export default UserInput;



import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import "./ai.css"; // Import the CSS file

const getData = async (input) => {
  try {
    const { data } = await axios.post(`http://localhost:8000/generate_text`, {
      messages: input,
    });
    return data.message;
  } catch (error) {
    console.log(error);
    return "An error occurred";
  }
};

function UserInput() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const ref = useRef(null);

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newMsg = { role: "user", content: input };
    const updatedMsgs = [...messages, newMsg];

    try {
      setLoading(true);
      const data = await getData(updatedMsgs);
      const assistantMessage = { role: "assistant", content: data };
      updatedMsgs.push(assistantMessage);
    } catch (error) {
      console.log(error);
    } finally {
      setMessages(updatedMsgs);
      setLoading(false);
      setInput("");
    }
  };

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="user-input-container">
      <h1 style={{ textAlign: "center" }}>AiText</h1>
      <div
        ref={ref}
        className="text-convo"
        style={{
          maxHeight: "600px",
          overflowY: "scroll",
        }}
      >
        {messages.length ? (
          messages.map((el, i) => (
            <div key={i} className="message">
              <p>
                <span>{el.role}: </span>
                {el.content}
              </p>
            </div>
          ))
        ) : (
          "Please start your conversation"
        )}
      </div>

      {loading && <div className="loading-indicator">Loading...</div>}

      <div className="input">
        <input
          type="text"
          onChange={(e) => handleInput(e)}
          value={input}
          placeholder="Your message"
        />
        <button
          type="submit"
          onClick={(e) => {
            setMessages([...messages, { role: "user", content: input }]);
            handleSubmit(e);
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default UserInput;




 // <div className="user-input-container">
    //   <input
    //     type="text"
    //     value={input}
    //     onChange={handleInput}
    //     placeholder="Type your message..."
    //   />
    //   <button onClick={handleSubmit}>Send</button>
    // </div>





  // if (input) {
  //     addMessage({ text: input, isUser: true });
  //     setInput("");
  //     try {
  //       const response = await axios.post(
  //         "http://localhost:8000/generate_text",
  //         { input }
  //       );
  //       addMessage({ text: response.data.response, isUser: false });
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  //











// import React, { useState } from 'react';
// import axios from 'axios';
// import './ai.css'; // Import the CSS file

// function UserInput({ addMessage }) {
//   const [input, setInput] = useState('');

//   const handleInput = (e) => {
//     setInput(e.target.value);
//   };

//   const handleSubmit = async () => {
//     if (input) {
//       addMessage(`You: ${input}`);
//       setInput('');
//       try {
//         const response = await axios.post('http://localhost:8000/api/generate_text', { input });
//         addMessage(`AI: ${response.data.response}`);
//       } catch (error) {
//         console.error(error);
//       }
//     }
//   };

//   return (
//     <div className="user-input-container">
//       <input
//         type="text"
//         value={input}
//         onChange={handleInput}
//         placeholder="Type your message..."
//       />
//       <button onClick={handleSubmit}>Send</button>
//     </div>
//   );
// }

// export default UserInput;
