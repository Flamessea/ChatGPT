const OpenAI = require("../../utils/openai");

const chatGPT = new OpenAI(process.env.OPENAI_API_KEY);

const completions = (message) => {
  return chatGPT.completions(
    {
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a user",
        },
        {
          role: "user",
          content: message,
        },
      ],
      temperature: 0.7,
      max_tokens: 100,
      stream: true,
    },
    {
      responseType: "stream",
    }
  );
};

module.exports = {
  completions,
};
