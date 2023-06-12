import { Router } from "express";
import addnewuser from "../addnewuser.js";

const router = Router();

router.post("/newuser", (req, res) => {
  const newuser = req.body;
  addnewuser.create(newuser, (err, data) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

export default router;
