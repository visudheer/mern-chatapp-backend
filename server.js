import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Pusher from "pusher";
import cors from "cors";
import postMessage from "./routes/postMessagesRoute.js";
import getMessages from "./routes/getMessagesRoute.js";
import postActiveUsers from "./routes/postActiveUsers.js";
import getActiveUsers from "./routes/getActiveUsers.js";
import authentication from "./authentication.js";
import addUser from "./routes/addUser.js";
import getUsers from "./routes/getUsers.js";

const app = express();
const port = process.env.PORT || 9000;
dotenv.config();
const baseUrl = "/v1/app/";

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.PUSHER_CLUSTER,
  useTLS: true,
});

app.use(express.json());
app.use(cors({ credentials: true, origin: true }));

app.use(authentication);

mongoose.connect(process.env.CONNECTION_URL, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.once("open", () => {
  const activeuserCollection = db.collection("newusers");
  const changeStream1 = activeuserCollection.watch();
  changeStream1.on("change", (change) => {
    if (change.operationType === "insert") {
      const userDetails = change.fullDocument;
      pusher.trigger("currentuseremail", "inserted", {
        chatusername: userDetails.name,
        chatuseremail: userDetails.email,
        chatuserimgUrl: userDetails.imgUrl,
        chatusertimestamp: userDetails.timestamp,
        currentuseremail: userDetails.currentuseremail,
      });
    } else {
      console.log("error pusher");
    }
  });

  const userCollection = db.collection("usermessages");
  const changeStream2 = userCollection.watch();
  changeStream2.on("change", (change) => {
    if (change.operationType === "insert") {
      const userDetails = change.fullDocument;
      pusher.trigger("message", "inserted", {
        id: userDetails.id,
        sendername: userDetails.sendername,
        receivername: userDetails.receivername,
        senderemail: userDetails.senderemail,
        receiveremail: userDetails.receiveremail,
        message: userDetails.message,
        timestamp: userDetails.timestamp,
      });
    } else {
      console.log("error pusher");
    }
  });
});

app.use(baseUrl, postMessage);

app.use(baseUrl, getMessages);

app.use(baseUrl, postActiveUsers);

app.use(baseUrl, getActiveUsers);

app.use(baseUrl, addUser);

app.use(baseUrl, getUsers);

app.listen(port, () => console.log(`listening at ${port}`));
