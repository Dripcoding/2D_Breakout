// Dependencies
const express = require("express");
const app = express();
const server = require("http").Server(app);
const helmet = require("helmet");
const cors = require("cors");
const path = require("path");

const PORT = process.env.PORT || 8081;

// middleware
app.use(helmet());
app.use(express.json());
app.use(cors());

// render the static files
app.use(express.static(path.join(__dirname, "dist")));

// Root - server serves index.html
app.get("/", (req, res) => {
  res.sendFile(__dirname + "dist/index.html");
});

// start server at port 8081
server.listen(PORT, () => {
  console.log(`\n==API Running on port ${PORT} ==\n`);
});
