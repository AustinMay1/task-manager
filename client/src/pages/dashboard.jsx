import { useContext } from "react";
import { UserContext } from "../utils/context";
import { Button } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";

function Dashboard() {
  const { user } = useContext(UserContext);
  
  return (
    <div>
      Hello {user} <br></br>{" "}

    </div>
  );
}

export default Dashboard;
