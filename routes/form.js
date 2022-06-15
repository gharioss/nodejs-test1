import express from "express";
const router = express.Router();
import con from "../utils/db.js";

import { insertUser } from "../model/insert.js";
import { selectUsers } from "../model/select.js";
import { deleteUser } from "../model/delete.js";
import { editUser } from "../model/edit.js";

router.get("/", async (req, res) => {
  const allUser = await selectUsers();
  res.render("form", { users: allUser });
});

router.post("/test", (req, res) => {
  console.log(req.body);
  const userValue = [req.body.firstname, req.body.lastname, req.body.email];
  insertUser(userValue);
  res.redirect("/form");
});

router.get("/:id", async (req, res) => {
  const user = await selectUsers(req.params.id);
  res.render("edit", { user: user[0] });
});

router.get("/delete/:id", async (req, res) => {
  console.log("hello this is deleted");
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
