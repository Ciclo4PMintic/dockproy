import { useState, useEffect } from "react";
import axios from "axios";
import '../css/main.css'
import '../css/Productos.css'
import '../plugins/fontawesome-free/css/all.min.css'
import'../dist/css/adminlte.min.css'
import '../css/crearProducto.css'
import Header from '../Header/Header'
import Footer from "../Footer/Footer";


const ProjectUpdate = ({history}) => {

const [error, setError] = useState("");
  const [leader, setLeader] = useState("");
  const [projectName, setProjectName] = useState("");
  const [objective, setObjective] = useState("");
  const [budget, setBudget] = useState("");
  const [ startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [estado, setEstado] = useState("");
  const [phase, setPhase] = useState("");
  const[actualizarAvances,setActualizarAvances]=useState("")

const[actID,setActID]=useState("");
const [actLeader, setActLeader] = useState("");
  const [actProjectName, setActProjectName] = useState("");
  const [actObjective, setActObjective] = useState("");
  const [actbudget, setActBudget] = useState("");
  const [ actStartDate, setActStartDate] = useState("");
  const [actEndDate, setActEndDate] = useState("");
  const [actEstado, setActEstado] = useState("");
  const [actphase, setActPhase] = useState("");


const[avancesData,setAvancesData]=useState([]);


const[avanceActId, setAvanceActId]=useState("");
const[actObservacion,setActObservacion]=useState("");
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


  const updatePage = async (m)=>{
   
      try{
    const { data } = await axios.get("/api/projects/"+m, config);

   setProjectData(data);
      }
      catch{
        setError("You are not authorized");
        console.log(error);

      }
    };

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
          phase },
      config
    );
 
  updatePage();
  cerrarModalInsertar();
  
    }
    catch{
      console.log(error)
    }
    };


   



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


//editar usuario
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
     
    
    if(estadoAct=="inactivo"){
      cerrarModalEditar();
setError("You are not authorized ");
    }
  else
  {
     
  
       const data= await axios.put('/api/projects/' + proyectosId,
  
                { 
                  projectName:projectNameAct,
                  objective:objectiveAct,
                  budget:budgetAct,
                  estado:estadoAct, 
                  startDate:startDateAct,
                  endDate:endDateAct,
                 
                },config);
  
        console.log(data)
        cerrarModalEditar();
    updatePage(z);
              }
}

}
catch {
  localStorage.removeItem("authToken");
  setError("You are not authorized ");
}
};

var modal2 = document.getElementById("editar");


const mostrarModalEditar = () => {
  modal2.style.display = "block";
};

const cerrarModalEditar = () => {
  modal2.style.display = "none";
};



const tomarDato= async(idProj,proLeader,proProjectName,proObjective,proBudget,proEstado,proStartDate,proEndDate,proPhase)=>{
  
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
  
  console.log(idProj)
  
  document.getElementById("projectName2").value=proProjectName
  document.getElementById("budget2").value=proBudget
  document.getElementById("objective2").value=proObjective
  document.getElementById("startDate2").value=proStartDate
  console.log(proEstado)
  document.getElementById("estado2").value=proEstado
  
  document.getElementById("endDate2").value=proEndDate
 
  
  
  mostrarModalEditar();
  
  
    

};

var modal = document.getElementById("crear");


  const mostrarModalInsertar = () => {
      modal.style.display = "block";
    };
    
    const cerrarModalInsertar = () => {
        modal.style.display = "none";
  
         
    };


    const listarAvances = async (projectId)=>{
      setActualizarAvances(projectId)
    try{
  const  data2  = await axios.get("api/advance/search/"+projectId, config);
 console.log(data2.data)

setAvancesData(data2.data);


 
    }
    catch{
      setError("There are not advances for this project");
      console.log(error);

    }
 
  };


  const actualizarAvance = async (advanceID) => {
    console.log("este es el avance id"+advanceID)
    setActObservacion(document.getElementById("observacion2").value)
   
   
    try{
    const response = window.confirm('are you sure you want to update it?');
    if (response) {
 
  
  
       const data= await axios.put('/api/advance/'+advanceID,
  
                { 
                 
                  observacion:actObservacion,
                 
                },config);
  
        console.log(data)
      
        cerrarModalActAvance();
  
              }


}
catch {
  localStorage.removeItem("authToken");
  setError("You are not authorized ");
}
};
 
 
 
 
 
  var modal3 = document.getElementById("actAvance");


  const mostrarModalActAvance = () => {
    modal3.style.display = "block";
  };
  
  const cerrarModalActAvance = () => {
    modal3.style.display = "none";
  };
  
  const tomarDato2= async(idAvance, futureObservacion)=>{
try{
   console.log(idAvance);
   setAvanceActId(idAvance);
  

  
  document.getElementById("observacion2").value=futureObservacion;
 
  
  
  mostrarModalActAvance();
  
}
catch{
   setError("You are not authorized ");
}
    

};

const deleteAvance = async (avanceId) => {

  try{
  const response = window.confirm('are you sure you want to delete it?');
  if (response) {
   
   

      await axios.delete('/api/advance/' + avanceId,config);
     
   
  }
  updatePage(z);
  listarAvances(actualizarAvances);
}
catch{
  console.log(error)
}
}




  
return error ? (
  <span className="error-message">{error}</span>
) : (
    <div>
           <Header/>
           <div id="titlepro">
           <h1>Lista Proyectos</h1>
           <div className="crearProd"><button id="crearProBtn" onClick={mostrarModalInsertar}>Nuevo Proyecto</button></div>

           </div>
        
    <div >
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
                  {console.log(pro.estado)}
                  <td>{pro.startDate}</td>
                  <td>{pro.endDate}</td>
                  <td>{pro.phase}</td>
              
                  <td><button  className="btn btn-primary" onClick={()=>tomarDato(pro._id,pro.leader,pro.projectName,pro.objective,pro.budget,pro.estado,pro.startDate,pro.endDate,pro.phase)} >Actualizar</button>  </td>


                    <td><button   type="submit" className="btn btn-primary" onClick={()=>listarAvances(pro._id)} >Avances del proyecto</button></td>



                
                </tr>
              ))}
            </tbody>
          </table>

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
              <input
              type="text"

              id="estado2"
              disabled

              onBlur={(e) => setEstado(e.target.value)
              }
              />
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




<div>
          <div id="titlepro">
           <h1>Lista Avances</h1>

           </div>
           <div>
          
           <table id="tabla8" >
              <tr>
               
                <th>Estudiante</th>
                <th>Descripcion</th>
                <th>Observacion</th>
                <th>Fecha Creacion</th>
                
               
                <th></th>
                <th></th>
                </tr>
                <tbody>
              
              {avancesData.map((ins) => (
               <tr  value={ins._id} key={ins._id}>
                 <td >{ins.student.map((student)=>( <tr value={student._id} key={student._id}> 
                  <td>{student.username}</td> </tr>)) }</td>
                  
                 <td>{ins.descripcion}</td>
                 <td>{ins.observacion}</td>
                 <td>{ins.creationDate}</td>

                 <td><button  className="btn btn-primary" onClick={()=>tomarDato2(ins._id,ins.observacion)} >Actualizar</button>  </td>
                 <td><button  className="btn btn-danger" onClick={() => deleteAvance(ins._id)} >Delete</button>  </td>

                  
                
                  
                 


                </tr>
              ))}
            </tbody>
          </table> 
          </div>

         
        <br></br>
        <div>
  </div>


          </div>

          <div id="actAvance" class="modal" >

  
<div class="modal-content">
<div className="form-group">
<div><h1> Avance </h1></div>
<div >
<form>
 
<label htmlFor="observacion">Observacion:</label>
        <br/>
        <div>
        <input
          type="text"
        
          id="observacion2"
         
          onBlur={(e) => setActObservacion(e.target.value)}
         
        />
        </div>
        <br></br>
      

        <table id="tabla9">
  <tr>
    <td>      <button  className="btn btn-success" onClick={() => actualizarAvance(avanceActId)}  >Actualizar</button>
</td>

    <td>      <button  className="btn btn-danger" onClick={() => cerrarModalActAvance}  >Cerrar</button>
</td>
    
  </tr>
</table>

    

        
        


        </form>
        </div>
        <br/>
      </div>
      


</div>

</div>

        
        <Footer></Footer>  
</div>
</div>
);


};











export default ProjectUpdate;