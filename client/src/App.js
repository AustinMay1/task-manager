import "./App.css";
import { useState, useEffect } from "react";
import { Text } from "@chakra-ui/react";

function App() {
  const [users, setUsers] = useState([{}]);

  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setUsers(data.users));
  }, []);
  return (
    <div>
      {typeof users === "undefined" ? (
        <Text>Loading...</Text>
      ) : (
        users.map((user, i) => <Text key={i}>{user}</Text>)
      )}
    </div>
  );
}

export default App;
