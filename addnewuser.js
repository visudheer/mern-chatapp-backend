import mongoose from "mongoose";

const newUser = mongoose.Schema({
  chatusername: String,
  chatuseremail: String,
  chatuserimgUrl: String,
  chatusertimestamp: String,
  currentuseremail: String,
});

export default mongoose.model("newUsers", newUser);
