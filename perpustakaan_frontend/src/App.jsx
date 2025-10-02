import { useState } from "react";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  const [page, setPage] = useState("login");

  return (
    <div>
      <div className="flex justify-center mt-4 space-x-4">
        <button onClick={() => setPage("login")} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">Login</button>
        <button onClick={() => setPage("register")} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition">Register</button>
      </div>
      {page === "login" ? <LoginPage /> : <RegisterPage />}
    </div>
  );
}

export default App;
