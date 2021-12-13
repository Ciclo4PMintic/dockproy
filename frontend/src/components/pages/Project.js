import { useState, useEffect } from "react";
import axios from "axios";
import '../css/main.css'
import '../css/Productos.css'
import '../plugins/fontawesome-free/css/all.min.css'
import'../dist/css/adminlte.min.css'
import '../css/crearProducto.css'
import Header from '../Header/Header'
import Footer from "../Footer/Footer";




const Project = ({history}) => {

    //llamar dato
  const [error, setError] = useState("");
  const [leader, setLeader] = useState("");
  const [projectName, setProjectName] = useState("");
  const [objective, setObjective] = useState("");
  const [budget, setBudget] = useState("");
  const [ startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [estado, setEstado] = useState("");
  const [phase, setPhase] = useState("");
  const[autorizacion,setAutorizacion]=useState("");

const[actID,setActID]=useState("");
const [actLeader, setActLeader] = useState("");
  const [actProjectName, setActProjectName] = useState("");
  const [actObjective, setActObjective] = useState("");
  const [actbudget, setActBudget] = useState("");
  const [ actStartDate, setActStartDate] = useState("");
  const [actEndDate, setActEndDate] = useState("");
  const [actEstado, setActEstado] = useState("");
  const [actPhase, setActPhase] = useState("");
  const[actAutorizacion, setActAutorizacion]=useState("");




  const [projectData, setProjectData] = useState([
    
  ]);
 
//funciones globales
const z=sessionStorage.getItem("email");
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
    const { data } = await axios.get("/api/projects", config);
    setProjectData(data);
   
    }
    catch{
        setError("You are not authorized");
        console.log(error);
    }
    };
//traer tabla objetivos

  
    //insertar Proyecto
    const insertarProyecto = async ()=>{
      try{
      await axios.post(
        "/api/projects",
        { leader:z,
            projectName,
            
            budget,
            startDate,
            endDate,
            estado,    
            phase,
          autorizacion },
        config
      );
   
    updatePage();
    cerrarModalInsertar();
    
      }
      catch{
        console.log(error)
      }
      }



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
///Borrar Venta
  const deleteProyecto = async (proyectosId) => {

    try{
    const response = window.confirm('are you sure you want to delete it?');
    if (response) {
     
     

        await axios.delete('/api/projects/' + proyectosId,config);
       
     
    }
    updatePage();
  }
  catch{
    console.log(error)
  }
}

const actualizarProyecto = async (proyectosId) => {
  try{
  const response = window.confirm('are you sure you want to update it?');
  if (response) {
   var projectNameAct=document.getElementById("projectName2").value
   var objectiveAct=document.getElementById("objective2").value
   var budgetAct=document.getElementById("budget2").value
   var estadoAct=document.getElementById("estado2").value
   var startDateAct=document.getElementById("startDate2").value
   var endDateAct=document.getElementById("endDate2").value
   
   var phaseAct=document.getElementById("phase2").value
   var autorizacionAct=document.getElementById("autorizacion2").value
  
  

   

     const data= await axios.put('/api/projects/' + proyectosId,

              { 
                projectName:projectNameAct,
                objective:objectiveAct,
                budget:budgetAct,
                estado:estadoAct, 
                startDate:startDateAct,
                endDate:endDateAct,
                phase:phaseAct,
                autorizacion:autorizacionAct
              },config);

      console.log(data)
      cerrarModalEditar();
    updatePage();
  }
}
catch{
  console.log(error)
}
  
}





const tomarDato= async(idProj,proLeader,proProjectName,proObjective,proBudget,proEstado,proStartDate,proEndDate,proPhase, proAutorizacion)=>{
  
  console.log(idProj,proLeader,proProjectName,proObjective,proBudget,proStartDate,proEndDate,proEstado,proPhase)
  setActID(idProj);
  setActLeader(proLeader)
  setActProjectName(proProjectName);
  setActObjective(proObjective);
  setActBudget(proBudget);
  setActEstado(proEstado);
  console.log(proEstado)
  setActStartDate(proStartDate);
  setActEndDate(proEndDate);
  setActPhase(proPhase);
  setActAutorizacion(proAutorizacion);

console.log(idProj)

document.getElementById("projectName2").value=proProjectName
document.getElementById("budget2").value=proBudget
document.getElementById("objective2").value=proObjective
document.getElementById("startDate2").value=proStartDate
console.log(proEstado)
document.getElementById("estado2").value=proEstado

document.getElementById("endDate2").value=proEndDate
document.getElementById("phase2").value=proPhase
document.getElementById("autorizacion2").value=proAutorizacion


mostrarModalEditar();

}




  
  var modal = document.getElementById("crear");


  const mostrarModalInsertar = () => {
      modal.style.display = "block";
    };
    
    const cerrarModalInsertar = () => {
        modal.style.display = "none";
  
         
    };
  
  
  
  
  
  var modal2 = document.getElementById("editar");
  
  
  const mostrarModalEditar = () => {
    modal2.style.display = "block";
  };
  
  const cerrarModalEditar = () => {
    modal2.style.display = "none";
    
  };
  





  
  return error ? (
    <span className="error-message">{error}</span>
  ) : (
       <div>
           <Header/>
           <div id="titlepro">
           <h1>Lista Proyectos</h1>
           <div className="crearProd"><button id="crearProBtn" onClick={mostrarModalInsertar}>Crear Proyecto</button></div>
           </div>
        
    <div className="productos">
             <table  >
              <tr>
                <th>Lider</th>
                <th>Nombre Proyecto</th>
                <th>Objetivo</th>
                <th>Presupuesto</th>
                <th>Estado</th>
                <th>Fecha Inicio</th>
                <th>Fecha de terminacion</th>
                <th>Fase</th>
                <th>Autorizacion</th>
               
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
                  <td>{pro.budget}</td>
               
                  <td>{pro.estado}</td>
                  {console.log(pro.estado)}
                  <td>{pro.startDate}</td>
                  <td>{pro.endDate}</td>
                  <td>{pro.phase}</td>
                  <td>{pro.autorizacion}</td>
              
                  <td><button  className="btn btn-primary" onClick={()=>tomarDato(pro._id,pro.leader,pro.projectName,pro.objective,pro.budget,pro.estado,pro.startDate,pro.endDate,pro.phase,pro.autorizacion)} >Actualizar</button>  </td>
                <td><button  className="btn btn-danger" onClick={() => deleteProyecto(pro._id)} >Delete</button>  </td>

                
                </tr>
              ))}
            </tbody>
          </table>

</div>



          
<div id="crear" class="modal" >

  <form>
  <div class="modal-content">
  <div className="form-group">
  <div><h1>Crear proyecto</h1></div>

  <label htmlFor="projectName">Nombre Proyecto:</label>
          <br/>
          <div>
          <input
            type="text"
          
            id="projectName"
           
            onChange={(e) => setProjectName(e.target.value)}
           
          />
          </div>
        

          <label htmlFor="budget">Presupuesto:</label>
          <br/>
          <div>
          <input
            type="number"
          
            id="budget"
           
             onChange={(e) => setBudget(e.target.value)}
            
          
          />

         </div>

         <label htmlFor="estado">Estado:</label>
<br/>
<div>
<input
  type="text"

  id="estado"
 
   onChange={(e) => setEstado(e.target.value)}
  />
            </div>
  
          <label htmlFor="startDate">Fecha de inicio:</label>
          <br/>
          <div>
          <input
          type="date"  

          min="2018-01-01" max="2050-12-31"
                      id="startDate"
                       onChange={(e) => setStartDate(e.target.value)}
                      
                       
                     />
                  </div>

                  <label htmlFor="endDate">Fecha de terminacion:</label>
          <br/>
          <div>
          <input
          type="date"  

          min="2018-01-01" max="2050-12-31"
                      id="endDate"
                       onChange={(e) => setEndDate(e.target.value)}
                      
                       
                     />
                  </div>

          <label htmlFor="phase">Fase del proyecto:</label>
          <br/>
          <div>
          <input
            type="text"
          
            id="phase"
           
            onChange={(e) => setPhase(e.target.value)}
           
          />
          </div>


             <br/>
          <div>
            <div>
        <button type="submit" className="btn btn-success" onClick={insertarProyecto} >crear</button>
        </div>
        <br/>
        <div>
         <button type="reset" className="btn btn-danger"  onClick={cerrarModalInsertar}>cancelar</button>
         </div>
  </div>

          <br/>
        </div>
        


  </div>
  </form>
</div>



<div id="editar" class="modal" >

  
  <div class="modal-content">
  <div className="form-group">
  <div><h1>Actualizar Proyecto</h1></div>
  <form>
    
  <label htmlFor="projectName">Nombre Proyecto:</label>
          <br/>
          <div>
          <input
            type="text"
          
            id="projectName2"
           
            onBlur={(e) => setProjectName(e.target.value)}
           
          />
          </div>
          <label htmlFor="objective">Objetivos:</label>
          <br/>
          <div>
          <input
            type="text"
          
            id="objective2"
           
            onBlur={(e) => setObjective(e.target.value)}
           
          />
          </div>

          <label htmlFor="budget">Presupuesto:</label>
          <br/>
          <div>
          <input
            type="number"
          
            id="budget2"
           
            onBlur={(e) => setBudget(e.target.value)}
            
          
          />

         </div>


         <label htmlFor="estado">Estado:</label>
        <br/>
        <div>
        <select id="estado2" className="list" onChange={(e) => setEstado(e.target.value)} >
       
       <option value="pendiente">Pendiente</option>
           <option value="activo">Activo</option>
           <option value="inactivo">Inactivo</option>
          

          
       </select>

            </div>



  
          <label htmlFor="startDate">Fecha de inicio:</label>
          <br/>
          <div>
          <input
          type="date"  

          min="2018-01-01" max="2050-12-31"
                      id="startDate2"
                      onBlur={(e) => setStartDate(e.target.value)}
                      
                       
                     />
                  </div>

          <label htmlFor="endDate">Fecha de terminacion:</label>
          <br/>
          <div>
          <input
          type="date"  

          min="2018-01-01" max="2050-12-31"
                      id="endDate2"
                      onBlur={(e) => setEndDate(e.target.value)}
                      
                       
                     />
                  </div>

          <label htmlFor="phase">Fase del proyecto:</label>
          <br/>
      
        <div>
        <select id="phase2" className="list" onChange={(e) => setPhase(e.target.value)} >
       
        <option value="none">none</option>
            <option value="En desarrollo">En desarrollo</option>
            <option value="Terminado">Terminado</option>
           

           
        </select>
        </div>
          
          <br/>

          <label htmlFor="autorizacion">Autorizacion:</label>
          <br/>
          <div>

          <select id="autorizacion2" className="list" onChange={(e) => setAutorizacion(e.target.value)} >
       
          <option value="pendiente">Pendiente</option>
           <option value="Aprobado">Aprobado</option>
           <option value="Rechazado">Rechazado</option>
          

          
       </select>

         
          </div>
          <br/>

          <div>
        <button  className="btn btn-success" onClick={() => actualizarProyecto(actID)}  >Actualizar</button>

        </div>
        <br></br>
        <div>
  <button className="btn btn-danger"  onClick={cerrarModalEditar}>cancelar</button>
  </div>
          </form>
          <br/>
        </div>
        


  </div>

</div>

          
          <Footer></Footer>  
  </div>
  );

  
};











export default Project;