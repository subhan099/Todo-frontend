"use client";
import { useEffect, useState } from "react";
import CreateTask from "@/components/createTask";
import UpdateStatus from "@/components/updateStatus";
import DeleteUser from "@/components/deleteUser";
import ViewAllUsers from "@/components/ViewAllUsers";
import DeleteTodo from "@/components/deleteTodo";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

function Home() {
  const [createTask, setCreateTask] = useState(false);
  const [viewAllUsers, setViewAllUsers] = useState(false);
  const [deleteUser, setDeleteUser] = useState(false);
  const [updateStatus, setUpdateStatus] = useState(false);
  const [deleteTodo, setDeleteTodo] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleCreateTask = () => {
    setCreateTask(!createTask);
    setViewAllUsers(false);
    setDeleteUser(false);
    setUpdateStatus(false);
    setDeleteTodo(false);
  };
  const handleViewAllUsers = () => {
    setCreateTask(false);
    setViewAllUsers(!viewAllUsers);
    setDeleteUser(false);
    setUpdateStatus(false);
    setDeleteTodo(false);
  };
  const handleDeleteUser = () => {
    setCreateTask(false);
    setViewAllUsers(false);
    setDeleteUser(!deleteUser);
    setUpdateStatus(false);
    setDeleteTodo(false);
  };
  const handleUpdateStatus = () => {
    setCreateTask(false);
    setViewAllUsers(false);
    setDeleteUser(false);
    setUpdateStatus(!updateStatus);
    setDeleteTodo(false);
  };
  const handleDeleteTodo = () => {
    setCreateTask(false);
    setViewAllUsers(false);
    setDeleteUser(false);
    setUpdateStatus(false);
    setDeleteTodo(!deleteTodo);
  };

  // const checkRole = () => {
  //   setUserRole(localStorage.getItem("role"));
  //   console.log("userRole is to be checked =================", userRole);
  // };
  // useEffect(() => {
  //   checkRole();
  // }, []);

  useEffect(() => {
    const role = localStorage.getItem("role");
    setUserRole(role);
  }, []);

  // console.log("userRole is to be checked =================", userRole);

  useEffect(() => {
    // When the component mounts, fetch user data
    fetchTodoData();
  }, []);

  const fetchTodoData = () => {
    setLoading(true);

    axios
      .get("http://localhost:3000/todo", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((response) => {
        setData(response.data);
        setLoading(false);
        // console.log("==================", response.data);
      })
      .catch((error) => {
        console.error("Error fetching user data", error);
        setLoading(false);
      });
  };

  return (
    <div className="flex flex-col items-center justify-between">
      <div className="font-bold pt-20 pb-10 text-4xl">Home Page</div>
      <div className="flex flex-row space-x-6 mb-10">
        {userRole === "ADMIN" && (
          <button
            onClick={handleCreateTask}
            className="bg-blue-500 text-white py-2 px-4 rounded transition duration-300 ease-in-out hover:bg-blue-700 active:bg-blue-800"
          >
            Create Tasks
          </button>
        )}
        {userRole === "ADMIN" && (
          <button
            onClick={handleViewAllUsers}
            className="bg-blue-500 text-white py-2 px-4 rounded transition duration-300 ease-in-out hover:bg-blue-700 active:bg-blue-800"
          >
            View All Users
          </button>
        )}
        {userRole === "ADMIN" && (
          <button
            onClick={handleDeleteUser}
            className="bg-blue-500 text-white py-2 px-4 rounded transition duration-300 ease-in-out hover:bg-blue-700 active:bg-blue-800"
          >
            Delete User
          </button>
        )}
        {userRole === "ADMIN" && (
          <button
            onClick={handleDeleteTodo}
            className="bg-blue-500 text-white py-2 px-4 rounded transition duration-300 ease-in-out hover:bg-blue-700 active:bg-blue-800"
          >
            Delete Todo
          </button>
        )}
        {userRole === "NORMAL_USER_ROLE" && (
          <button
            onClick={handleUpdateStatus}
            className="bg-blue-500 text-white py-2 px-4 rounded transition duration-300 ease-in-out hover:bg-blue-700 active:bg-blue-800"
          >
            Update Status
          </button>
        )}
      </div>
      {createTask && (
        <div>
          <CreateTask onTaskCreated={fetchTodoData} />
        </div>
      )}
      {viewAllUsers && (
        <div>
          <ViewAllUsers />
        </div>
      )}
      {deleteUser && (
        <div>
          <DeleteUser onUserDeleted={fetchTodoData} />
        </div>
      )}
      {deleteTodo && (
        <div>
          <DeleteTodo onTodoDeleted={fetchTodoData} />
        </div>
      )}
      {updateStatus && (
        <div>
          <UpdateStatus />
        </div>
      )}
      {/* {userRole === "ADMIN" && (
        <div className="mt-20">
          <h2>Todo Data:</h2>
          <ul>
            {data.map((todo) => (
              <li key={todo.id}>
                <strong>Title:</strong> {todo.title}
                <br />
                <strong>Status:</strong> {todo.status}
              </li>
            ))}
          </ul>
        </div>
      )} */}

      {userRole === "ADMIN" && (
        <div className="mt-10">
          <div className="font-bold pt-20 pb-10 text-2xl">Todo Data</div>
          <TableContainer component={Paper} style={{ width: "800px" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((todo) => (
                  <TableRow key={todo.id}>
                    <TableCell>{todo.title}</TableCell>
                    <TableCell>{todo.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </div>
  );
}

export default Home;
