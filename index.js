const express = require("express");
const cors = require("cors");
const axios = require("axios");
const dotenv = require("dotenv").config();

const app = express();

const API_KEY = process.env.OPENAI_API_KEY;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;

app.get("/", async (req, res) => {
  res.status(200).send("Welcome to Home Page..!", process.env.OPENAI_API_KEY);


});




// Chat GPT Post Request
app.post("/convert", async (req, res) => {
  const { code, lang } = req.body;

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/engines/text-davinci-003/completions",
      {
        prompt: `Convert This ${code} to ${lang} Programming language`,
        max_tokens: 100,
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
});

app.listen(PORT, (req, res) => {
  console.log(`Server started in http://localhost:${PORT}`);
});
