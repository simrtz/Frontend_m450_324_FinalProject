/* eslint react/prop-types: 0 */
import { useState, useEffect } from "react";
import { FaPlusCircle } from "react-icons/fa";

const InputTodo = ({addTodoProps}) => {
  const [input, setInput] = useState({
    title: "",
    priority: "LOW",
    category: "Work"
  });

  const [customCategory, setCustomCategory] = useState("")

  const [categories, setCategories] = useState([
    "Work",
    "Private",
    "Groceries",
    "Custom",
  ]);

  useEffect(() => {
    input.category !== "Custom" && setCustomCategory("")
  }, [input.category])

  const onChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
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

      addTodoProps({title: input.title, priority: input.priority, category});
      setInput({
        title: "",
        priority: "LOW",
        category
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
      <select name="category" onChange={onChange}>
        {categories.map(category => {
          return <option value={category}>{category}</option>
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
      <select name="priority" onChange={onChange}>
        <option value="LOW">Low</option>
        <option value="MEDIUM">Medium</option>
        <option value="HIGH">High</option>
      </select>
      <button data-set="add-todo-btn" className="input-submit">
        <FaPlusCircle />
      </button>
    </form>
  );
};

export default InputTodo;
