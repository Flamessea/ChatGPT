const GptV3 = require("../gpt/v3");

const gptV3 = new GptV3();

module.exports = async (req, res) => {
  const result = await gptV3.sendMessage("say hello");
  res.json(result.data);
};
