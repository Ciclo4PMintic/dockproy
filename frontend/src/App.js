import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//private

import HomeRoute from "./components/routing/HomeRoute";

import UserRoute from "./components/routing/UserRoute";

import ProjectRoute from "./components/routing/ProjectRoute";


//pages
import StudentProjects from "./components/pages/StudentProjects";
import InscriptionProjects from "./components/pages/InscriptionProjects";
import ProjectList from "./components/pages/ProjectList";
import User from "./components/pages/User";
import StudentList from "./components/pages/StudentList";
import Home from "./components/pages/Home";
import Project from "./components/pages/Project";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import ForgotPassword from "./components/pages/ForgotPassword";
import ResetPassword from "./components/pages/ResetPassword";
import userUpdate from"./components/pages/UserUpdate";
import ProjectUpdate from "./components/pages/ProjectUpdate";
const App=()=> {
  return (
    <Router>

        <div>
<Switch>

<UserRoute exact path="/studentList" component={StudentList}/> 
<UserRoute exact path="/user" component={User}/>
<UserRoute exact path="/userUpdate" component={userUpdate}/>
<ProjectRoute exact path = "/projectUpdate" component={ProjectUpdate}/>
<HomeRoute path="/home" component={Home} />
<ProjectRoute exact path="/project" component={Project}/>
<ProjectRoute exact path="/projectList" component={ProjectList}/>
<ProjectRoute exact path="/inscriptionProject" component={InscriptionProjects}/>
<ProjectRoute exact path="/studentProjects" component={StudentProjects}/>

<Route exact path="/login" component={Login}></Route>


<Route exact path="/register" component={Register}/>
<Route exact path="/forgotpassword" component={ForgotPassword}/>
<Route exact path="/passwordreset/:resetToken" component={ResetPassword}/>
</Switch>
</div>

      
    </Router>
 
  );
}

export default App;
