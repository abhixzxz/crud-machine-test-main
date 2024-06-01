import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Link,
  Button,
  Modal,
  Box,
  TextField,
  IconButton,
  Tooltip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AddIcon from "@mui/icons-material/Add";
import { useFormik } from "formik";
import * as Yup from "yup";
import ReadModal from "./readModal/readModal";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useAuth } from "../../context/authContext";

const EmployeeDetails = () => {
  const [employees, setEmployees] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [readModalOpen, setReadModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const { authUser } = useAuth();
  console.log("Authenticated User:", authUser);
  useEffect(() => {
    axios
      .get("/api/employees/getAllEmployees")
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.error("Error fetching employee data:", error);
      });
  }, []);
  // console.log("employees:=>", employees);

  useEffect(() => {
    axios
      .get("/api/companies/getAllCompany")
      .then((response) => {
        setCompanies(response.data);
      })
      .catch((error) => {
        console.error("Error fetching company data:", error);
      });
  }, []);
  // console.log("companies:=>", companies);

  const handleRead = (employee) => {
    setSelectedEmployee(employee);
    setReadModalOpen(true);
  };

  const handleCloseReadModal = () => {
    setReadModalOpen(false);
  };

  const handleEdit = (index) => {
    setCurrentEmployee({ ...employees[index], index });
    setIsEditing(true);
    setOpenModal(true);
  };

  const handleDelete = async (index) => {
    const employeeId = employees[index].id;
    try {
      await axios.delete(`/api/employees/deleteEmployee/${employeeId}`);
      const updatedEmployees = employees.filter((_, i) => i !== index);
      setEmployees(updatedEmployees);
      console.log("Deleted employee at index:", index);
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setCurrentEmployee(null);
  };

  const handleCreateNew = () => {
    setCurrentEmployee(null);
    setIsEditing(false);
    setOpenModal(true);
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required("Firstname is required"),
    lastName: Yup.string().required("Lastname is required"),
    company: Yup.string().required("Company is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string().required("Phone is required"),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      company: "",
      email: "",
      phone: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      console.log("values:", values);
      try {
        let response;
        if (isEditing) {
          const employeeId = currentEmployee.id;
          response = await axios.put(
            `/api/employees/updateEmployee/${employeeId}`,
            values
          );
          console.log("Employee updated:", response.data);
        } else {
          response = await axios.post("/api/employees/addEmployee", values);
          console.log("Employee created:", response.data);
        }

        // Fetch updated employee data and set it
        const updatedEmployees = await axios.get(
          "/api/employees/getAllEmployees"
        );
        setEmployees(updatedEmployees.data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setSubmitting(false);
        handleCloseModal();
      }
    },
    enableReinitialize: true,
  });

  useEffect(() => {
    if (currentEmployee) {
      formik.setValues({
        firstName: currentEmployee.firstName,
        lastName: currentEmployee.lastName,
        company: currentEmployee.company,
        email: currentEmployee.email,
        phone: currentEmployee.phone,
      });
    }
  }, [currentEmployee]);

  return (
    <>
      <TableContainer
        component={Paper}
        style={{
          width: "100%",
          marginTop: "30px",
        }}
      >
        <Table
          style={{
            width: "100%",
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell
                style={{
                  fontWeight: "bold",
                  textTransform: "uppercase",
                }}
              >
                Firstname
              </TableCell>
              <TableCell
                style={{
                  fontWeight: "bold",
                  textTransform: "uppercase",
                }}
              >
                Lastname
              </TableCell>
              <TableCell
                style={{
                  fontWeight: "bold",
                  textTransform: "uppercase",
                }}
              >
                Company
              </TableCell>
              <TableCell
                style={{
                  fontWeight: "bold",
                  textTransform: "uppercase",
                }}
              >
                Email
              </TableCell>
              <TableCell
                style={{
                  fontWeight: "bold",
                  textTransform: "uppercase",
                }}
              >
                Phone
              </TableCell>
              <TableCell
                style={{
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  textAlign: "center",
                }}
              >
                Actions
              </TableCell>
              <TableCell
                style={{
                  textAlign: "center",
                }}
              >
                <Tooltip title="Add New Company">
                  <IconButton color="primary" onClick={handleCreateNew}>
                    <h6
                      style={{
                        marginRight: "5px",
                      }}
                    >
                      CREATE
                    </h6>
                    <AddCircleIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees.map((employee, index) => (
              <TableRow key={index}>
                <TableCell>{employee.firstName}</TableCell>
                <TableCell>{employee.lastName}</TableCell>
                <TableCell>{employee.company}</TableCell>
                <TableCell>{employee.email}</TableCell>
                <TableCell>{employee.phone}</TableCell>
                <TableCell>
                  <Button
                    style={{
                      marginRight: "10px",
                      color: "green",
                    }}
                    startIcon={<VisibilityIcon />}
                    onClick={() => handleRead(employee)}
                  >
                    Read
                  </Button>
                  <Button
                    style={{
                      marginRight: "10px",
                    }}
                    startIcon={<EditIcon />}
                    onClick={() => handleEdit(index)}
                  >
                    Edit
                  </Button>
                  <Button
                    style={{
                      marginRight: "10px",
                      color: "red",
                    }}
                    startIcon={
                      <DeleteIcon
                        style={{
                          color: "red",
                        }}
                      />
                    }
                    onClick={() => handleDelete(index)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <ReadModal
            isOpen={readModalOpen}
            onClose={handleCloseReadModal}
            employee={selectedEmployee}
          />
        </Table>
      </TableContainer>

      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <h2
            style={{
              fontFamily: "monospace",
              fontWeight: "bold",
              fontSize: "24px",
              textAlign: "center",
            }}
          >
            {isEditing ? "Edit Employee" : "Create New Employee"}
          </h2>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              margin="normal"
              label="Firstname"
              name="firstName"
              value={formik.values.firstName}
              onChange={formik.handleChange}
              error={
                formik.touched.firstName && Boolean(formik.errors.firstName)
              }
              helperText={formik.touched.firstName && formik.errors.firstName}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Lastname"
              name="lastName"
              value={formik.values.lastName}
              onChange={formik.handleChange}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
              helperText={formik.touched.lastName && formik.errors.lastName}
            />
            <FormControl fullWidth variant="filled">
              <InputLabel id="demo-simple-select-standard-label">
                Select company
              </InputLabel>

              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="company"
                value={formik.values.company}
                onChange={formik.handleChange}
                error={formik.touched.company && Boolean(formik.errors.company)}
              >
                {companies.map((company) => (
                  <MenuItem key={company.id} value={company.id}>
                    {company.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              fullWidth
              margin="normal"
              label="Email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Phone"
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ marginTop: "20px" }}
            >
              {isEditing ? "Save" : "Create"}
            </Button>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default EmployeeDetails;
