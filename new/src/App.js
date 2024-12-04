
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUpLogIn from "./Trip Planner/SignUpLogIn";
import TripList from "./Trip Planner/TripList";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<SignUpLogIn />} />
          <Route path="/trips" element={<TripList />} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;

