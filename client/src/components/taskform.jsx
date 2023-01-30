import { useForm } from "react-hook-form";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Textarea,
  Button,
} from "@chakra-ui/react";


function TaskForm({ createTask, loading }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <form onSubmit={handleSubmit(createTask)}>
      <FormControl isRequired>
        <FormLabel>Task Title</FormLabel>
        <Input type="text" {...register("title")} />
        {errors.title && <p>Title is required</p>}
        <FormLabel>Description</FormLabel>
        <Textarea type="text" {...register("description")} />
        <FormLabel>Due Date</FormLabel>
        <Input type="date" {...register("duedate")}/>
      </FormControl>
      <Button mt={4} type="submit" isLoading={loading} colorScheme={'teal'}>
        Create
      </Button>
    </form>
  );
}

export default TaskForm;