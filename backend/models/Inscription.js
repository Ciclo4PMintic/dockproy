const mongoose=require('mongoose');
const InscriptionSchema = new mongoose.Schema(
  {
    student: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
      project: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Project",
        },
      ],
    estado: String,
    admissionDate: String,
    dischargeDate: String,
      },
  {
    timestamps: true,
    versionKey: false
  }
);
 const Inscription= mongoose.model("Inscription", InscriptionSchema);
 module.exports = Inscription;