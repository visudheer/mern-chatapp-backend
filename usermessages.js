import mongoose from "mongoose";

const usermessageSchema = mongoose.Schema({
  id: String,
  sendername: String,
  receivername: String,
  senderemail: String,
  receiveremail: String,
  timestamp: String,
  message: String,
});

export default mongoose.model("usermessages", usermessageSchema);
