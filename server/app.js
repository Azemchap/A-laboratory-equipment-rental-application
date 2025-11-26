const express = require("express");
const ParseServer = require("parse-server").ParseServer;
const bodyParser = require("body-parser");
const path = require("path");
const http = require("http");
var cors = require("cors");

require("dotenv").config();
require("./bin/setRetarded");
const { seedDefaultUsers } = require("./bin/auto-seed");

let api = new ParseServer({
  databaseURI: process.env.DATABASE_URI,
  cloud: process.env.CLOUD,
  appId: process.env.APP_ID,
  masterKey: process.env.MASTER_KEY,
  serverURL: process.env.SERVER_URL,
  allowClientClassCreation: process.env.CLIENT_CLASS_CREATION === 'true',
  expireInactiveSessions: true,
  sessionLength: parseInt(process.env.PARSE_SERVER_SESSION_LENGTH) || 31536000,
  fileKey: "optionalFileKey",
});

const PORT = process.env.PORT;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const authRoute = require("./routes/auth");
const usersRoute = require("./routes/user");
const itemRoute = require("./routes/item");
const rentRoute = require("./routes/rent");
const staticsRoute = require("./routes/statics");

app.use(express.json());

// Serve the Parse API on the /parse URL prefix
const mountPath = "/parse";
app.use(mountPath, api.app);

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/items", itemRoute);
app.use("/api/rent", rentRoute);
app.use("/api/statics", staticsRoute);

// Start Parse Server then start Express
api.start().then(() => {
  app.listen(PORT, function () {
    console.log(`✅ Server running on port ${PORT}`);
    console.log(`📊 Parse Server running at http://localhost:${PORT}${mountPath}`);

    // Auto-seed default users if database is empty
    setTimeout(() => {
      seedDefaultUsers();
    }, 1000);
  });
}).catch((error) => {
  console.error('❌ Failed to start Parse Server:', error);
  process.exit(1);
});
