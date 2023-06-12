const axios = require("axios");

const DEFAULT_MODEL = "gpt-3.5-turbo";
const ORIGIN = "https://api.openai.com";
const API_VERSION = "v1";
const OPEN_AI_URL = `${ORIGIN}/${API_VERSION}`;

const config = {
  completionURL() {
    return `${OPEN_AI_URL}/chat/completions`;
  },
};

class OpenAI {
  #api_key;
  constructor(api_key) {
    this.#api_key = api_key;
  }

  #fetch(url, method, data, opts) {
    return axios({
      url,
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.#api_key}`,
      },
      data: {
        model: data.model || DEFAULT_MODEL,
        ...data,
      },
      responseType: opts?.responseType || "json",
    });
  }

  completions(data, opts) {
    const url = config.completionURL();
    return this.#fetch(url, "post", data, opts);
  }
}

module.exports = OpenAI;
