import { Router } from "express";
import Infos from "../usermessages.js";

const router = Router();

router.post("/postmessage", (req, res) => {
  const dbUser = req.body;

  Infos.create(dbUser, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

export default router;
