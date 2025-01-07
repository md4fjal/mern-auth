import { Suspense } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Loader from "./components/Loader";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import AllAudit from "./pages/audit/AllAudit";
import AssignAudit from "./pages/audit/AssignAudit";
import Audit from "./pages/audit/Audit";

function App() {
  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/all-audit" element={<AllAudit />} />
            <Route path="/asign" element={<AssignAudit />} />
            <Route path="/audit" element={<Audit />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
