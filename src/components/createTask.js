"use client";
import React, { useState, useEffect } from "react";
import {
  Container,
  Paper,
  TextField,
  Button,
  Select,
  MenuItem,
} from "@mui/material";
import axios from "axios";

export default function CreateTask({ onTaskCreated }) {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("backlog");
  const [selectedUser, setSelectedUser] = useState("");
  const [data, setData] = useState([]);
  const [titleError, setTitleError] = useState(false); // State for tracking the title error

  const handleGetUsers = () => {
    axios
      .get("http://localhost:3000/user", {
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
    handleGetUsers();
  }, []);

  useEffect(() => {
    // Set the initial option as the first user in data when the component mounts
    if (data.length > 0) {
      setSelectedUser(data[0].id);
    }
  }, [data]);

  useEffect(() => {
    // Set the initial option as the first user in data when the component mounts
    if (data.length > 0) {
      setSelectedUser(data[0].id);
    }
  }, [data]);

  const handleCreateTask = () => {
    if (title.trim() === "") {
      // Check if the title is empty
      setTitleError(true); // Set the title error state to true
      return; // Don't proceed with task creation
    }

    axios
      .post(
        "http://localhost:3000/todo/create",
        {
          userId: selectedUser,
          title,
          status,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      )
      .then((response) => {
        console.log("Todo created", response.data);
        setTitle("");
        setStatus("backlog");
        setSelectedUser(data[0].id);
        setTitleError(false);
        alert("Todo Created!");
        onTaskCreated();
      })
      .catch((error) => {
        console.error("Error creating todo", error);
        alert("Could Not Create!");
      });
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-between font-bold pt-16 pb-10 text-4xl">
        Create Task
      </div>
      <Container className=" mx-auto" style={{ minWidth: "800px" }}>
        <Paper elevation={3} className="border border-black p-4">
          <form>
            <TextField
              label="Task Title"
              variant="outlined"
              fullWidth
              margin="normal"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setTitleError(false); // Clear the title error when user types
              }}
              error={titleError} // Apply error style
              helperText={titleError ? "Title can't be empty" : ""} // Display error message
            />
            <Select
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
              id="select-user"
              variant="outlined"
              fullWidth
              value={selectedUser}
              style={{ marginBottom: "8px" }}
              onChange={(e) => setSelectedUser(e.target.value)}
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
              {data.map((user) => (
                <MenuItem
                  key={user.id}
                  value={user.id}
                  style={{ overflow: "auto" }} // Enable scrolling for long items
                >
                  {user.firstName} {user.lastName} - {user.email}
                </MenuItem>
              ))}
            </Select>

            <Button
              variant="contained"
              style={{ backgroundColor: "#3299ff", color: "white" }}
              onClick={handleCreateTask}
            >
              Create
            </Button>
          </form>
        </Paper>
      </Container>
    </div>
  );
}
