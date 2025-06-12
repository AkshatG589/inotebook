import './App.css';
import React from "react"
import Home from "./components/Home"
import About from "./components/About"
import NavBar from "./components/NavBar"
import SignUp from "./components/SignUp"
import LogIn from "./components/LogIn"
import User from "./components/User"
import { BrowserRouter , Routes ,Route} from "react-router-dom"
import NoteState from "./context/notes/NoteState"
function App() {
  return (
    <NoteState>
      <BrowserRouter>
        <NavBar />
        <div className="container">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/signup" element={<SignUp />} />
            <Route exact path="/login" element={<LogIn />} />
            <Route exact path="/user" element={<User />} />         
          </Routes>
        </div>
      </BrowserRouter>
     </NoteState>
  );
}

export default App;
