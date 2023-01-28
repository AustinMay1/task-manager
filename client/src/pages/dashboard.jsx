import { useContext, useState, useEffect } from "react";
import { UserContext } from "../utils/context";
import { Button } from "@chakra-ui/react";

function Dashboard() {
  const { user } = useContext(UserContext);
  const [projects, setProjects] = useState({});

  const bearer = localStorage.getItem("token")

  const userProjects = async () => {
    await fetch("/api/projects/all", {
      method: "POST",
      headers: {
        Authorization: bearer,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: user,
      }),
    })
      .then((res) => res.json())
      .then((data) => setProjects(data.data));
  };

  return (
    <div>
      Hello {user}
      <Button onClick={() => userProjects()}>Fetch</Button>
    </div>
  );
}

export default Dashboard;
