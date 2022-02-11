const members = require("../Members");

exports.getSingleMember = (id) => members.filter((member) => member.id === id);

exports.isMemberFound = (id) => members.some((member) => member.id === id);

exports.getMemberIndex = (id) =>
  members.findIndex((member) => member.id === id);
