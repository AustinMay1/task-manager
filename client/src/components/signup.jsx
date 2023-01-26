import { useState } from "react";
import { Card, CardHeader, CardBody, Text, Input, FormControl, FormLabel, useToast, Button } from "@chakra-ui/react";

function SignUp() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const toast = useToast();

    const register = async (e) => {
        e.preventDefault();

        setLoading(true);

        try {
        const body = { username, password }
        const user = await fetch('/user', {
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
                duration: 3000,
                isClosable: true
            })
        }
        } catch (e) {
            console.error(e)
        }

        setLoading(false);
    }

    return (
      <div>
        <Card maxW="sm">
          <CardHeader>
            <Text>Sign Up</Text>
          </CardHeader>
          <CardBody>
            <form onSubmit={register}>
              <FormControl>
                <FormLabel htmlFor="username">Username</FormLabel>
                <Input
                  name="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />

                <FormLabel htmlFor="password">Password</FormLabel>
                <Input
                  name="password"
                  type="text"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormControl>
              <Button type="submit" colorScheme={"blue"} isLoading={loading}>
                Submit
              </Button>
            </form>
          </CardBody>
        </Card>
      </div>
    );
}

export default SignUp;