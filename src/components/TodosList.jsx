/* eslint react/prop-types: 0 */
import TodoItem from "./TodoItem";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";

// TODO-SIMON: Implement conditional ordering high to low / low to high
const priorityOrder = { HIGH: 1, MEDIUM: 2, LOW: 3 };

const TodosList = ({todos, handleChangeProps, deleteTodoProps, updateTodoItem}) =>{ 
  const [order, setOrder] = useState("highToLow")

  return(
  <div>
    <div>
      <input
        type="radio"
        name="OrderHighToLow"
        value="highToLow"
        checked={order === "highToLow"}
        onChange={event => setOrder(event.target.value)}
      />
      High to Low
      <input
        style={{marginLeft: "15px"}}
        type="radio"
        name="OrderLowToHigh"
        value="lowToHigh"
        checked={order === "lowToHigh"}
        onChange={event => setOrder(event.target.value)}
      />
      Low to High
    </div>
    <ul data-set="todo-list">
      {todos.sort((a, b) => {
        return order === "highToLow"
        ?  priorityOrder[a.priority] - priorityOrder[b.priority]
        :  priorityOrder[b.priority] - priorityOrder[a.priority];
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
  </div>
)};
export default TodosList;
