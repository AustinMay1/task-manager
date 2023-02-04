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
  MenuButton,
  Menu,
  IconButton,
  MenuList,
  MenuItem,
  MenuDivider,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import ProjectForm from "../components/projectform";
import Reminders from "../components/reminders";
import { GoKebabVertical, GoTrashcan, GoCheck, GoSync } from "react-icons/go";

function Dashboard() {
  const { user } = useContext(UserContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadProjects, setLoadProjects] = useState(true);
  const toast = useToast();
  const navigate = useNavigate();
  const bearer = localStorage.getItem("token");

  useEffect(() => {
    const data = async () => {
      if (!loadProjects) {
        return;
      }
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
      setLoadProjects(false);
    };

    data();
  }, [user, bearer, loadProjects]);

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
          status: "Not Started",
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
    setLoadProjects(true);
  }

  async function updateStatus(data, status) {
    const { id } = data;

    try {
      await fetch(`/api/projects/${id}/status`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${bearer}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: status,
        }),
      });
    } catch (e) {
      console.error(e);
    }

    setLoadProjects(true);
  }

  async function deleteProject(data) {
    const { id } = data;

    try {
      await fetch(`/api/projects/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${bearer}`,
          "Content-Type": "application/json",
        },
      });
      toast({
        title: "Project Deleted!",
        status: "info",
        duration: 3000,
        isClosable: true,
      });
    } catch (e) {
      console.error(e);
    }

    setLoadProjects(true);
  }

  return (
    <>
      <Container maxW="container.xl">
        <Reminders />
      </Container>
      <Container maxW="container.xl">
        <Button variant={"outline"} onClick={onOpen}>
          New Project
        </Button>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay backdropFilter={"blur(10px)"} />
          <ModalContent>
            <ModalHeader>New Project</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <ProjectForm createProject={createProject} loading={loading} />
            </ModalBody>

            <ModalFooter></ModalFooter>
          </ModalContent>
        </Modal>
        <SimpleGrid pt={8} minChildWidth={"320px"} spacing="40px">
          {Array.isArray(projects)
            ? projects.map((project) => (
                <Card maxW="lg" key={project.id} boxShadow="lg">
                  <CardHeader>
                    <Flex
                      flex="1"
                      alignItems={"center"}
                      justifyContent={"space-between"}
                    >
                      <Heading size="lg">{project.title}</Heading>
                      <Box>
                        {(() => {
                          if (project.status === "Not Started") {
                            return (
                              <Tag colorScheme={"red"}>
                                <TagLabel>{project.status}</TagLabel>
                              </Tag>
                            );
                          } else if (project.status === "In Progress") {
                            return (
                              <Tag colorScheme={"orange"}>
                                <TagLabel>{project.status}</TagLabel>
                              </Tag>
                            );
                          } else {
                            return (
                              <Tag colorScheme={"green"}>
                                <TagLabel>{project.status}</TagLabel>
                              </Tag>
                            );
                          }
                        })()}
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
                  <CardFooter
                    justifyContent={"space-between"}
                    alignItems={"center"}
                  >
                    created on:{" "}
                    {new Date(project.createdAt).toLocaleDateString()}
                    <Menu>
                      <MenuButton
                        as={IconButton}
                        icon={<GoKebabVertical />}
                        variant={"ghost"}
                      >
                        Edit
                      </MenuButton>
                      <MenuList>
                        <MenuItem
                          icon={<GoSync />}
                          onClick={() => updateStatus(project, "In Progress")}
                        >
                          In Progress
                        </MenuItem>
                        <MenuItem
                          icon={<GoCheck />}
                          onClick={() => updateStatus(project, "Complete")}
                        >
                          Complete
                        </MenuItem>
                        <MenuDivider />
                        <MenuItem
                          icon={<GoTrashcan />}
                          onClick={() => deleteProject(project)}
                        >
                          Delete
                        </MenuItem>
                      </MenuList>
                    </Menu>
                  </CardFooter>
                </Card>
              ))
            : null}
        </SimpleGrid>
      </Container>
    </>
  );
}

export default Dashboard;
