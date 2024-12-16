/* eslint react/prop-types: 0 */
import TodoItem from "./TodoItem";
import { useEffect, useState } from "react";

// TODO-SIMON: Implement conditional ordering high to low / low to high
const priorityOrder = { HIGH: 1, MEDIUM: 2, LOW: 3 };

const TodosList = ({todos, handleChangeProps, deleteTodoProps, updateTodoItem, categories, setCategories}) =>{ 
  const [order, setOrder] = useState("highToLow")
  const [category, setCategory] = useState("")

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
      {order === "byCategory" && 
      <select style={{marginLeft: "5rem"}} name="category" value={category} onChange={(e) => {setCategory(e.target.value)}}>
        {categories.map(category => {
          return <option value={category}>{category}</option>
        })}
      </select>
      }
    </div>
    <ul data-set="todo-list">
      {todos.sort((a, b) => {
        if(order === "byCategory") {
          if (a.category === category && b.category !== category) {
            return -1; 
        } else if (b.category === category && a.category !== category) {
            return 1;
        } else {
            return 0; 
        } 
      }

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
          categories={categories}
          setCategories={setCategories}
        />
      ))}
    </ul>
  </div>
)};
export default TodosList;
