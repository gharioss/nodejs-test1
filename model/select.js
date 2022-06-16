import express from "express";
import con from "../utils/db.js";

import bcrypt from "bcryptjs";
const saltRounds = 10;

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

export const login = (user) => {
  return new Promise((resolve, reject) => {
    con.connect((err) => {
      const sql = "SELECT * FROM users WHERE email = ?";
      con.query(sql, user[0], (err, result, fields) => {
        if (err) reject(err);

        if (result[0]) {
          bcrypt.compare(user[1], result[0].password, (error, response) => {
            if (response) {
              resolve(result);
            }
          });
        } else {
          resolve({ message: "User doesn't exist" });
        }
      });
    });
  });
};
