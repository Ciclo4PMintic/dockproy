const mongoose=require('mongoose');
 exports.ROLES= ["user", "admin", "moderator"];

const roleSchema = new mongoose.Schema(
  {
    name: String,
  },
  {
    versionKey: false,
  }
);

const Role= mongoose.model("Role", roleSchema);
module.exports = Role;
