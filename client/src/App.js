import SignUp from "./components/signup";
import SignIn from "./components/signin";
import Dashboard from "./pages/dashboard";
import Projects from "./pages/project";
import { UserContext } from "./utils/context";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { useState, useMemo } from "react";
import PrivateRoute from "./utils/privateroutes";
import Nav from "./components/nav";
import { Flex } from "@chakra-ui/react";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Dashboard", path: "/dashboard" },
];

function App() {
  const [user, setUser] = useState(localStorage.getItem("user"));
  const value = useMemo(() => ({ user, setUser }), [user, setUser]);
  return (
    <BrowserRouter>
      <UserContext.Provider value={value}>
        <Nav routes={navLinks} />
        <Flex direction="column" flex="1" py="16">
          <Routes>
            <Route element={<PrivateRoute />}>
              <Route exact path="/dashboard" element={<Dashboard />} />
              <Route path="/project/:id" element={<Projects />} />
            </Route>
            <Route path="/register" element={<SignUp />} />
            <Route path="/login" element={<SignIn />} />
          </Routes>
        </Flex>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
