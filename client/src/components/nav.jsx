import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  Avatar,
  useToast,
} from "@chakra-ui/react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../utils/context";

function Nav({ routes }) {
  const { user, setUser } = useContext(UserContext);
  const toast = useToast();

  const logOut = () => {
    setUser(localStorage.removeItem("user"));
    localStorage.removeItem("token");
    toast({
        title: "Sign Out Success!",
        duration: 3000,
        isClosable: true
    })
  };

  return (
    <Box px={10}>
      <Flex h={24} alignItems={"center"} justifyContent={"space-between"}>
        <HStack spacing={8} alignItems={"center"}>
          <Box as="b">Taskify</Box>
          <HStack as={"nav"} spacing={4} display={{ base: "none", md: "flex" }}>
            {routes.map((route, i) => (
              <Link key={i} to={route.path}>{route.name}</Link>
            ))}
          </HStack>
        </HStack>
        <Flex alignItems={"center"}>
          {user ? (
            <>
              <Button colorScheme={"red"} mr={4} onClick={() => logOut()}>
                Log Out
              </Button>
              <Avatar
                size={"md"}
                src="https://source.boringavatars.com/beam/?colors=F2ECDC,574345,E3DACB,C5FFE5,F5EED4"
              />
            </>
          ) : (
            <>
              <ButtonGroup>
                <Button variant={"ghost"} colorScheme={"blue"}>
                  <Link to="/login">Sign In</Link>
                </Button>
                <Button colorScheme={"blue"}>
                  <Link to="/register">Sign Up</Link>
                </Button>
              </ButtonGroup>
            </>
          )}
        </Flex>
      </Flex>
    </Box>
  );
}

export default Nav;
