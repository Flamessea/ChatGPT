function createApiRouter(dirPath, app) {
  const fs = require("fs");
  const path = require("path");
  const resolvePath = path.resolve(dirPath);
  const files = fs.readdirSync(resolvePath);
  files.forEach((file) => {
    const filePath = `${resolvePath}/${file}`;
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      createApiRouter(filePath);
    } else {
      const routePath = filePath
        .replace(".js", "")
        .replace(".", "")
        .replace(__dirname, "")
        .replace("\\", "/");
      const handler = require(filePath);
      app.get(routePath === "/apis/index" ? "/apis" : routePath, handler);
    }
  });
}

module.exports = {
  createApiRouter,
};
