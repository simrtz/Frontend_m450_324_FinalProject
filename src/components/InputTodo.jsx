/* eslint react/prop-types: 0 */
import { useState, useEffect } from "react";
import { FaPlusCircle } from "react-icons/fa";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const InputTodo = ({addTodoProps, categories, setCategories}) => {
  const [input, setInput] = useState({
    title: "",
    priority: "LOW",
    category: "Work",
    dueDate: null,
  });

  const [customCategory, setCustomCategory] = useState("")

  useEffect(() => {
    input.category !== "Custom" && setCustomCategory("")
  }, [input.category])

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

  const onChangeCustomCategory = (e) => {
    setCustomCategory(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.title.trim()) {
      let category
      if (customCategory === "") {
        category = input.category
      } else {
        setCategories(prev => ([
          ...prev, 
          customCategory
        ]))

        category = customCategory
      }

      addTodoProps({title: input.title, priority: input.priority, category, dueDate: input.dueDate});
      setInput({
        title: "",
        priority: "LOW",
        category,
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
        <select name="category" onChange={onChange} aria-label="category" data-testid="category-select">
          {categories.map((category, index) => {
            return <option key={index} value={category}>{category}</option>
          })}
        </select>
        {input.category === "Custom" && <input
            type="text"
            className="input-text"
            placeholder="New Category..."
            value={customCategory}
            name="category"
            onChange={onChangeCustomCategory}
        />}
        <select name="priority" data-testid="priority-select" onChange={onChange}>
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
          <FaPlusCircle/>
        </button>
      </form>
  );
};

export default InputTodo;
