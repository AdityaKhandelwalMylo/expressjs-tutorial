const express = require("express");
const uuid = require("uuid");
const members = require("../../Members");
const {
  getSingleMember,
  isMemberFound,
  getMemberIndex,
} = require("../../utils/helperFunctions");
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

  const member = getSingleMember(parseInt(id));

  if (!member.length)
    return res.status(400).json({ msg: `No member with id ${id} found` });

  return res.json(member);
});

//Add a member
router.post("/", async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email)
    return res.status(400).json({ msg: "Please include a name and email" });

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

//Update a member
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ msg: "Please send an id" });

  if (Number.isNaN(parseInt(id)))
    return res.status(400).json({ msg: "Send a valid id" });

  const { name, email } = req.body;

  if (email && !validateEmail(email))
    return res.status(400).json({ msg: "Enter a valid email ID" });

  const memberFound = isMemberFound(parseInt(id));

  if (!memberFound)
    return res.status(400).json({ msg: `No member with id ${id} found` });

  members.forEach((member) => {
    if (member.id === parseInt(id)) {
      member.name = name ? name : member.name;
      member.email = email ? email : member.email;
      return res.json({ msg: "Member updated", member });
    }
  });
});

//Delete a member
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ msg: "Please send an id" });

  if (Number.isNaN(parseInt(id)))
    return res.status(400).json({ msg: "Send a valid id" });

  const index = getMemberIndex(parseInt(id));
  if (index > -1) members.splice(index, 1);

  return res.json({ msg: "Member deleted", members });
});

module.exports = router;
