import { Schema, model, models } from "mongoose";

const TokenSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  token: {
    type: String,
    requieed: true,
  },
});

const Token = models.Token || model("Token", TokenSchema);

export default Token;
