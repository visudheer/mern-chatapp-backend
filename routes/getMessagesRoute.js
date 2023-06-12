import { Router } from "express";
import Infos from "../usermessages.js";

const router = Router();

router.get("/getmessages", async (req, res) => {
  try {
    const infos = await Infos.find();
    res.status(200).send(infos);
  } catch (err) {
    res.status(400).send(err);
  }
});

export default router;
