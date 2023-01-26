import SignUp from "./components/signup";
import SignIn from "./components/signin";
import Dashboard from "./pages/dashboard";
import { UserContext } from "./utils/context";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { useState, useMemo } from "react";
import PrivateRoute from "./utils/privateroutes";
import Nav from "./components/nav";

const navLinks = [
  {name: "Home", path: "/"},
  {name: "About", path: "/about"},
  {name: "Dashboard", path: "/dashboard"},
]

function App() {
  const [user, setUser] = useState(localStorage.getItem("user"));
  const value = useMemo(() => ({ user, setUser }), [user, setUser]);
  return (
    <BrowserRouter>
      <UserContext.Provider value={value}>
        <Nav routes={navLinks} />
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route exact path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route path="/register" element={<SignUp />} />
          <Route path="/login" element={<SignIn />} />
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
