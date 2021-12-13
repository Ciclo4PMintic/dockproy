import { useState, useEffect } from "react";
import axios from "axios";
import '../css/main.css'
import '../css/Productos.css'
import '../plugins/fontawesome-free/css/all.min.css'
import'../dist/css/adminlte.min.css'
import '../css/crearProducto.css'
import Header from '../Header/Header'
import Footer from "../Footer/Footer";


const StudentList = ({history}) => {
  const [error, setError] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
 
  const [phone, setPhone] = useState("");
  const [bDate, setBDate] = useState("");
  const [roles, setRoles] = useState("");
  const [identification, setIdentification] = useState("");
 const[estado,setEstado]=useState("");

const[actID,setActID]=useState("");
const[actUserName,setActUserName]=useState("");
const [actEmail, setActEmail] = useState("");
const [actPhone, setActPhone] = useState("");
const [actBDate, setActBDate] = useState("");
const [actRoles, setActRoles] = useState("");
const [actIdentification, setActIdentification] = useState("");
const[actestado,setActEstado]=useState("");

const [userData, setUserData] = useState(
    []);
 
//funciones globales

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
    const { data } = await axios.get("/api/auth/getStudent/active", config);

   setUserData(data);
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
       
        updatePage()
      } catch  {
        localStorage.removeItem("authToken");
        setError("You are not authorized");
      }
    };

    fetchUserDate();
  }, [history]);


//editar usuario
const aceptarUsuario = async (userId) => {

  try{


      const data= await axios.put('/api/auth/' + userId,
            { 
              estado:"autorizado"
             }
    ,      
    config);
    console.log(data)
    
  
    updatePage();
 
}


catch {
  localStorage.removeItem("authToken");
  setError("You are not authorized to accept user ");
}
};
const denegarUsuario = async (userId) => {

  try{


      const data= await axios.put('/api/auth/' + userId,
            { 
              estado:"no autorizado"
             }
    ,      
    config);
    console.log(data)
    
  
    updatePage();
 
}


catch {
  localStorage.removeItem("authToken");
  setError("You are not authorized to accept user ");
}
};



  
return error ? (
  <span className="error-message">{error}</span>
) : (
     <div>
         <Header/>
         <div id="titlepro">
         <h1>Lista Estudiantes</h1>
         </div>
            <div className="productos">
           <table  >
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Date</th>
              <th>Cedula</th>
              <th>Estado</th>
              
              <th></th>
              <th></th>
                     </tr>
                    <tbody>
            {userData.map((pro ) => (
              <tr  value={pro._id} key={pro._id}>
                <td>{pro.username}</td>
                <td>{pro.email}</td>
                <td>{pro.phone}</td>
                <td>{pro.bDate}</td>
                <td>{pro.identification}</td>
                <td>{pro.estado}</td>
               
              <td><button  className="btn btn-success" onClick={()=>aceptarUsuario(pro._id)} >Aceptar</button>  </td>
              <td><button  className="btn btn-danger" onClick={()=>denegarUsuario(pro._id)} >Rechazar</button>  </td>

             </tr>
            ))}
          </tbody>
        </table>

        




        </div>
        <Footer></Footer>  
</div>
);


};











export default StudentList;