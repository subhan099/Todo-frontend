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

export default function DeleteUser({ onUserDeleted }) {
  const [userId, setUserId] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [data, setData] = useState([]);

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

  const handleDeleteUser = () => {
    axios
      .delete(`http://localhost:3000/user/${selectedUser}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((response) => {
        console.log("deleted user", response.data);
        setUserId("");
        setSelectedUser(data[0].id);
        onUserDeleted();
        if (response.data.status === "failure") {
          alert("don't have access!");
        } else {
          alert("deleted!!");
        }
      })
      .catch((error) => {
        console.log("error deleting user", error);
        alert("Error deleting");
      });
  };
  return (
    <div>
      <div className="flex flex-col items-center justify-between font-bold pt-16 pb-10 text-4xl">
        Delete User
      </div>
      <Container className=" mx-auto" style={{ minWidth: "800px" }}>
        <Paper elevation={3} className="border border-black p-4">
          {/* <h2>SignUp</h2> */}
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
              onClick={handleDeleteUser}
            >
              Delete User
            </Button>
          </form>
        </Paper>
      </Container>
    </div>
  );
}
