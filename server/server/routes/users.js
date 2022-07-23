const express = require("express");
const bcrypt = require("bcrypt");
const usersManager = require("../services/usersManager");
const router = express.Router();

router.post("/register", async (req, res) => {
  const { userName, password, firstName, lastName, email, company, isAdmin } =
    req.body;
  const user = await usersManager.getUser(userName);
  if (user) {
    res.status(400).send("User already exists");
  } else {
    //const hash = await bcrypt.hash(password, 10);
    const newUser = await usersManager.createUser(
      userName,
      password,
      firstName,
      lastName,
      email,
      company,
      isAdmin
    );
    res.status(201).send(newUser);
  }
});

router.post("/login", async (req, res) => {
  const { userName, password } = req.body;
  const user = await usersManager.getUser(userName);
  if (user) {
    const isValid = await bcrypt.compare(password, user.password);
    if (isValid) {
      res.status(200).send(user);
    } else {
      res.status(400).send("Invalid password");
    }
  } else {
    res.status(400).send("User does not exist");
  }
});

module.exports = router;
