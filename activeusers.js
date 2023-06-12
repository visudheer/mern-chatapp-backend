import mongoose from "mongoose";

const activeUsersSchema = mongoose.Schema({
  name: String,
  email: String,
  imgUrl: String,
  timestamp: String,
});

export default mongoose.model("activeusers", activeUsersSchema);
