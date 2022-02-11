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

//Get Single Member
app.get("/api/member/:id", async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).send("Please send an id");

  if (Number.isNaN(parseInt(id)))
    return res.status(400).send("Send a valid id");

  const member = members.filter((member) => member.id === parseInt(id));

  if (!member.length)
    return res.status(400).send(`No member with id ${id} found`);

  return res.json(member);
});

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
