import express from "express";
const router = express.Router();
import con from "../utils/db.js";

export const deleteUser = (idUser) => {
  con.connect((err) => {
    const sql = `DELETE FROM users WHERE id = ?`;
    con.query(sql, parseInt(idUser), (err, result) => {
      if (err) throw err;
      console.log(result);
    });
  });
};
