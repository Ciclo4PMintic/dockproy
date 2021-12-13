const Advance=require('../models/Advance')
const User=require('../models/User');
const Project=require('../models/Project')
const ErrorResponse = require("../utils/errorResponse");
exports.createAdvance = async (req, res,next) => {
  const {  
    project,
    student,
    creationDate,
    descripcion,
    observacion
   
     } = req.body;

  try {
    const newAdvance = new Advance({
    project,
    student,
    creationDate,
    descripcion,
    observacion
    });
    if (req.body.student) {
        const foundStudent = await User.find({ email: { $in: student } });
        newAdvance.student = foundStudent.map((user) => user._id);
       
        
      } else {
        return next(new ErrorResponse("User does not exist", 404));
      }

      if (req.body.project) {
        const foundProject = await Project.find({ _id: { $in: project } });
        newAdvance.project = foundProject.map((proyecto) => proyecto._id);
        
        
      } else {
        return next(new ErrorResponse("Project does not exist", 404));
      }

      
 


    const AdvanceSaved = await newAdvance.save();

    res.status(201).json(AdvanceSaved);



  } catch (error) {
    console.log(error);
    next(new ErrorResponse("Advance can't be created", 404))
   
  }
};



exports.getAdvanceByStudent = async (req, res, next) => {
    const idUser = req.params.student;
    console.log("este es el estudiante"+idUser)
  
    try{
   
    const user = await User.findOne({_id:idUser});
  console.log(user)
     const myAdvances = await Advance.find({student:user}).populate("project");
     console.log(myAdvances)


     if(myAdvances.length>0){
    
      return res.status(200).json(myAdvances);
      
    }
    else{
       return next(new ErrorResponse(" You do not have advances in this project", 404));
    
     }



    
    }
    catch
    (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  };

exports.updateAdvanceById = async (req, res,next) => {
  console.log("lo estamos haciendo")
try{

 const updatedAdvance = await Advance.findByIdAndUpdate(
  req.params.advanceId,
  req.body,
  {
    new: true,
  }
);
res.status(204).json(updatedAdvance);
console.log("enviado"+updatedAdvance)
  


  } catch(error) {
    console.log(error);
    next(new ErrorResponse("no hay id", 404))

    
  }

};




exports.deleteAdvanceById = async (req, res) => {

  try {
  const { advanceId } = req.params;

  await Advance.findByIdAndDelete(advanceId);

  // code 200 is ok too
  res.status(200).json();


}
catch (error) {
  console.log(error);
  return res.status(500).json(error);
}



};

exports.getAdvanceByProject = async (req, res,next) => {
  const project=req.params.project;
  
  console.log("la id del proyecto es"+project)

  try{
   
    const advance= await Advance.find({project:project}).populate("student");
    console.log(advance)

    var objetodeBusqueda=advance.length
    console.log(objetodeBusqueda)
     if(advance.length>0){
    
      return res.status(200).json(advance);
      
    }
      else{
       return next(new ErrorResponse(" There are not advances for this project", 404));
    
    }
    }
    catch(error) {
      console.log(error);
      return res.status(500).json(error);
    }
    };