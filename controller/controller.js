const axios = require("axios");
const OpenAI = require("openai");
const fs = require("fs");
const pdf = require("pdf-parse");
const multer = require("multer");
const { text } = require("express");
const API_KEY = process.env.OPENAI_API_KEY;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const homeGet = async (req, res) => {
  res.status(200).send("Welcome to Home Page..!");
};

const convertCode = async (req, res) => {
  const { code, lang } = req.body;
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/engines/text-davinci-002/completions",
      {
        prompt: `Convert This ${code} to ${lang} Programming language`,
        max_tokens: 500,
        temperature: 1,
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );

    const convertedCode = response.data.choices[0].text;
    res.json({ convertedCode });
  } catch (error) {
    console.error("Error converting code:", error);
    res.status(500).json({ error: "Error converting code" });
  }
};

const generateTextRoute = async (req, res) => {
  const { messages } = req.body;
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages,
      temperature: 1,
      n: 1,
      max_tokens: 100,
    });

    res.json({ message: response.choices[0].message.content });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
};

// const convertPdf =  (upload.array("files", 10), async (req, res) => {
//   try {
//     // Handle the uploaded files (both TXT and PDF)
//     const uploadedFiles = req.files;

//     if (!uploadedFiles || uploadedFiles.length === 0) {
//       return res
//         .status(400)
//         .json({ error: "Please upload at least one valid file." });
//     }

//     const fileContents = [];

//     for (const file of uploadedFiles) {
//       let content = "";
//       if (file.mimetype === "text/plain") {
//         // Read the contents of a TXT file
//         content = file.buffer.toString("utf-8");
//       } else if (file.mimetype === "application/pdf") {
//         // Read the contents of a PDF file
//         // let dataBuffer = fs.readFileSync(file);

//         const pdfData = await pdf(file.buffer);
//         content = pdfData.text;
//       }

//       fileContents.push(content);
//     }


//     // Create conversation messages with system message, user request, and file contents
//     const summaryRequest = req.body.summaryRequest;
//     const messages = [
//       { role: "system", content: "You are a summarization assistant." },
//       {
//         role: "user",
//         content: "please make the summary of the content from below files",
//       },
//       ...fileContents.map((content) => ({ role: "user", content })),
//     ];

//     // Request a summary from the OpenAI model
//     const response = await openai.chat.completions.create({
//       model: "gpt-3.5-turbo",
//       messages,
//     });

//     // Return the generated summary to the client
//     res.json({ summary: response.choices[0].message.content });
//   } catch (error) {
//     console.error("Error in /summarization route:", error);
//     res
//       .status(500)
//       .json({ error: "An error occurred while processing the request." });
//   }
// });

const extractData = async (req, res) => {
  try {
    const { input } = req.body;

    // Use the OpenAI GPT-3.5 Turbo model to analyze sentiment and recognize emotions
    const messages = [
      { role: 'system', content: 'You are an emotion recognition assistant.' },
      { role: 'user', content: `analyze the text and give me only one word response for this"${input}"` },
      // { role: 'user', content: `analyze my feeling and give me the response based on my feeling in the multiple language which i spoke ${text}` },
    ];
    // you are my emotional supporter what ever i ask you that you have to answer me in any language ${userText
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages,
    });

    // Extract sentiment and emotion analysis results
    const result = response.choices[0].message.content;

    res.json({ result });
  } catch (error) {
    console.error('Error in analyze route', error);
    res.status(500).json({ error: 'An error occurred while processing the request.' });
  }
};

module.exports = {
  generateTextRoute,
  convertCode,
  homeGet,
  extractData,
  // convertPdf,
};
