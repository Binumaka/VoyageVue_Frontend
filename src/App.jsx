import "./App.css";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App(){
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route>
            <Route path ="/" element ={<HomePage/>}/>
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App