import { useContext, useState, useEffect } from "react";
import { UserContext } from "../utils/context";
import {
  Box,
  Button,
  Tag,
  TagLabel,
  SimpleGrid,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Heading,
  Divider,
  Flex,
  Container,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const { user } = useContext(UserContext);
  const [projects, setProjects] = useState([]);

  const navigate = useNavigate();
  const bearer = localStorage.getItem("token");

  useEffect(() => {
    const data = async () => {
      const proj = await fetch("/api/projects/all", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${bearer}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: user,
        }),
      }).then((res) => res.json());

      setProjects(proj.data);
    };

    data();
  }, [user, bearer]);

  return (
    <Container maxW="container.lg">
      <SimpleGrid minChildWidth={"220px"} spacing="40px">
        {Array.isArray(projects)
          ? projects.map((project) => (
              <Card maxW="md" w="full" key={project.id}>
                <CardHeader>
                  <Flex
                    flex="1"
                    alignItems={"center"}
                    justifyContent={"space-between"}
                  >
                    <Heading size="lg">{project.title}</Heading>
                    <Box>
                      <Tag colorScheme={"red"}>
                        <TagLabel>In Progress</TagLabel>
                      </Tag>
                    </Box>
                  </Flex>
                </CardHeader>
                <Divider />
                <CardBody>
                  <Box>
                    <Heading size="xs">Description</Heading>
                    {project.description}

                    <Box pt={4}>
                      <Button
                        onClick={() => navigate(`/project/${project.id}`)}
                        colorScheme={"blue"}
                      >
                        View
                      </Button>
                    </Box>
                  </Box>
                </CardBody>
                <Divider />
                <CardFooter>
                  created on: {new Date(project.createdAt).toLocaleDateString()}
                </CardFooter>
              </Card>
            ))
          : null}
      </SimpleGrid>
    </Container>
  );
}

export default Dashboard;
