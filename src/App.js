import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Auth from './Pages/Auth';
import LandingPage from './Pages/LandingPage';
import PrivateRoutes from './utils/PrivateRoute';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoutes>
                <Route index element={<LandingPage />} />
              </PrivateRoutes>
            }
          />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
