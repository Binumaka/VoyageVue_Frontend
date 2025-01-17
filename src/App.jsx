import axios from "axios";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddDestination from "./admin/addDestination";
import AddGuide from "./admin/guide/addGuide";
import AdminDashboard from "./admin/adminDashboard";
import EditGuide from "./admin/guide/editguide";
import GuideList from "./admin/guide/guidelist";
import UserList from "./admin/userlist";
import "./App.css";
import BookingScreen from "./pages/BookingScreen";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import UploadTourPackage from "./admin/addtourpackages";
import EditDestination from "./admin/editdestination"
import Destinations from "./pages/destinations";

axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/booking" element={<BookingScreen />} />
            <Route path="/destinations" element={<Destinations />} />
            {/* <Route path="/details" element={<DestinationDetails />} /> */}
            <Route path="/add" element={<AddDestination />} />
            <Route path="/addguide" element={<AddGuide />} />
            <Route path="/guide" element={<GuideList />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/userlist" element={<UserList />} />
            <Route path="/editguide" element={<EditGuide />} />
            <Route path="/uploadpackages" element={<UploadTourPackage />} />
            <Route path="/editDestination/:id" element={<EditDestination />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
