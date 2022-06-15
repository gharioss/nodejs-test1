import express from "express";
const router = express.Router();
import con from "../utils/db.js";

export const insertUser = (userValue) => {
  con.connect((err) => {
    const sql = `INSERT INTO users (fname, lname, email) VALUES (?,?,?)`;
    con.query(sql, userValue, (err, result) => {
      if (err) throw err;
      console.log(result);
    });
  });
};
