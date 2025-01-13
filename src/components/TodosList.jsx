/* eslint react/prop-types: 0 */
import TodoItem from "./TodoItem";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";

// TODO-SIMON: Implement conditional ordering high to low / low to high
const priorityOrder = { HIGH: 1, MEDIUM: 2, LOW: 3 };

const TodosList = ({todos, handleChangeProps, deleteTodoProps, updateTodoItem, categories, setCategories}) =>{ 
  const [order, setOrder] = useState("highToLow")
  const [category, setCategory] = useState("")

  const filteredTodos = todos
      .sort((a, b) => {
        if (order === "highToLow") {
          return priorityOrder[a.priority] - priorityOrder[b.priority];
        } else if(order === "lowToHigh") {
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        } else if (order === "byDueDate") {
          return new Date(a.dueDate) - new Date(b.dueDate);
        }
      })
      .filter((todo) => order !== "byCategory" || todo.category === category);

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
      Priority High to Low
      <input
        style={{marginLeft: "15px"}}
        type="radio"
        name="OrderLowToHigh"
        value="lowToHigh"
        checked={order === "lowToHigh"}
        onChange={event => setOrder(event.target.value)}
      />
      Priority Low to High
      <input
        style={{marginLeft: "15px"}}
        type="radio"
        name="OrderByCategory"
        value="byCategory"
        checked={order === "byCategory"}
        onChange={event => setOrder(event.target.value)}
      />
      By Category
      <input
        style={{marginLeft: "15px"}}
        type="radio"
        name="OrderByDueDate"
        value="byDueDate"
        checked={order === "byDueDate"}
        onChange={event => setOrder(event.target.value)}
      />
      By Due Date
      {order === "byCategory" && 
      <select style={{marginLeft: "5rem"}} name="category" value={category} onChange={(e) => {setCategory(e.target.value)}}>
        {categories.map(category => {
          return <option value={category}>{category}</option>
        })}
      </select>
      }
    </div>
    <ul data-set="todo-list">
      {filteredTodos.length === 0 ? (
          <h2>Keine ToDos vorhanden, erstelle welche</h2>
      ) : (
          filteredTodos.map((todo) => (
              <TodoItem
                  key={todo.id}
                  todo={todo}
                  handleChangeProps={handleChangeProps}
                  deleteTodoProps={deleteTodoProps}
                  updateTodoItem={updateTodoItem}
                  categories={categories}
                  setCategories={setCategories}
              />
          ))
      )}
    </ul>
  </div>
)};
export default TodosList;
