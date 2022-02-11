const express = require("express");
const uuid = require("uuid");
const members = require("../../Members");
const validateEmail = require("../../utils/validateEmail");

const router = express.Router();

// router.get("/", async (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "index.html"));
// });

router.get("/", async (req, res) => {
  res.json(members);
});

//Get Single Member
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ msg: "Please send an id" });

  if (Number.isNaN(parseInt(id)))
    return res.status(400).json({ msg: "Send a valid id" });

  const member = members.filter((member) => member.id === parseInt(id));

  if (!member.length)
    return res.status(400).json({ msg: `No member with id ${id} found` });

  return res.json(member);
});

router.post("/", async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email)
    return res.status(400).json({ msg: "Name or Email is missing!!!" });

  if (!validateEmail(email))
    return res.status(400).json({ msg: "Enter a valid email ID" });

  const newMember = {
    id: uuid.v4(),
    name,
    email,
    status: "active",
  };

  members.push(newMember);
  return res.json(members);
});

module.exports = router;
