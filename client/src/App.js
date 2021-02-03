import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router } from "react-router-dom";
import SwitchRoute from "./components/route/SwitchRoute";
import NavBar from "./components/route/NavBar";

const App = () => {
  return (
    <>
      <Router>
        <NavBar />
        <SwitchRoute />
      </Router>
    </>
  );
};

export default App;
