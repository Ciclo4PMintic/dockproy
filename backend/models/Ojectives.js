const mongoose=require('mongoose');
const ObjectivesSchema = new mongoose.Schema(
  {
    name: String,
    description:String,
  },
  {
    versionKey: false,
  }
);
const Objectives= mongoose.model("Objectives", ObjectivesSchema);
module.exports = Objectives;