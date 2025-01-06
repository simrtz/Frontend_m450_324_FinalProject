/* eslint react/prop-types: 0 */
import { useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const InputTodo = ({addTodoProps}) => {
  const [input, setInput] = useState({
    title: "",
    priority: "LOW",
    dueDate: null,
  });

  const onChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };
  const handleDateChange = (date) => {
    if (date) {
      // +1 Stunde hinzufügen
      const adjustedDate = new Date(date.getTime() + 60 * 60 * 1000);
      setInput({ ...input, dueDate: adjustedDate });
    } else {
      setInput({ ...input, dueDate: null });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.title.trim()) {
      addTodoProps({title: input.title, priority: input.priority, dueDate: input.dueDate});
      setInput({
        title: "",
        priority: "LOW",
        dueDate: null,
      });
    } else {
      alert("Please write item");
    }
  };

  return (
    <form
      data-set="todo-form"
      onSubmit={handleSubmit}
      className="form-container"
    >
      <input
        type="text"
        className="input-text"
        placeholder="Add todo..."
        value={input.title}
        name="title"
        onChange={onChange}
      />
      <select name="priority" onChange={onChange}>
        <option value="LOW">Low</option>
        <option value="MEDIUM">Medium</option>
        <option value="HIGH">High</option>
      </select>
      <DatePicker
          selected={input.dueDate}
          onChange={handleDateChange}
          showTimeSelect
          dateFormat="dd.MM.yyyy HH:mm"
          placeholderText="Datum auswählen"
          showIcon={true}
      />
      <button data-set="add-todo-btn" className="input-submit">
        <FaPlusCircle />
      </button>
    </form>
  );
};

export default InputTodo;
