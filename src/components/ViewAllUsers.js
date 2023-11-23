"use client";
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { List, ListItem, ListItemText, Paper } from "@mui/material";

// export default function ViewAllUsers() {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     // When the component mounts, fetch user data
//     fetchUserData();
//   }, []);

//   const fetchUserData = () => {
//     setLoading(true);

//     axios
//       .get("http://localhost:3000/user", {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("access_token")}`,
//         },
//       })
//       .then((response) => {
//         setData(response.data);
//         setLoading(false);
//         console.log("==================", response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching user data", error);
//         setLoading(false);
//       });
//   };

//   return (
//     <div>
//       <div className="flex flex-col items-center justify-between font-bold pt-16 pb-10 text-4xl">
//         View All Users
//       </div>
//       <Paper
//         elevation={3}
//         className="border border-black p-4"
//         style={{ minWidth: "600px" }}
//       >
//         {loading ? (
//           <p>Loading...</p>
//         ) : (
//           <List>
//             {data.map((user) => (
//               <ListItem key={user.id}>
//                 <ListItemText
//                   primary={`${user.id}) ${user.firstName} ${user.lastName}`}
//                 />
//                 <ListItemText secondary={`${user.email}`} />
//               </ListItem>
//             ))}
//           </List>
//         )}
//       </Paper>
//     </div>
//   );
// }
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";

export default function ViewAllUsers() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // When the component mounts, fetch user data
    fetchUserData();
  }, []);

  const fetchUserData = () => {
    setLoading(true);

    axios
      .get("http://localhost:3000/user", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      })
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user data", error);
        setLoading(false);
      });
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-between font-bold pt-16 pb-10 text-4xl">
        View All Users
      </div>
      <TableContainer
        component={Paper}
        elevation={3}
        style={{ minWidth: "800px" }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell>Loading...</TableCell>
              </TableRow>
            ) : (
              data.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{`${user.firstName} ${user.lastName}`}</TableCell>
                  <TableCell>{user.email}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
