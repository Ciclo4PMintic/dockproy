const Inscription=require('../models/Inscription');
const User=require('../models/User');
const Project=require('../models/Project')
const ErrorResponse = require("../utils/errorResponse");
exports.createInscription = async (req, res,next) => {
  const {  student,
           project,
           
           admissionDate,
           dischargeDate
 } = req.body;

  try {
    const newInscription = new Inscription({
        student,
        project,
        estado:"pendiente",
        admissionDate,
        dischargeDate
    });
    if (req.body.student) {
        const foundStudent = await User.find({ email: { $in: student } });
        newInscription.student = foundStudent.map((user) => user._id);
        console.log( "id---"+newInscription.student)
        
      } else {
        return next(new ErrorResponse("User does not exist", 404));
      }

      if (req.body.project) {
        const foundProject = await Project.find({ _id: { $in: project } });
        newInscription.project = foundProject.map((proyecto) => proyecto._id);
        console.log( "proid---"+newInscription.project)
        
      } else {
        return next(new ErrorResponse("Project does not exist", 404));
      }

      
 const foundInscription = await Inscription.find({student : newInscription.student, project: newInscription.project});
console.log(foundInscription)
var objetodeBusqueda=foundInscription.length
console.log(objetodeBusqueda)
if(foundInscription.length==0){


    const inscriptionSaved = await newInscription.save();

    res.status(201).json(inscriptionSaved);
}
else{
   return next(new ErrorResponse("You are already enrolled", 404));

 }


  } catch (error) {
    console.log(error);
   
  }
};



exports.getInscription = async (req, res) => {
  try{
  const inscription= await Inscription.find();
  console.log(inscription)
  return res.json(inscription);
 
  }
  catch(error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

exports.updateInscriptionById = async (req, res,next) => {
try{

 const updatedInscription = await Inscription.findByIdAndUpdate(
  req.params.inscriptionId,
  req.body,
  {
    new: true,
  }
);
res.status(204).json(updatedInscription);
  


  } catch(error) {
    console.log(error);
    
  }

};

exports.getInscriptionByProject = async (req, res,next) => {
  const project=req.params.project;
  
  console.log("la id del proyecto es"+project)

  try{
   
    const inscription= await Inscription.find({project:project}).populate("student");
    console.log(inscription)

    var objetodeBusqueda=inscription.length
    console.log(objetodeBusqueda)
    if(inscription.length>0){
    
      return res.status(200).json(inscription);
      
    }
    else{
       return next(new ErrorResponse(" There are not inscriptions for this project", 404));
    
     }



  
  
   
 

    // console.log("la inscripcion"+newInscription) 
   
    
    }
    catch(error) {
      console.log(error);
      return res.status(500).json(error);
    }
  

  };



exports.deleteInscriptionById = async (req, res) => {

  try {
  const { inscriptionId } = req.params;

  await Inscription.findByIdAndDelete(inscriptionId);

  // code 200 is ok too
  res.status(204).json();


}
catch (error) {
  console.log(error);
  return res.status(500).json(error);
}



};
exports.getInscriptionByStudent = async (req, res) => {
  const idUser = req.params.student;
  console.log("este es el estudiante"+idUser)

  try{
 
  const user = await User.findOne({email:idUser});
console.log(user)
   const inscription = await Inscription.find({student:user}).populate("project");
   console.log(inscription)
  res.status(200).json(inscription);
  }
  catch
  (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};