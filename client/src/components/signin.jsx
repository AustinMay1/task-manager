import { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Input,
  FormControl,
  FormLabel,
  useToast,
  Button,
  Text,
  Container,
  Box,
  Center
} from "@chakra-ui/react";
import { UserContext } from "../utils/context";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

function SignIn() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const toast = useToast();

    const login = async (e) => {
        e.preventDefault();

        setLoading(true);

        try {
            const body = { username, password }
            const user = await fetch('/login', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            })

            const res = await user.json();

            if(res.token) {
                localStorage.setItem("token", res.token);
                toast({
                    title: "Sign In Successful",
                    status: 'success',
                    duration: 3000,
                    isClosable: true
                })
            }

            localStorage.setItem("user", body.username);
            setUser(localStorage.getItem("user"));
            navigate('/dashboard')
        } catch (e) {
            console.error(e);
            toast({
                title: 'Invalid Username / Password',
                status: 'error',
                duration: 3000,
                isClosable: true
            })
        }

        setLoading(false)  
    }

    return (
      <Container
        maxW="lg"
        py={{ base: "12", md: "24" }}
        px={{ base: "0", sm: "8" }}
      >
        <Box
          boxShadow={{ base: "none", sm: "md" }}
          borderRadius={{
            base: "none",
            sm: "xl",
          }}
        >
          <Card maxW="sm">
            <CardHeader>Sign In</CardHeader>
            <CardBody>
              <form onSubmit={login}>
                <FormControl>
                  <FormLabel>Username</FormLabel>
                  <Input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    type="text"
                  />

                  <FormLabel>Password</FormLabel>
                  <Input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                  />
                </FormControl>
                <Button type="submit" colorScheme={"blue"} isLoading={loading}>
                  Login
                </Button>
              </form>
            </CardBody>
          </Card>
          <Text>Don't have an account?</Text>
          <Button colorScheme={"green"} onClick={() => navigate("/register")}>
            Sign Up
          </Button>
        </Box>
      </Container>
    );
}

export default SignIn;