/* eslint react/prop-types: 0 */
import TodoItem from "./TodoItem";

// TODO-SIMON: Implement conditional ordering high to low / low to high
const priorityOrder = { HIGH: 1, MEDIUM: 2, LOW: 3 };

const TodosList = ({todos, handleChangeProps, deleteTodoProps, updateTodoItem}) => (
  <ul data-set="todo-list">
    {todos.sort((a, b) => {
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }).map((todo) => (
      <TodoItem
        key={todo.id}
        todo={todo}
        handleChangeProps={handleChangeProps}
        deleteTodoProps={deleteTodoProps}
        updateTodoItem={updateTodoItem}
      />
    ))}
  </ul>
);
export default TodosList;
