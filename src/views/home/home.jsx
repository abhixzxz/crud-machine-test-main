import React, { useEffect, useState } from "react";
import CustomTable from "../../components/uiComponents/table/customTable";
import { Button, Grid, TextField } from "@mui/material";
import axios from "axios";

function Home() {
  const [tableData, setTableData] = useState([
    {
      name: "Akanksha Sharma",
      age: 28,
      email: "akanksha@example.com",
      department: "HR",
    },
    {
      name: "Rahul Gupta",
      age: 35,
      email: "rahul@example.com",
      department: "Marketing",
    },
    {
      name: "Priya Patel",
      age: 30,
      email: "priya@example.com",
      department: "Finance",
    },
    {
      name: "Amit Kumar",
      age: 32,
      email: "amit@example.com",
      department: "Engineering",
    },
    {
      name: "Neha Singh",
      age: 27,
      email: "neha@example.com",
      department: "Operations",
    },
    {
      name: "Ankit Sharma",
      age: 29,
      email: "ankit@example.com",
      department: "Sales",
    },
    {
      name: "Shivani Reddy",
      age: 31,
      email: "shivani@example.com",
      department: "HR",
    },
    {
      name: "Ravi Desai",
      age: 33,
      email: "ravi@example.com",
      department: "Engineering",
    },
    {
      name: "Pooja Gupta",
      age: 26,
      email: "pooja@example.com",
      department: "Finance",
    },
    {
      name: "Vivek Mishra",
      age: 34,
      email: "vivek@example.com",
      department: "Marketing",
    },
  ]);

  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    email: "",
    department: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleClickOpen = (userId) => {
    setDeleteUserId(userId);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    if (deleteUserId !== null) {
      try {
        await axios.delete(`/delete_user/${deleteUserId}`);
        setUsers(users.filter((user) => user.id !== deleteUserId));
        setDeleteUserId(null);
      } catch (err) {
        console.error("Error deleting user:", err);
      }
    }
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    axios
      .post("/addUser", formData)
      .then((res) => {
        console.log(res);
        setUsers([...users, res.data]);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/get_all_users");
        setUsers(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  console.log("users:", users);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Grid
          container
          spacing={2}
          style={{
            marginTop: "10px",
          }}
        >
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Name"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Department"
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Age"
              id="age"
              name="age"
              type="number"
              value={formData.age}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Email"
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
        <Button
          variant="contained"
          type="submit"
          style={{ marginTop: "10px", float: "right" }}
        >
          Add Entry
        </Button>
      </form>
      <CustomTable
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
        open={open}
        setOpen={setOpen}
        data={users}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default Home;
