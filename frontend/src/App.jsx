import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";

function PrivateRoute({children}){
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to = "/login"/>;
}

function PublicRoute({children}){
  const token = localStorage.getItem("token");
  return token ? <Navigate to = "/dashboard"/>:children;
}

function App(){
  return(
    <Router>
      <Routes>
        <Route path = "/" element = {<PublicRoute>
          <Register/>
          </PublicRoute>}/>
        <Route path = '/login' element = {<PublicRoute>
          <Login/>
        </PublicRoute>}/>
        <Route path = '/register' element = {<PublicRoute>
          <Register/>
          </PublicRoute>}/>
        <Route path = '/dashboard' element = {<PrivateRoute>
          <Dashboard/>
        </PrivateRoute>}/>
        <Route path = "*" element = {<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;

