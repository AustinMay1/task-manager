import { Heading, Box, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

function Reminders() {
  const [reminders, setReminders] = useState({});

  useEffect(() => {
    const rem = JSON.parse(localStorage.getItem("taskrem"));
    setReminders(rem);
  }, []);
  return (
    <>
      <Heading mb={4}>Upcoming Tasks</Heading>
      <Box mb={4}>
      <Text>
      {reminders.title}
      </Text>
      {reminders.dueDate}
      </Box>
    </>
  );
}

export default Reminders;
