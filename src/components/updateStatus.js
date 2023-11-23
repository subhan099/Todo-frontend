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

export default function UpdateStatus() {
  const [status, setStatus] = useState("backlog");
  const [selectedTodo, setSelectedTodo] = useState("");
  const [data, setData] = useState([]);
  const [id, setId] = useState("");

  useEffect(() => {
    const id = localStorage.getItem("ID");
    // console.log("in use effect=============", id);
    setId(id);
  }, []);

  // console.log("--------------", id);
  const handleGetTodos = () => {
    axios
      .get(`http://localhost:3000/todo/findfk/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((response) => {
        setData(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching user data", error);
      });
  };

  // const handleGetTodos = () => {
  //   // setStatus("backlog");

  //   axios
  //     .get(`http://localhost:3000/todo/findfk/${id}`, {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem("access_token")}`,
  //       },
  //     })
  //     .then((response) => {
  //       console.log("in");
  //       setData(response.data);
  //       console.log("check for array =============== ", data);
  //     })
  //     .catch((error) => {
  //       // console.log("--------------", id);
  //       console.error("Error fetching user data fk", error);
  //     });
  // };

  useEffect(() => {
    handleGetTodos();
  }, [id]);

  useEffect(() => {
    // Set the initial option as the first user in data when the component mounts
    if (data.length > 0) {
      setSelectedTodo(data[0].id);
    }
  }, [data]);

  const handleUpdateStatus = () => {
    // console.log("Status:", status);
    // console.log("TodoId:", todoId);
    console.log("selectedTodo:", selectedTodo);

    axios
      .patch(
        "http://localhost:3000/todo/update",
        {
          todoId: selectedTodo,
          status,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      )
      .then((response) => {
        console.log("todo created", response.data);
        setStatus("backlog");
        setSelectedTodo(data[0].id);
        handleGetTodos();
        if (response.data.status === "failure") {
          alert("don't have access!");
        } else {
          alert("updated!!");
        }
      })
      .catch((error) => {
        console.log("error updating todo", error);
        alert("Error updating");
      });
  };
  // console.log("checking userID IN TODOS================", data);
  return (
    <main>
      <div className="flex flex-col items-center justify-between font-bold pt-16 pb-10 text-4xl">
        Update Todo Status
      </div>
      <Container className="mx-auto" style={{ minWidth: "800px" }}>
        <Paper elevation={3} className="border border-black p-4">
          <form>
            <Select
              // label="Task Status"
              // variant="outlined"
              fullWidth
              value={status}
              style={{ marginBottom: "8px" }}
              onChange={(e) => setStatus(e.target.value)}
            >
              <MenuItem value="backlog">Backlog</MenuItem>
              <MenuItem value="in progress">In Progress</MenuItem>
              <MenuItem value="done">Done</MenuItem>
            </Select>

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
                    maxHeight: "200px",
                  },
                },
              }}
            >
              {data?.map((todo) => (
                <MenuItem
                  key={todo.id}
                  value={todo.id}
                  style={{ overflow: "auto" }}
                >
                  {todo.title} - {todo.status}
                </MenuItem>
              ))}
            </Select>

            <Button
              variant="contained"
              style={{ backgroundColor: "#3299ff", color: "white" }}
              onClick={handleUpdateStatus}
            >
              Update
            </Button>
          </form>
        </Paper>
      </Container>
    </main>
  );
}
