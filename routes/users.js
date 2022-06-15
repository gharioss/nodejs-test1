import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  res.send("User list");
});

router.get("/new", (req, res) => {
  res.send("User New Form");
});

router.post("/", (req, res) => {
  res.sendStatus("Create User");
});

router
  .route("/:id")
  .get((req, res) => {
    res.send(`Get User with ID ${req.params.id}`);
  })
  .put((req, res) => {
    res.send(`UPDATE User with ID ${req.params.id}`);
  })
  .delete((req, res) => {
    res.send(`DELETE User with ID ${req.params.id}`);
  });

const users = [{ name: "Kyle" }, { name: "Julie" }];

router.param("id", (req, res, next, id) => {
  req.user = users[id];
  next();
});

export default router;
