import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import {
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Tag,
  TagLabel,
  Container,
  IconButton,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useToast
} from "@chakra-ui/react";
import { ArrowBackIcon, AddIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import TaskForm from "../components/taskform";
import { UserContext } from "../utils/context";

function Projects() {
  const [project, setProject] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadTasks, setLoadTasks] = useState(true)
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useContext(UserContext);
  const params = useParams();
  const projId = params.id;
  const bearer = localStorage.getItem("token");
  const navigate = useNavigate();
  const toast = useToast; 

  useEffect(() => {
    const data = async () => {
      if(!loadTasks) {
        return;
      }
      const proj = await fetch(`/api/projects/${projId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${bearer}`,
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());

      setProject(proj.data);
      setTasks(proj.data.tasks);
      setLoadTasks(false);
    };

    data();
  }, [bearer, projId, loadTasks]);

  async function createTask(data) {
    const { title, description, duedate } = data;

    try {
      setLoading(true)
      await fetch("/api/tasks", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${bearer}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          description: description,
          dueDate: new Date(duedate),
          status: "Not Started",
          projectId: projId,
        }),
      });
      setLoading(false)
      onClose();
      toast({
        title: 'Task Created!',
        status: 'success',
        duration: 3000,
        isClosable: true
      })
      
    } catch (e) {
      console.error(e);
    }
    setLoadTasks(true);
  }

  return (
    <div>
      <Container maxW="1200px">
        <Flex justifyContent={"space-between"}>
          <IconButton
            w={8}
            h={8}
            colorScheme={"teal"}
            variant={"outline"}
            icon={<ArrowBackIcon />}
            onClick={() => navigate("/dashboard")}
          />
          <IconButton
            w={8}
            h={8}
            colorScheme={"teal"}
            variant={"outline"}
            icon={<AddIcon w={3} h={3} />}
            onClick={onOpen}
          />
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay backdropFilter={"blur(10px)"} />
            <ModalContent>
              <ModalHeader>Create new task</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <TaskForm createTask={createTask} loading={loading} />
              </ModalBody>
              <ModalFooter></ModalFooter>
            </ModalContent>
          </Modal>
        </Flex>
        <Heading pt={8}>Project: {project.title}</Heading>
        <TableContainer pt={10}>
          <Table variant="simple" size="md">
            <TableCaption>Tasks</TableCaption>
            <Thead>
              <Tr>
                <Th>Title</Th>
                <Th>Description</Th>
                <Th>Due Date</Th>
                <Th>Status</Th>
              </Tr>
            </Thead>
            <Tbody>
              {Array.isArray(tasks)
                ? tasks.map((task) => (
                    <Tr>
                      <Td>{task.title}</Td>
                      <Td>{task.description}</Td>
                      <Td>{new Date(task.dueDate).toDateString()}</Td>
                      <Td>
                        <Tag colorScheme={"purple"}>
                          <TagLabel>{task.status}</TagLabel>
                        </Tag>
                      </Td>
                    </Tr>
                  ))
                : null}
            </Tbody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
}

export default Projects;
