import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;

import Footer from "./components/Footer";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import ProtectedRoute from "./routes/ProtectedRoute";

<div className="flex flex-col min-h-screen">
  <Header />
  <div className="flex flex-row mt-16 mb-16 flex-1">
    <div className="fixed top-16 left-0 h-full border-r-1 p-4 w-1/5">
      <Sidebar />
    </div>
    <main className="flex-1 p-4 overflow-y-auto ml-[20%]">
      <div className="w-full max-w-2xl mx-auto">
        <Dashboard />
      </div>
    </main>
  </div>
  <Footer />
</div>;
