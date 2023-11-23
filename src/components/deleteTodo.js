"use client";
import {
  Container,
  Paper,
  TextField,
  Button,
  Select,
  MenuItem,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function DeleteTodo({ onTodoDeleted }) {
  const [todoId, setTodoId] = useState("");
  const [selectedTodo, setSelectedTodo] = useState("Select");
  const [data, setData] = useState([]);

  const handleGetTodos = () => {
    axios
      .get("http://localhost:3000/todo", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user data", error);
      });
  };

  useEffect(() => {
    handleGetTodos();
  }, []);

  useEffect(() => {
    // Set the initial option as the first user in data when the component mounts
    if (data.length > 0) {
      setSelectedTodo(data[0].id);
    }
  }, [data]);

  const handleDeleteTodo = () => {
    axios
      .delete(`http://localhost:3000/todo/${selectedTodo}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((response) => {
        console.log("deleted todo", response.data);
        alert("deleted!!");
        setTodoId("");
        setSelectedTodo(data[0].id);
        onTodoDeleted();
        // if (response.data.status === "failure") {
        //   alert("don't have access!");
        // } else {
        //   alert("deleted!!!!!!!!");
        // }
      })
      .catch((error) => {
        console.log("error deleting todo", error);
        alert("Error deleting");
      });
  };
  return (
    <div>
      <div className="flex flex-col items-center justify-between font-bold pt-16 pb-10 text-4xl">
        Delete Todo
      </div>
      <Container className=" mx-auto" style={{ minWidth: "800px" }}>
        <Paper elevation={3} className="border border-black p-4">
          <form>
            {/* <TextField
              label="UserId"
              variant="outlined"
              fullWidth
              margin="normal"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            /> */}
            <Select
              id="select-todo"
              variant="outlined"
              fullWidth
              value={selectedTodo}
              style={{ marginBottom: "8px" }}
              onChange={(e) => setSelectedTodo(e.target.value)}
              MenuProps={{
                anchorOrigin: {
                  vertical: "bottom",
                  horizontal: "left",
                },
                transformOrigin: {
                  vertical: "top",
                  horizontal: "left",
                },
                getContentAnchorEl: null,
                PaperProps: {
                  style: {
                    maxHeight: "200px", // Set the maximum height
                  },
                },
              }}
            >
              {data.map((todo) => (
                <MenuItem
                  key={todo.id}
                  value={todo.id}
                  style={{ overflow: "auto" }} // Enable scrolling for long items
                >
                  {todo.title} - {todo.status}
                </MenuItem>
              ))}
            </Select>
            <Button
              variant="contained"
              style={{ backgroundColor: "#3299ff", color: "white" }}
              onClick={handleDeleteTodo}
            >
              Delete Todo
            </Button>
          </form>
        </Paper>
      </Container>
    </div>
  );
}
