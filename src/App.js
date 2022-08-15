import './App.css';
import Navbar from './Components/Navbar';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from './Components/Home';
import Register from './Components/Register';
import Contact from './Components/Contact';
import Login from './Components/Login'
import About from './Components/About';
import ForgetPassword from './Components/ForgetPassword';
import ResetPassword from './Components/ResetPassword';

function App() {
  return (
    <>
     <Router>
     <Navbar />
      <div className="container mx-auto w-10/12 mt-7 my-3 min-h-[250px]">

        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/forgetpassword" element={<ForgetPassword />} />
          <Route exact path="/resetpassword/:resetToken" element={<ResetPassword />} />
        </Routes>
      </div>
     </Router>
    </>
  );
}

export default App;
