import { useState, useEffect } from "react";
import Header from "./Header";
import InputTodo from "./InputTodo";
import TodosList from "./TodosList";
import styles from "./TodoContainer.module.css";

const TodoContainer = () => {
  const [todos, setTodos] = useState([]);
  const [categories, setCategories] = useState([
    "Work",
    "Private",
    "Groceries",
    "Custom"
]);

  const fetchTodos = async (firstRun) => {
    const response = await fetch('http://localhost:8080/api/v1/todo', { method: 'GET' });
    const data = await response.json();
    setTodos(data);

    if(firstRun) {
      setCategories(
        categories.concat(
          data.filter((todo) => !categories.includes(todo.category))
          .map((todo) => todo.category)) 
      )
    }
};

  useEffect(() => {
    fetchTodos(true);
  },[]);

  const handleChange = (id) => {
    setTodos((prevState) =>
      prevState.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }
        return todo;
      })
    );
  };

  const delTodo = async(id) => {
    await fetch(`http://localhost:8080/api/v1/todo/${id}`, { method: 'DELETE' });
    fetchTodos();
  };

  const addTodoItem = async ({title, priority, category, dueDate}) => {
    const newTodo = {
      title,
      priority,
      category,
      completed: false,
      dueDate
    };
    
    await fetch('http://localhost:8080/api/v1/todo', { 
      method: 'POST', 
      headers: {
      'Content-Type': 'application/json'
      }, 
      body: JSON.stringify(newTodo)  
    });
    fetchTodos();
  };

  const updateTodoItem = async (updatedTodo) => {
    await fetch(`http://localhost:8080/api/v1/todo/${updatedTodo.id}`, 
      {
        method: 'PUT', 
        headers: {
        'Content-Type': 'application/json'
        }, 
        body: JSON.stringify(updatedTodo)
      }
  );
    fetchTodos();
  };

  return (
    <div className={styles.inner}>
      <Header />
      <InputTodo addTodoProps={addTodoItem} categories={categories} setCategories={setCategories} />
      <TodosList
        todos={todos}
        handleChangeProps={handleChange}
        deleteTodoProps={delTodo}
        updateTodoItem={updateTodoItem}
        categories={categories}
        setCategories={setCategories}
      />
    </div>
  );
};

export default TodoContainer;
