import { Router } from "express";
import activeusers from "../activeusers.js";

const router = Router();

router.get("/getactiveusers", (req, res) => {
  activeusers
    .find()
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(400).send(err));
});

export default router;
