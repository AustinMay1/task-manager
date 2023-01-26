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
} from "@chakra-ui/react";
import { UserContext } from "../App";


function SignIn() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)

    const toast = useToast();

    const login = async (e) => {
        e.preventDefault();

        setLoading(true);

        try {
            const body = { username, password }
            const user = await fetch('/signIn', {
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
                    duration: 3000,
                    isClosable: true
                })
            }

            
        } catch (e) {
            console.error(e);
        }

        setLoading(false)
    }

    return ( 
        <div>
            <Card maxW="sm">
                <CardHeader>
                    Sign In
                </CardHeader>
                <CardBody>
                    <form onSubmit={login}>
                        <FormControl>
                            <FormLabel>Username</FormLabel>
                            <Input value={username} onChange={(e) => setUsername(e.target.value)} type="text" />

                            <FormLabel>Password</FormLabel>
                            <Input value={password} onChange={(e) => setPassword(e.target.value)} type="text" />
                        </FormControl>
                        <Button type="submit" colorScheme={'red'} isLoading={loading}>Login</Button>
                    </form>
                </CardBody>
            </Card>
        </div>
     );
}

export default SignIn;