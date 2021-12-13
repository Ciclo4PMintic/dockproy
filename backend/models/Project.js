const mongoose=require('mongoose');
const ProjectSchema = new mongoose.Schema(
  {
    leader: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
    projectName: String,
    Objective:String,
    budget:Number,
    startDate: String,
    endDate: String,
    estado:String,
    phase:String,
    autorizacion:String
  },
  {
    timestamps: true,
    versionKey: false
  }
);
 const Project= mongoose.model("Project", ProjectSchema);
 module.exports = Project;