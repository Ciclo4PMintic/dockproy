import { useState, useEffect } from "react";
import axios from "axios";
import '../css/main.css'
import '../css/Productos.css'
import '../plugins/fontawesome-free/css/all.min.css'
import'../dist/css/adminlte.min.css'
import '../css/crearProducto.css'
import Header from '../Header/Header'
import Footer from "../Footer/Footer";


const StudentProjects = ({history}) => {

const [error, setError] = useState("");

const[creationDate,setCreationDate]=useState("");

const[descripcion,setDescripcion]=useState("");

const[project,setProject]=useState("");
const[estadoInscripcion,setEstadoInscripcion]=useState("");
const[actID,setActID]=useState("")
const[actDescripcion,setActDescripcion]=useState("");

const[avancesData,setAvancesData]=useState([])
const[misAvancesData,setMisAvancesData]=useState([])
  const [inscriptionProjectData, setInscriptionProjectData] = useState([
    
  ]);
 
//funciones globales
const z=sessionStorage.getItem("email");
console.log(z)
var actidavance="";

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
    const  data  = await axios.get("/api/inscription/studentInscription/"+m, config);
console.log(data.data)
    setInscriptionProjectData(data.data);
      }
      catch{
        setError("You are not authorized");
        console.log(error);

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

  const listarAvances = async (projectId,userInscription)=>{
      console.log(userInscription)
 if(userInscription=="Aceptado")
 {
    try{
  const  data2  = await axios.get("api/advance/search/"+projectId, config);
 console.log(data2.data)

setAvancesData(data2.data);

mostrarModalAvances();
 
    }
    catch{
      setError("There are not advances for this project");
      console.log(error);

    }
 }
 else{
    setError("You are not authorized to enter this project");
 }
  };


  var modal3 = document.getElementById("mostrar");
  
  
  const mostrarModalAvances = () => {
    modal3.style.display = "block";
  };
  
  const cerrarModalAvances = () => {
    modal3.style.display = "none";
    
  };

  const listarMisAvances = async (studentId,userInscription)=>{
    console.log(studentId)
if(userInscription=="Aceptado")
{
  try{
const  data3  = await axios.get("api/advance/"+studentId, config);
console.log(data3.data)

setMisAvancesData(data3.data);



  }
  catch{
    setError("You do not have advances for this project");
    console.log(error);

  }
}
else{
  setError("You are not authorized to enter this project");
}
};


const insertarAvance = async ()=>{
  console.log(estadoInscripcion)
  if(estadoInscripcion=="Aceptado"){
  try{
  await axios.post(
    "/api/advance",
    { 
      project:project,
      student:z,
        
        
        creationDate,
        descripcion,
        observacion:"pendiente revision lider"
       
        },
    config
  );

updatePage();
cerrarModalInsertar();

  }
  catch{
    setError("Problem with your inscription");
    console.log(error)
    
  }
}
else{
  setError("You are not authorized to make advances in this project");
  console.log(error);
}
  }

  var modal = document.getElementById("crear");


  const mostrarModalInsertar = () => {  
      modal.style.display = "block";
    };
    
    const cerrarModalInsertar = () => {
        modal.style.display = "none";
  
         
    };

    const tomarDato= async(proyectoID,EstadoID)=>{
      setEstadoInscripcion(EstadoID)
      setProject(proyectoID)
      mostrarModalInsertar()
    
    }



    const actualizarAvance = async (advanceID) => {
      console.log("este es el avance id"+advanceID)
      setActDescripcion(document.getElementById("descripcion2").value)
     
     
      try{
      const response = window.confirm('are you sure you want to update it?');
      if (response) {
   
    
    
         const data= await axios.put('/api/advance/'+advanceID,
    
                  { 
                   
                    descripcion:actDescripcion,
                   
                  },config);
    
          console.log(data)
        
          cerrarModalEditar();
    
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
  
  const tomarDato2= async(idAvance, futureDescription )=>{
try{
   console.log(idAvance);
   setActID(idAvance);
  

  
  document.getElementById("descripcion2").value=futureDescription;
 
  
  
  mostrarModalEditar();
  
}
catch{
   setError("You are not authorized ");
}
    

};





  
return error ? (
  <span className="error-message">{error}</span>
) : (
    <div>
           <Header/>
           <div id="titlepro">
           <h1>Mis Proyectos</h1>

           </div>
        
    <div >
             <table id="tabla6">
              <tr>
               
               
                <th>Proyecto</th>
                <th>Estado Proyecto</th>
                <th>Fecha Inicio</th>
                <th>Fecha terminacion</th>
                <th>Fase del proyecto</th>
                <th>Estado de la inscripcion</th>
               
                <th></th>
                <th></th>
                </tr>
                <tbody>
              {inscriptionProjectData.map((pro ) => (
                <tr  value={pro._id} key={pro._id}>
                    


                  <td>{pro.project.map((projectname)=>(<tr value={projectname._id} key={projectname.id}>
                     
                   
                    <td>{projectname.projectName}</td>
                   
                  </tr>))}</td>

                 

                  <td>{pro.project.map((projectestado)=>(<tr value={projectestado._id} key={projectestado.id}>
                    <td>{projectestado.estado}</td>
                   
                  </tr>))}</td>
               

                  <td>{pro.project.map((projectinicio)=>(<tr value={projectinicio._id} key={projectinicio.id}>
                    <td>{projectinicio.startDate}</td>
                   
                  </tr>))}</td>
                  <td>{pro.project.map((projectfinal)=>(<tr value={projectfinal._id} key={projectfinal.id}>
                    <td>{projectfinal.endDate}</td>
                  
                  </tr>))}</td>
                  <td>{pro.project.map((fase)=>(<tr value={fase._id} key={fase.id}>
                    <td>{fase.phase}</td>
                   
                  </tr>))}</td>

                  <td>{pro.estado}</td>
                  

                  <td>{pro.project.map((datos)=>(<tr value={datos._id} key={datos.id}>
                    <td><button   type="submit" className="btn btn-primary" onClick={()=>listarAvances(datos._id,pro.estado)} >Avances del proyecto</button></td>
                    <td><button   type="submit" className="btn btn-primary" onClick={()=>listarMisAvances(pro.student,pro.estado)} >Mis avances</button></td>
                   <td><button className="btn btn-primary" onClick={()=>tomarDato(datos._id,pro.estado)}>Crear Avance</button></td>
                   <td id="tdEspecial" >{pro.student}</td>
                  </tr>))}</td>

                 

                
                </tr>
              ))}
            </tbody>
          </table>

          <div id="mostrar" class="modal" >

  
<div class="modal-content">
<div className="form-group">


<div>
          <div id="titlepro">
           <h1>Lista Avances</h1>

           </div>
           <div>
          
           <table id="tabla6" >
              <tr>
               
                <th>Estudiante</th>
                <th>Descripcion</th>
                <th>Observacion</th>
                
               
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

                 
                  
                
                  
                 


                </tr>
              ))}
            </tbody>
          </table> 
          </div>

         
        <br></br>
        <div>
  <button className="btn btn-danger"  onClick={cerrarModalAvances}>cerrar</button>
  </div>


          </div>

        <br/>
      </div>
      


</div>

</div>


<div>
          <div id="titlepro">
           <h1>Mis Avances</h1>

           </div>
           <div>
          
           <table id="tabla7" >
              <tr>
               
                <th>Nombre Proyecto</th>
                <th>Descripcion</th>
                <th>Observacion</th>
                <th>Fecha Creacion</th>
                
               
                <th></th>
                <th></th>
                </tr>
                <tbody>
              
              {misAvancesData.map((ins3) => (
               <tr  value={ins3._id} key={ins3._id}>
                 <td >{ins3.project.map((proyecto)=>( <tr value={proyecto._id} key={proyecto._id}> 
                  <td>{proyecto.projectName}</td> </tr>)) }</td>
                  
                 <td>{ins3.descripcion}</td>
                 <td>{ins3.observacion}</td>
                 <td>{ins3.creationDate}</td>
                 
            
                  
                 <td><button  className="btn btn-primary" onClick={()=>tomarDato2(ins3._id,ins3.descripcion)} >Actualizar</button>  </td>



                </tr>
              ))}
            </tbody>
          </table> 
          </div>

         
   


          </div>
         

          <div id="crear" class="modal" >

<form>
<div class="modal-content">
<div className="form-group">
<div><h1>Crear Avance</h1></div>

<label htmlFor="creationDate">Fecha Creacion:</label>
        <br/>
        <div>
        <input
          type="date"
        
          id="creationDate"
         
          onBlur={(e) => setCreationDate(e.target.value)}
         
        />
        </div>
      

        <label htmlFor="descripcion">Descripcion:</label>
        <br/>
        <div>
        <input
          type="text"
        
          id="descripcion"
         
          onBlur={(e) => setDescripcion(e.target.value)}
          
        
        />

       </div>

                <br/>
        <div>
          <div>
      <button type="submit" className="btn btn-success" onClick={insertarAvance} >crear</button>
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
<div><h1>Actualizar Avance</h1></div>
<div >
<form>
 
<label htmlFor="description">Descripcion:</label>
        <br/>
        <div>
        <input
          type="text"
        
          id="descripcion2"
         
          onBlur={(e) => setActDescripcion(e.target.value)}
         
        />
        </div>
        <br></br>
      

        <table id="tabla9">
  <tr>
    <td>      <button  className="btn btn-success" onClick={() => actualizarAvance(actID)}  >Actualizar</button>
</td>
    <td><button className="btn btn-danger"  onClick={cerrarModalEditar}>cancelar</button>
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











export default StudentProjects;