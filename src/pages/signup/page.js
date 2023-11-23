"use client";
import { Container, Paper, TextField, Button, Link } from "@mui/material";
import React, { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignUp = () => {
    console.log("First Name:", firstName);
    console.log("Last Name:", lastName);
    console.log("Email:", email);
    console.log("Password:", password);
    axios
      .post("http://localhost:3000/user/signUp", {
        firstName,
        lastName,
        email,
        password,
      })
      .then((response) => {
        console.log("signed Up", response.data);
        router.push("/");
      })
      .catch((error) => {
        console.log("Error signing up user", error);
      });
  };

  return (
    <main>
      <div className="flex flex-col items-center justify-between font-bold p-24 text-4xl">
        ToDo List Maintainer
      </div>
      <Container className="w-3/4 mx-auto">
        <Paper elevation={3} className="border border-black p-4">
          <h2 className="flex flex-col items-center justify-between font-bold">
            SignUp
          </h2>
          <form>
            <TextField
              label="First Name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <TextField
              label="Last Name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={lastName}
              onChange={(e) => setlastName(e.target.value)}
            />
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
            <Button
              variant="contained"
              style={{ backgroundColor: "#3299ff", color: "white" }}
              onClick={handleSignUp}
            >
              SignUp
            </Button>
          </form>
          <div className="mt-4">
            <span>Already have an account? </span>
            <Link href="/">
              <span color="primary">Login</span>
            </Link>
          </div>
        </Paper>
      </Container>
    </main>
  );
}
