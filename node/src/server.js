require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
const { apiLogger, errorLogger } = require("./middleware");
const { createApiRouter } = require("./util");

const port = 5000;
const apisDir = "./src/apis";

app.use(
  cors({
    origin: ["http://localhost:3000"],
  })
);
app.use(apiLogger);
app.use(errorLogger);

createApiRouter(apisDir, app);

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
