/* eslint react/prop-types: 0 */
import { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import styles from "./TodoItem.module.css";
import DatePicker from "react-datepicker";

const TodoItem = (props) => {
  const { completed, id, title, priority, dueDate } = props.todo;

  const [editing, setEditing] = useState(false);
  const [customCategory, setCustomCategory] = useState("")

  // Berechne, ob das Due-Date in den nächsten 24 Stunden ist
  const isDueSoon = dueDate && new Date(dueDate) - new Date() <= 24 * 60 * 60 * 1000;
  const dueSoonStyle = isDueSoon && !completed ? { border: "2px solid red" } : {};

  const handleEditing = () => {
    setEditing(true);
  };

  const handleUpdatedDone = (event) => {
    if (event.key === "Enter") {
      setEditing(false);
    }
  };

  const handlePriorityChange = (event) => {
    if (event.key === "Enter") {
      setEditing(false);
    }
  };

  const handleDateChange = (date) => {
    if (date) {
      // +1 Stunde hinzufügen
      const adjustedDate = new Date(date.getTime() + 60 * 60 * 1000);
      props.updateTodoItem({ ...props.todo, dueDate: adjustedDate });
    } else {
      props.updateTodoItem({ ...props.todo, dueDate: null });
    }
  };
  const completedStyle = {
    fontStyle: "italic",
    color: "#595959",
    opacity: 0.4,
    textDecoration: "line-through",
  };

  const { completed, id, title, priority, category } = props.todo;
  const { categories } = props;

  const viewMode = {};
  const editMode = {};

  if (editing) {
    viewMode.display = "none";
  } else {
    editMode.display = "none";
  }

  const onChangeCustomCategory = (e) => {
    setCustomCategory(e.target.value);
  };

  const onConfirmCustomCategory = (e) => {
    if (customCategory === "") {
      return;
    }
    
    props.setCategories(prev => [...prev, customCategory])
    props.updateTodoItem({...props.todo, category: customCategory})
  }

  useEffect(
    () => () => {
      console.log("Cleaning up...");
    },
    []
  );

  return (
      <li className={styles.item} data-type="todo-item" style={dueSoonStyle}>
        <div onDoubleClick={handleEditing} style={viewMode}>
          <input
              type="checkbox"
              className={styles.checkbox}
              checked={completed}
              onChange={() => props.handleChangeProps(id)}
              name="checkbox"
          />
          <button
              data-set="delete-todo-btn"
              onClick={() => props.deleteTodoProps(id)}
          >
            <FaTrash style={{ color: "orangered", fontSize: "16px" }} />
          </button>
          <span style={completed ? completedStyle : null}>{title}</span>
          <select style={{ marginLeft: "5rem" }} name="priority" value={priority} onChange={(e) => { props.updateTodoItem({ ...props.todo, priority: e.target.value }) }}>
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
          </select>
        </div>
        <input
            type="text"
            style={editMode}
            className={styles.textInput}
            value={title}
            onChange={(e) => { props.updateTodoItem(e.target.value, id); }}
            onKeyDown={handleUpdatedDone}
        />
        <DatePicker
            selected={dueDate ? new Date(dueDate) : null}
            onChange={handleDateChange}
            showTimeSelect
            dateFormat="dd.MM.yyyy HH:mm"
            placeholderText="Kein Zeitpunkt ausgewählt"
            className="input-text"
        />
        <button
          data-set="delete-todo-btn"
          onClick={() => props.deleteTodoProps(id)}
        >
          <FaTrash style={{ color: "orangered", fontSize: "16px" }} />
        </button>
        <span style={completed ? completedStyle : null}>{title}</span>
        <select style={{marginLeft: "5rem"}} name="category" value={category} onChange={(e) => {category !== "Custom" && props.updateTodoItem({...props.todo, category: e.target.value})}}>
          {categories.map(category => {
            return <option value={category}>{category}</option>
          })}
        </select>
        {category === "Custom" && 
        <div>
          <input
            type="text"
            className="input-text"
            placeholder="New Category..."
            value={customCategory}
            name="category"
            onChange={onChangeCustomCategory}
          />
          <button onClick={() => onConfirmCustomCategory()}>Confirm</button>
        </div>
        }
        <select style={{marginLeft: "5rem"}} name="priority" value={priority} onChange={(e) => {props.updateTodoItem({...props.todo, priority: e.target.value})}}>
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
        </select>
      </div>
      <input
        type="text"
        style={editMode}
        className={styles.textInput}
        value={title}
        onChange={(e) => {
          props.updateTodoItem(e.target.value, id);
        }}
        onKeyDown={handleUpdatedDone}
      />        
      <DatePicker
        selected={dueDate ? new Date(dueDate) : null}
        onChange={handleDateChange}
        showTimeSelect
        dateFormat="dd.MM.yyyy HH:mm"
        placeholderText="Kein Zeitpunkt ausgewählt"
        className="input-text"
      />
    </li>
  );
}

export default TodoItem;
