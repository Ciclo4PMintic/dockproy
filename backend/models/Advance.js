const mongoose=require('mongoose');
const AdvanceSchema = new mongoose.Schema(
  {
    project: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Project",
        },
      ],
    student: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
    creationDate: String,
    descripcion: String,
    observacion: String,
     },
  {
    timestamps: true,
    versionKey: false
  }
);
 const Advance= mongoose.model("Advance", AdvanceSchema);
 module.exports = Advance;