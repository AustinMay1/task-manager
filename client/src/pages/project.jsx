import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
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
    useToast,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider
} from "@chakra-ui/react";
import {ArrowBackIcon, AddIcon} from "@chakra-ui/icons";
import {useNavigate} from "react-router-dom";
import TaskForm from "../components/taskform";
import {GoKebabVertical, GoCheck, GoTrashcan, GoSync} from "react-icons/go"


function Projects() {
    const [project, setProject] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadTasks, setLoadTasks] = useState(true)
    const {isOpen, onOpen, onClose} = useDisclosure();
    const params = useParams();
    const projId = params.id;
    const bearer = localStorage.getItem("token");
    const navigate = useNavigate();
    const toast = useToast;

    useEffect(() => {
        const data = async () => {
            if (!loadTasks) {
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
        const {title, description, duedate} = data;

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

    async function updateStatus(data, status) {
        const { id } = data

        try {
            await fetch(`/api/tasks/${id}`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${bearer}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    status: status
                })
            })
        } catch (e) {
            console.error(e)
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
                        variant={"outline"}
                        icon={<ArrowBackIcon/>}
                        onClick={() => navigate("/dashboard")}
                    />
                    <IconButton
                        w={8}
                        h={8}
                        variant={"outline"}
                        icon={<AddIcon w={3} h={3}/>}
                        onClick={onOpen}
                    />
                    <Modal isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay backdropFilter={"blur(10px)"}/>
                        <ModalContent>
                            <ModalHeader>Create new task</ModalHeader>
                            <ModalCloseButton/>
                            <ModalBody>
                                <TaskForm createTask={createTask} loading={loading}/>
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
                                <Th>Edit</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {Array.isArray(tasks)
                                ? tasks.map((task) => (
                                    <Tr>
                                        <Td key={task.id}>{task.title}</Td>
                                        <Td>{task.description}</Td>
                                        <Td>{new Date(task.dueDate).toDateString()}</Td>
                                        <Td>
                                            {(() => {
                                                if (task.status === "Not Started") {
                                                    return (<Tag colorScheme={'red'}><TagLabel>{task.status}</TagLabel></Tag>)
                                                } else if (task.status === "In Progress") {
                                                    return (<Tag
                                                        colorScheme={'yellow'}><TagLabel>{task.status}</TagLabel></Tag>)
                                                } else {
                                                    return (<Tag
                                                        colorScheme={'green'}><TagLabel>{task.status}</TagLabel></Tag>)
                                                }
                                            })()}
                                        </Td>
                                        <Td>
                                        <Menu>
                                            <MenuButton as={IconButton} icon={<GoKebabVertical />} variant={'ghost'} />
                                            <MenuList>
                                                <MenuItem icon={<GoSync />} onClick={() => updateStatus(task, "In Progress")}>In Progress</MenuItem>
                                                <MenuItem icon={<GoCheck />} onClick={() => updateStatus(task, "Done")}>Done</MenuItem>
                                                <MenuDivider />
                                                <MenuItem icon={<GoTrashcan />}>Delete</MenuItem>
                                            </MenuList>
                                        </Menu>
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
