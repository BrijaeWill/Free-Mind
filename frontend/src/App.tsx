import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NavigationBar from './components/Navbar';
import Dashboard from "./pages/Dashboard";
import CreateJournal from "./pages/CreateJournal";
import 'bootstrap/dist/css/bootstrap.min.css';  // Import Bootstrap
import './pages/login.css';


const App: React.FC = () =>{
  return(
    <Router>
      <div>
     <NavigationBar />
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create" element={<CreateJournal />} />
      </Routes>
      </div>
    </Router>
  );
};
export default App;