import express from "express";
import con from "../utils/db.js";

export const selectUsers = (id) => {
  let sqlFullRequest = "";
  if (id) {
    sqlFullRequest = ` WHERE id = ${id}`;
  }
  return new Promise((resolve, reject) => {
    con.connect((err) => {
      const sql = "SELECT * FROM users" + sqlFullRequest;
      con.query(sql, (err, result, fields) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  });
};
