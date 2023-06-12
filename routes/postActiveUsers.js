import { Router } from "express";
import activeusers from "../activeusers.js";

const router = Router();

router.post("/activeuser", async (req, res) => {
  const activeuser = req.body;

  await activeusers.find({ email: req.body.email }).then((data) => {
    if (data.length == 0) {
      activeusers.create(activeuser, (err, data) => {
        if (err) {
          res.status(400).send(err);
        } else {
          res.status(201).send(data);
        }
      });
    } else {
      res.status(409).send({ email: req.body.email, status: "EXISTS" });
    }
  });
});

export default router;
