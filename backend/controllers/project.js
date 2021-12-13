const Project=require('../models/Project');
const User=require('../models/User')
const ErrorResponse = require("../utils/errorResponse");
exports.createProject = async (req, res) => {
  const {  leader,
    projectName,
    Objective,
    budget,
    startDate,
    endDate,
    estado,    
    phase,
    autorizacion } = req.body;

  try {
    const newProject = new Project({
        leader,
        projectName,
        Objective,
        budget,
        startDate,
        endDate,
        estado,    
        phase,
        autorizacion
    });
    if (req.body.leader) {
        const foundleader = await User.find({ email: { $in: leader } });
        newProject.leader = foundleader.map((user) => user._id);
        newProject.autorizacion="Pendiente";
        newProject.estado="inactivo";
        newProject.phase="Pendiente";
      } else {
        return next(new ErrorResponse("User does not exist", 404));
      }

    const projectSaved = await newProject.save();

    res.status(201).json(projectSaved);
  } catch (error) {
    console.log(error);
   
  }
};

exports.getProjectByLeader = async (req, res) => {
  const idUser = req.params.leader;
  console.log("este es el usuario"+idUser)

  try{
 
  const user = await User.findOne({email:idUser});
console.log(user)
   const project = await Project.find({leader:user});
   console.log(project)
  res.status(200).json(project);
  }
  catch
  (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

exports.getProjects = async (req, res) => {
  try{
  const projects= await Project.find().populate("leader");
  return res.json(projects);
  }
  catch(error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

exports.getListProjectsStudents = async (req, res) => {
  try{
  const projects= await Project.find().populate("leader");
  return res.json(projects);
  }
  catch(error) {
    console.log(error);
    return res.status(500).json(error);
  }
};



exports.updateProjectById = async (req, res,next) => {
try{

 const updatedProject = await Project.findByIdAndUpdate(
  req.params.projectId,
  req.body,
  {
    new: true,
  }
);
res.status(204).json(updatedProject);
  


  } catch(error) {
    console.log(error);
    
  }

};



exports.deleteProjectById = async (req, res) => {

  try {
  const { projectId } = req.params;

  await Project.findByIdAndDelete(projectId);

  // code 200 is ok too
  res.status(204).json();


}
catch (error) {
  console.log(error);
  return res.status(500).json(error);
}

};