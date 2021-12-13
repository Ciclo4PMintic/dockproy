import { useState, useEffect } from "react";
import axios from "axios";
import '../css/main.css'
import '../css/Productos.css'
import '../plugins/fontawesome-free/css/all.min.css'
import'../dist/css/adminlte.min.css'
import '../css/crearProducto.css'
import Header from '../Header/Header'
import Footer from "../Footer/Footer";




const ProjectList = ({history}) => {

    //llamar dato
  const [error, setError] = useState("");
 const[success,setSuccess]=useState("");
  const[project,setProject]=useState("");






  const [projectData, setProjectData] = useState([
    
  ]);
//funciones globales
const z=sessionStorage.getItem("email");
let m= "";
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
    const { data } = await axios.get("/api/projects/listProjects", config);
    setProjectData(data);
   
    }
    catch{
        setError("You are not authorized");
        console.log(error);
    }
    };

    


//cargar tabla
  useEffect(() => {
    const fetchProyectosDate = async () => {
     
      try {
       
        updatePage()
     
      } catch  {
        localStorage.removeItem("authToken");
        setError("You are not authorized please login");
      }
    };

    fetchProyectosDate();
  }, [history]);

  
//Inscripcion Proyecto
const inscripcionProyecto = async (idProj, estado)=>{
if(estado=="activo"){

    try{
    await axios.post(
      "/api/inscription",
      { student:z,
       
          project:idProj,
          
         },
      config
    );
    
setSuccess("Enrolled awaits authorization")
  
  
    }
    catch{
      console.log(error)
      setError("You are already enrolled")
    }
  }
  else{
    setError("The project is not active so you can't enroll")
  }
    }


    
      



  
  
  
  
  
  
  
  
  





  
  return error ? (
    <span className="error-message">{error}</span>
  ) : (
       <div>
           <Header/>
           <div id="titlepro">
           <h1>Lista Proyectos</h1>
           <span className="success-message">{success}</span>
           </div>
        
    <div className="productos">
             <table  >
              <tr>
                <th>Lider</th>
                <th>Nombre Proyecto</th>
                <th>Objetivo</th>
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



                  <td>{pro.leader.map((retro)=>(<tr value={retro._id} key={retro.id}>
                    <td>{retro.username}</td>
                  </tr>))}</td>
                  <td>{pro.projectName}</td>
                  <td>{pro.objective}</td>
              
               
                  <td>{pro.estado}</td>
               
                  <td>{pro.startDate}</td>
                  <td>{pro.endDate}</td>
                  <td>{pro.phase}</td>
              
                  <td><button  className="btn btn-primary" onClick={()=>inscripcionProyecto(pro._id,pro.estado)} >Incribirse</button>  </td>

                
                </tr>
              ))}
            </tbody>
          </table>

</div>



          






          
          <Footer></Footer>  
  </div>
  );

  
};











export default ProjectList;