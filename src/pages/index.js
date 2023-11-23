"use client";
import { Container, Paper, TextField, Button, Link } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import jwt from "jsonwebtoken";

// import { access_token } from "@/API_CONSTANTS/token";
// import signup from "./signup";
import { useRouter } from "next/router";
import { headers } from "../../next.config";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    console.log("Email:", email);
    console.log("Password:", password);

    axios
      .post("http://localhost:3000/auth/login", { email, password })
      .then((response) => {
        console.log("User loged in:", response.data);
        console.log("Access token is as:", response.data.token);
        localStorage.setItem("access_token", response.data.token);
        const decodedToken = jwt.decode(response.data.token);
        // console.log("ROLE+++++++++==========", decodedToken.role);
        localStorage.setItem("role", decodedToken.role);
        // console.log("=========+++++++++++++id", decodedToken.id);
        localStorage.setItem("ID", decodedToken.userId);
        // console.log("=========+++++++++++++userID", decodedToken.userId);

        router.push("/home/page");
      })
      .catch((error) => {
        console.error("Error creating user:", error);
      });
  };

  return (
    <main>
      <div className="flex flex-col items-center justify-between font-bold p-24 text-4xl">
        ToDo List Maintainer
      </div>
      <Container className="w-3/4 mx-auto">
        <Paper elevation={3} className="border border-black p-4">
          <h1 className="flex flex-col items-center justify-between font-bold">
            Login
          </h1>
          <form>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="pt-6">
              <Button
                variant="contained"
                style={{ backgroundColor: "#3299ff", color: "white" }}
                onClick={handleLogin}
              >
                Login
              </Button>
            </div>
          </form>
          <div className="mt-2">
            <span>Don't have an account? </span>
            <Link href="/signup/page">
              <span color="primary">Sign Up</span>
            </Link>
          </div>

          {/* <div className="mt-4">
            <span>Don't have an account? </span>
            <Link href="/home">
              <span color="primary">Home</span>
            </Link>
          </div> */}
        </Paper>
      </Container>
    </main>
  );
}
