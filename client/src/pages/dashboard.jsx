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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import Form from "../components/projectform";

function Dashboard() {
  const { user } = useContext(UserContext);
  const [projects, setProjects] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);

  const toast = useToast();
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

  async function createProject(data) {
    const { title, description } = data;

    try {
      setLoading(true);
      await fetch("/api/projects", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${bearer}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          description: description,
          userId: user,
        }),
      });
      onClose();
      setLoading(false);
      toast({
        title: "Project created!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <Container maxW="container.xl">
      <Button colorScheme={"teal"} variant={"outline"} onClick={onOpen}>
        New Project
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay backdropFilter={"blur(10px)"} />
        <ModalContent>
          <ModalHeader>New Project</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Form createProject={createProject} isLoading={loading} />
          </ModalBody>

          <ModalFooter>
            <Button>Submit</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <SimpleGrid pt={8} minChildWidth={"320px"} spacing="40px">
        {Array.isArray(projects)
          ? projects.map((project) => (
              <Card maxW="lg" key={project.id}>
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
