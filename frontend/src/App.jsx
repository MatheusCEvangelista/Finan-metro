import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";

function PrivateRoute({children}){
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to = "/login"/>;
}

function App(){
  return(
    <Router>
      <Routes>
        <Route path = "/" element = {<Register/>}/>
        <Route path = '/login' element = {<Login/>}/>
        <Route path = '/register' element = {<Register/>}/>
        <Route path = '/dashboard' element = {<PrivateRoute>
          <Dashboard/>
        </PrivateRoute>}/>
        <Route path = "*" element = {<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;

