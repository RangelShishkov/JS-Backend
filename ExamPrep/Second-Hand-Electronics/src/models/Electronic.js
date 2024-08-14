const mongoose = require("mongoose");

const electronicSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  damages: { type: String, required: true },
  image: { type: String, required: true,
    match:[/^https?:\/\/.+/, "Provide valid creature image link!"]
   },
  description: { type: String, required: true, maxLength: 500 },
  production: { type: Number, required: true },
  exploitation: { type: Number, required: true },
  price:{ type: Number, required: true },
  buyingList: [
    {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  ],
  owner: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});

const Electronic = mongoose.model("Electronic", electronicSchema);

module.exports = Electronic;
