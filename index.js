const express = require("express");
const cors = require("cors");
const axios = require("axios");
const dotenv = require("dotenv").config();
const OpenAI = require("openai");
const fileUpload = require('express-fileupload');
const pdf = require("pdf-parse");
const multer = require("multer");
const allroutes = require("./routes/routes")
const fs = require("fs");


const app = express();

const API_KEY = process.env.OPENAI_API_KEY;
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
// const apiKey = API_KEY;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

// Multer  Use
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });



const PORT = process.env.PORT || 5000;




app.use("/", allroutes)



app.post("/summarization", upload.array("files", 10), async (req, res) => {
  try {
    // Handle the uploaded files (both TXT and PDF)
    const uploadedFiles = req.files;

    if (!uploadedFiles || uploadedFiles.length === 0) {
      return res
        .status(400)
        .json({ error: "Please upload at least one valid file." });
    }

    const fileContents = [];

    for (const file of uploadedFiles) {
      let content = "";
      if (file.mimetype === "text/plain") {
        // Read the contents of a TXT file
        content = file.buffer.toString("utf-8");
      } else if (file.mimetype === "application/pdf") {
        // Read the contents of a PDF file
        // let dataBuffer = fs.readFileSync(file);

        const pdfData = await pdf(file.buffer);
        content = pdfData.text;
      }

      fileContents.push(content);
    }

    // Create conversation messages with system message, user request, and file contents
    const summaryRequest = req.body.summaryRequest;
    const messages = [
      { role: "system", content: "You are a summarization assistant." },
      { role: "user", content: "please make the summary of the content from below files" },
      ...fileContents.map((content) => ({ role: "user", content })),
    ];

    // Request a summary from the OpenAI model
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages,
    });

    // Return the generated summary to the client
    res.json({ summary: response.choices[0].message.content });
  } catch (error) {
    console.error("Error in /summarization route:", error);
    res
      .status(500)
      .json({ error: "An error occurred while processing the request." });
  }
});


// app.post('/summarization', upload.array('files', 10), async (req, res) => {
//   try {
//     const uploadedFiles = req.files;

//     if (!uploadedFiles || uploadedFiles.length === 0) {
//       return res
//         .status(400)
//         .json({ error: 'Please upload at least one valid file.' });
//     }

//     const fileContents = [];

//     for (const file of uploadedFiles) {
//       let content = '';
//       if (file.mimetype === 'text/plain') {
//         content = file.buffer.toString('utf-8');
//       } else if (file.mimetype === 'application/pdf') {
//         const pdfData = await pdf(file.buffer);
//         content = pdfData.text;
//       }

//       fileContents.push(content);
//     }

//     const summaryRequest = req.body.summaryRequest;
//     const messages = [
//       { role: 'system', content: 'You are a summarization assistant.' },
//       { role: 'user', content: 'Please make a summary of the content from the below files:' },
//       ...fileContents.map((content) => ({ role: 'user', content })),
//     ];

//     // Request a summary from the OpenAI model (make sure your OpenAI setup is correct)
//     const openai = new OpenAIApi({ key: API_KEY }); // Replace with your OpenAI API key.
//     const response = await openai.createChatCompletion({
//       model: 'gpt-3.5-turbo',
//       messages,
//     });

//     res.json({ summary: response.choices[0].message.content });
//   } catch (error) {
//     console.error('Error in /summarization route:', error);
//     res
//       .status(500)
//       .json({ error: 'An error occurred while processing the request.' });
//   }
// });

























app.listen(PORT, (req, res) => {
  console.log(`Server started in http://localhost:${PORT}`);
});


// app.get("/", async (req, res) => {
//   res.status(200).send("Welcome to Home Page..!");
// });

// Chat GPT Post Request
// app.post("/convert", async (req, res) => {
//   const { code, lang } = req.body;

//   try {
  //     const response = await axios.post(
//       "https://api.openai.com/v1/engines/text-davinci-002/completions",
//       {
  //         prompt: `Convert This ${code} to ${lang} Programming language`,
//         max_tokens: 500,
//         temperature: 1,
//       },
//         headers: {
//           Authorization: `Bearer ${API_KEY}`,
//         },
//       }
//     );

//     const convertedCode = response.data.choices[0].text;
//     res.json({ convertedCode });
//   } catch (error) {
//     console.error("Error converting code:", error);
//     res.status(500).json({ error: "Error converting code" });
//   }
// });

// Content Generator

// app.post("/api/generate_text", async (req, res) => {
//   const { input } = req.body;

//   try {
//     const response = await axios.post(
//       "https://api.openai.com/v1/engines/text-davinci-002/completions",
//       {
  //         prompt: `Assume you are a wikipedia engine Give me total information about the ${input}`,
  //         max_tokens: 1500, // Adjust the response length as needed
//         temperature: 1,
//         top_p: 1,
//         frequency_penalty: 1,
//         presence_penalty: 1,
//       },
//       {
  //         headers: {
    //           Authorization: `Bearer ${API_KEY}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     res.json({ response: response.data.choices[0].text });
//   } catch (error) {
  //     console.error(error);
//     res.status(500).json({ error: "An error occurred" });
//   }
// });

// ---------------------------------------------------------------------------------


// app.post('/api/extract_data', async (req, res) => {
  
// });

//       {