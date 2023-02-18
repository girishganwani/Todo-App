import React, { useState } from "react";
import {
  Button,
  TextField,
  Box,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import Checkbox from "@mui/material/Checkbox";
import { v4 as uuidv4 } from "uuid";
import "./style.css";

const Todo = () => {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);

  const addTodo = (e) => {
    e.preventDefault();
    if (!task) {
      alert("Enter the task");
      return;
    }
    const todo = {
      id: uuidv4(),
      task: task,
      isDone: false,
    };
    setTodos((prev) => [...prev, todo]);
    setTask("");
  };

  const removeTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleChange = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) return { ...todo, isDone: !todo.isDone };
        return todo;
      })
    );
  };

  return (
    <Box>
      <Typography className="header" variant="h4">
        Todo List
      </Typography>
      <Box className="todoHeader">
        <form onSubmit={addTodo} className="form">
          <TextField
            id="filled-basic"
            label="Add Todo"
            value={task}
            variant="standard"
            onChange={(e) => setTask(e.target.value)}
          />
          <Button type="submit" size="large">
            <AddIcon />
          </Button>
        </form>
        <Box>
          {todos.length ? (
            <List>
              {todos.map((todo) => {
                return (
                  <ListItem key={todo.id} className="listItem">
                    <Checkbox
                      checked={todo.isDone}
                      onChange={() => handleChange(todo.id)}
                      color="success"
                    />
                    <span
                      style={{
                        textDecoration: todo.isDone ? "line-through" : "none",
                        color: todo.isDone ? "red" : "black",
                        width: "50%",
                      }}
                    >
                      {todo.task}
                    </span>

                    <DeleteTwoToneIcon onClick={() => removeTodo(todo.id)} />
                  </ListItem>
                );
              })}
            </List>
          ) : (
            <Typography color="error" variant="body1">
              No Todos Pending
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Todo;
