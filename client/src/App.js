import TopBar from "./components/topbar/TopBar";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Settings from "./pages/settings/Settings";
import Home from "./pages/home/Home"
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { useContext } from "react";
import { Context } from "./context/Context";

function App() {
  const {user} = useContext(Context);
  return (
    <Router>
      <TopBar></TopBar>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/register" element={user ? <Home></Home> : <Register></Register>}></Route>
        <Route path="/login" element={user ? <Home></Home> : <Login></Login>}></Route>
        <Route path="/settings" element={user ? <Settings></Settings> : <Register></Register>}></Route>
        <Route path="/write" element={user ? <Write></Write> : <Register></Register>}></Route>
        <Route path="/post/:postId" element={<Single></Single>}></Route>
        </Routes>
    </Router> 
  );
}

export default App;
