import { VStack } from "@chakra-ui/react";
import TodoItem from "./TodoItem";

export default function TodoList({ todos, onComplete, onDelete,  onUpdateTodo}) {
  return (
    <VStack spacing={2} align="stretch">
      {todos.map((todo) => (
        <TodoItem
          key={todo._id}
          todo={todo}
          onComplete={onComplete}
          onDelete={onDelete}
          onUpdateTodo={onUpdateTodo}
        />
      ))}
    </VStack>
  );
}
