const { Configuration, OpenAIApi } = require("openai");

const initConfig = {
  organization: process.env.OPENAI_ORGANIZATION_ID,
  apiKey: process.env.OPENAI_API_KEY,
};

class GptV3 {
  constructor(config) {
    this.configuration = new Configuration(config || initConfig);
  }

  get gptV3() {
    if (!global.GptV3) {
      global.GptV3 = new OpenAIApi(this.configuration);
    }
    return global.GptV3;
  }

  async getListModels() {
    return await this.gptV3.listModels();
  }

  async sendMessage(message) {
    return await this.gptV3.createCompletion({
      model: "text-davinci-003",
      prompt: message,
      max_tokens: 7,
      temperature: 0,
    });
  }
}

module.exports = GptV3;
