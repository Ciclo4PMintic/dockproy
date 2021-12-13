import '../css/main.css'
import '../css/formatoHome.css'
import '../plugins/fontawesome-free/css/all.min.css'
import'../dist/css/adminlte.min.css'


const Header = () => {

  const logoutHandler=()=>{
    localStorage.removeItem("authToken");
    sessionStorage.removeItem("email")

};
    return(


      

       
        <header>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark gradient">
        
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">

            <li className="nav-item">
                <a id="axis"className="nav-link" href='/home' >CoroTTo <span className="sr-only">(current)</span></a>
                </li>
                <li className="nav-item">
                   <a className="nav-link" href='/home'>Home <span className="sr-only">(current)</span></a>
                </li>
              

              
                <li className="nav-item">
                <a className="nav-link" href='/home' >Admin</a>
               <ul className='dropdown'>
              <a className="nav-link" href='/user' >Gestion Usuarios</a>
              <a className="nav-link"href='/project' >Gestionar Proyectos</a>
               </ul>
                </li>
                <li className="nav-item">
                <a className="nav-link" href='/home' >Estudiante</a>
               <ul className='dropdown'>
             <a className="nav-link" href="/userUpdate" >Actualizar Datos</a>
               <a className="nav-link" href="/projectList" >Inscripcion Proyectos</a>
               <a className="nav-link" href="/studentProjects" >Mis Proyectos</a>

               </ul>
                </li>

                

                <li className="nav-item">
                <a className="nav-link" href='/home'>Lider</a>
               <ul className='dropdown'>
              <a className="nav-link" href="/projectUpdate" >Mis Proyectos</a>
               <a className="nav-link" href="/userUpdate" >Actualizar Datos</a>
              <a className="nav-link" href="/studentList" >Ingreso Estudiantes</a>
              <a className="nav-link" href="/inscriptionProject" >Gestionar Inscripciones</a>
               </ul>
                </li>
                
               
                </ul>
                <ul class="navbar-nav navbar-right ">
                <li className="nav">
            <a className="nav-link" href='/userUpdate'>{sessionStorage.getItem("email")}</a>
                </li>

                <li className="nav">
               <a id="logout" className="nav-link" href='/login' onClick={logoutHandler}>Logout</a>
                </li>
               
            

            </ul>
            </div>
    </nav>
    </header>


      )

};

export default Header;