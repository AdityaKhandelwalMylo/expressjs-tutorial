const express = require("express");
const path = require("path");
const members = require("./Members");
const logger = require("./middleware/logger");

const PORT = process.env.PORT || 4000;

const app = express();

//Set static folder
app.use(express.static(path.join(__dirname, "public")));
app.use(logger);

// app.get("/", async (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "index.html"));
// });

app.get("/api/members", async (req, res) => {
  res.json(members);
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
