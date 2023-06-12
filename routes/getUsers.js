import { Router } from "express";
import addnewuser from "../addnewuser.js";

const router = Router();

router.get("/getnewusers", async (req, res) => {
  await addnewuser
    .find({ currentuseremail: req.query.useremail })
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(400).send(err));
});

export default router;
