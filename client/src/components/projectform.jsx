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

function Form({ createProject, loading }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <form onSubmit={handleSubmit(createProject)}>
      <FormControl isRequired>
        <FormLabel>Project Title</FormLabel>
        <Input type="text" {...register("title")} />
        {errors.title && <p>Title is required</p>}
        <FormLabel>Description</FormLabel>
        <Textarea type="text" {...register("description")} />
      </FormControl>
      <Button type="submit" isLoading={loading}>
        Create
      </Button>
    </form>
  );
}

export default Form;
