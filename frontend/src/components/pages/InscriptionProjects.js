import { useState, useEffect } from "react";
import axios from "axios";
import '../css/main.css'
import '../css/Productos.css'
import '../plugins/fontawesome-free/css/all.min.css'
import'../dist/css/adminlte.min.css'
import '../css/crearProducto.css'
import Header from '../Header/Header'
import Footer from "../Footer/Footer";


const InscriptionProjects = ({history}) => {

const [error, setError] = useState("");
  const [leader, setLeader] = useState("");
  const [projectName, setProjectName] = useState("");
  const [objective, setObjective] = useState("");
  const [budget, setBudget] = useState("");
  const [ startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [estado, setEstado] = useState("");
  const [phase, setPhase] = useState("");
  




const [inscripcionesData,setInscripcionesData]=useState([]);

  const [projectData, setProjectData] = useState([
    
  ]);
 
//funciones globales
const z=sessionStorage.getItem("email");

console.log(z)
//headerde conexion
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    },
  };
//actualizar pagina


  const updatePage = async ()=>{
   
      try{
    const { data } = await axios.get("/api/projects/"+z, config);
    console.log(data)
  setProjectData(data);
      }
      catch{
        setError("You are not authorized");
        console.log(error);

      }
    };

   //insertar Proyecto


   



//cargar tabla
  useEffect(() => {
    const fetchUserDate = async () => {
     
      try {
       
        updatePage(z)
      } catch  {
        localStorage.removeItem("authToken");
        setError("You are not authorized");
      }
    };

    fetchUserDate();
  }, [history]);

//traer inscripciones del proyecto
const listarInscripciones = async (projectId)=>{
  
    try{
  const  data2  = await axios.get("/api/inscription/"+projectId, config);
 console.log(data2.data)
 
setInscripcionesData(data2.data);
 
    }
    catch{
      setError("There are not inscriptions for this project");
      console.log(error);

    }
  };

//tomar dato



const aceptarEstado = async (InscripcionId,proeyctoId)=>{
   
  try{
const  data  = await axios.put("/api/inscription/"+InscripcionId,
{
  estado:"Aceptado"
},



config);
console.log(data)
listarInscripciones(proeyctoId)


  }
  catch{
    setError("Inscription problem");
    console.log(error);

  }
};


const denegarEstado = async (InscripcionId,proeyctoId)=>{
   
  try{
const  data  = await axios.put("/api/inscription/"+InscripcionId,
{
  estado:"No autorizado"
},



config);
console.log(data)
listarInscripciones(proeyctoId)


  }
  catch{
    setError("Inscription problem");
    console.log(error);

  }
};
  
return error ? (
  <span className="error-message">{error}</span>
) : (
    <div>
           <Header/>
           <div id="titlepro">
           <h1>Lista Proyectos</h1>

           </div>
        
    <div>
             <table  >
              <tr>
               
                <th>Nombre Proyecto</th>
                <th>Objetivo</th>
                <th>Presupuesto</th>
                <th>Estado</th>
                <th>Fecha Inicio</th>
                <th>Fecha de terminacion</th>
                <th>Fase</th>
               
                <th></th>
                <th></th>
                </tr>
                <tbody>
              {projectData.map((pro ) => (
                <tr  value={pro._id} key={pro._id}>

                 
                  <td>{pro.projectName}</td>
                  <td>{pro.objective}</td>
                  <td>{pro.budget}</td>
               
                  <td>{pro.estado}</td>
                  
                  <td>{pro.startDate}</td>
                  <td>{pro.endDate}</td>
                  <td>{pro.phase}</td>
              

                  <td><button   type="submit" className="btn btn-primary" onClick={()=>listarInscripciones(pro._id)} >Gestionar Inscripciones</button>  </td>

                </tr>
              ))}
            </tbody>
          </table>

<div>
          <div id="titlepro">
           <h1>Lista Inscripciones</h1>

           </div>
           <div>
          
           <table id="tabla2" >
              <tr>
               
                <th>Estudiante</th>
                <th>Estado</th>
                
               
                <th></th>
                <th></th>
                </tr>
                <tbody>
              
              {inscripcionesData.map((ins) => (
               <tr  value={ins._id} key={ins._id}>
                 <td >{ins.student.map((student)=>( <tr value={student._id} key={student._id}> 
                  <td>{student.username}</td> </tr>)) }</td>
                  
                 <td>{ins.estado}</td>

                 
                  
                 <td><button  className="btn btn-success" onClick={()=>aceptarEstado(ins._id,ins.project)} >Aceptar</button>  </td>
                 <td><button  className="btn btn-danger" onClick={()=>denegarEstado(ins._id,ins.project)} >Rechazar</button>  </td>

                  
                 

                  {/* <td><button  className="btn btn-success" onClick={()=>listarInscripciones(pro._id)} >Actualizar</button>  </td> */}

                </tr>
              ))}
            </tbody>
          </table> 
          </div>
          </div>
         

        




        
        <Footer></Footer>  
</div>


</div>
);


};











export default InscriptionProjects;