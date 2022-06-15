import express from "express";
const app = express();
import con from "./utils/db.js";

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index", { text: "World" });
});

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

import userRouter from "./routes/users.js";
import formRouter from "./routes/form.js";

app.use("/users", userRouter);

app.use("/form", formRouter);

app.listen(3000);
