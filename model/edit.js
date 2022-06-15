import express from "express";
const router = express.Router();
import con from "../utils/db.js";

export const editUser = (userValue) => {
  con.connect((err) => {
    const sql = `UPDATE users SET fname = ?, lname = ?, email = ? WHERE id = ?`;
    con.query(sql, userValue, (err, result) => {
      if (err) throw err;
      console.log(result);
    });
  });
};
