import { useState } from "react";
import { Card, CardHeader, CardBody, Text, Input, FormControl, FormLabel, useToast, Button, Container, Heading } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../utils/context";

function SignUp() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const toast = useToast();
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);

    const register = async (e) => {
        e.preventDefault();

        setLoading(true);

        try {
        const body = { username, password }
        const user = await fetch('/register', {
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
                title: "Registered Successfully!",
                status: 'success',
                duration: 3000,
                isClosable: true
            })
        }
        localStorage.setItem("user", body.username);
        setUser(body.username);
        navigate("/dashboard");
        } catch (e) {
            console.error(e)
            toast({
              title: 'Username already taken!',
              duration: 3000,
              status: 'error',
              isClosable: true
            })
        }

        setLoading(false);
    }

    return (
      <Container maxW='md'>
        <Card maxW="sm" boxShadow="lg">
          <CardHeader>
            <Heading>Register</Heading>
          </CardHeader>
          <CardBody>
            <form onSubmit={register}>
              <FormControl>
                <FormLabel htmlFor="username">Username</FormLabel>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />

                <FormLabel htmlFor="password">Password</FormLabel>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormControl>
                <Button mt={4} type="submit" colorScheme={"blue"} isLoading={loading}>
                Submit
              </Button>
            </form>
          </CardBody>
        </Card>
        <Text mt={4}>Already have an account?</Text>
          <Button mt={4} colorScheme={'green'} onClick={() => navigate('/login')}>Sign In</Button>
      </Container>
    );
}

export default SignUp;