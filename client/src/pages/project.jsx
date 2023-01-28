import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
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
} from "@chakra-ui/react";

function Projects() {
  const [project, setProject] = useState([]);
  const [tasks, setTasks] = useState([]);

  const params = useParams();
  const projId = params.id;
  const bearer = localStorage.getItem("token");

  useEffect(() => {
    const data = async () => {
      const proj = await fetch(`/api/projects/${projId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${bearer}`,
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());

      setProject(proj.data);
      setTasks(proj.data.tasks);
    };

    data();
  }, [bearer, projId]);

  return (
    <div>
      <Container maxW="1000px">
        <Heading>Project: {project.title}</Heading>
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
