const express = require("express");
const path = require("path");
const logger = require("./middleware/logger");
const membersRouter = require("./routes/api/members");

const PORT = process.env.PORT || 4000;

const app = express();

//Set static folder
app.use(express.static(path.join(__dirname, "public")));

//Parse incoming data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//User made middleware
app.use(logger);

//members routes
app.use("/api/members", membersRouter);

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
