import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home, Error } from "./pages";
import {
  Bankroll,
  Dashboard,
  Prediction,
  Profile,
  SharedLayout,
} from "./pages/dashboard";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route
          exact
          path="/dashboard/"
          element={
            <ProtectedRoute>
              <SharedLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="prediction/:id" element={<Prediction />} />
          <Route path="profile" element={<Profile />} />
          <Route path="bankroll" element={<Bankroll />} />
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;
