import express from "express";
const router = express.Router();
import con from "../utils/db.js";

import { insertUser } from "../model/insert.js";
import { selectUsers, login } from "../model/select.js";
import { deleteUser } from "../model/delete.js";
import { editUser } from "../model/edit.js";

import bcrypt from "bcryptjs";
const saltRounds = 10;

router.get("/", async (req, res) => {
  const allUser = await selectUsers();
  let userCookie = "";
  if (req.session.user) {
    userCookie = req.session.user;
  }
  res.render("form", { users: allUser, cookieUser: userCookie });
});

router.post("/test", (req, res) => {
  const userValue = [req.body.firstname, req.body.lastname, req.body.email];
  const password = req.body.password;

  bcrypt.hash(password, saltRounds, async (err, hash) => {
    userValue.push(hash);
    insertUser(userValue);

    res.redirect("/form");
  });
});

router.post("/login", async (req, res) => {
  const userValue = [req.body.email, req.body.password];

  const user = await login(userValue);
  if (!user.message) {
    req.session.user = user;
  }

  res.redirect("/form");
});

router.get("/logout", (req, res) => {
  res.clearCookie("userId");
  res.redirect("/form");
});

router.get("/:id", async (req, res) => {
  const user = await selectUsers(req.params.id);
  res.render("edit", { user: user[0] });
});

router.get("/delete/:id", async (req, res) => {
  const deleteThisUser = [req.params.id];

  deleteUser(deleteThisUser);
  res.redirect("/form");
});

router.post("/edit/:id", async (req, res) => {
  const userToEdit = [
    req.body.firstname,
    req.body.lastname,
    req.body.email,
    req.params.id,
  ];

  editUser(userToEdit);
  res.redirect("/form");
});

export default router;
