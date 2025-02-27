const OpenAI = require('openai');
require('dotenv').config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY, // Ensure your .env file has this key
});

const generateNarrative = async (commitData) => {
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [
                { role: "system", content: "Summarize the coding journey based on commit history." },
                { role: "user", content: JSON.stringify(commitData) }
            ],
            max_tokens: 250
        });

        return response.choices[0].message.content;
    } catch (error) {
        console.error("Error generating narrative:", error);
        return "Error generating narrative. Please try again.";
    }
};

module.exports = { generateNarrative };
