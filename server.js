import express from "express";
const app = express();
import cookieParser from "cookie-parser";
import session from "express-session";

app.set("view engine", "ejs");

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(
  session({
    key: "userId",
    secret: "secretkey",
    saveUninitialized: false,
    resave: false,
    store: new MemoryStore(),
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  })
);

app.get("/", (req, res) => {
  if (req.session.page_views) {
    req.session.page_views++;
    res.send("You visited this page " + req.session.page_views + " times");
  } else {
    req.session.page_views = 1;
    res.send("Welcome to this page for the first time!");
  }
});

import userRouter from "./routes/users.js";
import formRouter from "./routes/form.js";
import { MemoryStore } from "express-session";

app.use("/users", userRouter);

app.use("/form", formRouter);

app.listen(3000);
