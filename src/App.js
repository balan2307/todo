import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Auth from "./Pages/Auth";
import LandingPage from "./Pages/LandingPage";
import PrivateRoutes from "./utils/PrivateRoute";

function App() {

  // const auth=useContext(AuthContext)
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route element={<LandingPage />} path="/"  />
          </Route>

          <Route path="/auth" element={<Auth />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
