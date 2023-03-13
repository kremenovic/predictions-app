import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home, Error } from "./pages";
import {
  Bankroll,
  Dashboard,
  Prediction,
  Settings,
  News,
  SharedLayout,
} from "./pages/dashboard";
import { ProtectedRoute } from "./routes/ProtectedRoute";
import "./App.css";
import "react-calendar/dist/Calendar.css";

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
          <Route path="prediction/:id" element={<Prediction />} />
          <Route path="settings" element={<Settings />} />
          <Route path="news" element={<News />} />
          <Route path="bankroll" element={<Bankroll />} />
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;
