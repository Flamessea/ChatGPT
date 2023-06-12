const { completions } = require("../gpt/v3");

module.exports = {
  handler: async (req, res) => {
    try {
      const { message } = req.body;
      const response = await completions(message);
      res.setHeader("Content-Type", "application/json");
      response.data.on("data", (chunk) => {
        try {
          const chunkStr = chunk.toString().trim();
          const chunkData = JSON.parse(
            `${chunkStr.replace(/^data:\s*/, "").trim()}`
          );
          const chunkMessage = JSON.stringify(chunkData.choices[0].delta);
          res.write(Buffer.from(chunkMessage));
        } catch (error) {
          // console.error(error);
        }
      });
      response.data.on("end", () => {
        res.end();
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error fetching data from ChatGPT" });
    }
  },
  methods: "post",
};
