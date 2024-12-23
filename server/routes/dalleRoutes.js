import express from "express";
import * as dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai"; // Correct import

dotenv.config();

const router = express.Router();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

// Get route to check the API
router.route("/").get((req, res) => {
  res.status(200).json({ message: "Hello from DALL-E!" });
});

// Post route to generate an image using the prompt
router.route("/").post(async (req, res) => {
  try {
    const { prompt } = req.body;

    // Create image request to OpenAI API
    const aiResponse = await openai.createImage({
      prompt,
      n: 1,
      size: "1024x1024",
      response_format: "b64_json",
    });

    // Return the AI-generated image as response
    res.status(200).json({
      image: aiResponse.data[0].b64_json, // Ensure this matches the OpenAI API response format
    });
  } catch (error) {
    console.error("Error generating image:", error);
    res
      .status(500)
      .json({ message: "Failed to generate image", error: error.message });
  }
});

export default router;
