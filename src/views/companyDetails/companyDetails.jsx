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
  Avatar,
  Link,
  Button,
  Modal,
  Box,
  TextField,
  IconButton,
  Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AddIcon from "@mui/icons-material/Add";
import { useFormik } from "formik";
import ReadModal from "./readModal/readModal";
import { validationSchema } from "./validationSchema";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const CompaniesDetails = () => {
  const [companies, setCompanies] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [currentCompany, setCurrentCompany] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [logoFile, setLogoFile] = useState(null);
  const [readModalOpen, setReadModalOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);

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

  const handleRead = (company) => {
    setSelectedCompany(company);
    setReadModalOpen(true);
  };

  const handleEdit = (index) => {
    setCurrentCompany({ ...companies[index], index });
    setIsEditing(true);
    setOpenModal(true);
  };

  const handleDelete = async (index) => {
    const companyId = companies[index].id;
    try {
      await axios.delete(`/api/companies/deleteCompany/${companyId}`);
      const updatedCompanies = companies.filter((_, i) => i !== index);
      setCompanies(updatedCompanies);
      console.log("Deleted company at index:", index);
    } catch (error) {
      console.error("Error deleting company:", error);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setCurrentCompany(null);
    setLogoFile(null);
  };

  const handleCreateNew = () => {
    formik.resetForm();
    setCurrentCompany(null);
    setIsEditing(false);
    setOpenModal(true);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      website: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("email", values.email);
        formData.append("website", values.website);
        formData.append("logo", logoFile);

        let response;
        if (isEditing) {
          // Update existing company
          const companyId = currentCompany.id;
          response = await axios.put(
            `/api/companies/updateCompany/${companyId}`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          console.log("Company updated:", response.data);
        } else {
          // Create new company
          response = await axios.post("/api/companies/addCompany", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          console.log("Company created:", response.data);
        }
        const updatedCompanies = await axios.get(
          "/api/companies/getAllCompany"
        );
        setCompanies(updatedCompanies.data);
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
    if (currentCompany) {
      formik.setValues({
        name: currentCompany.name,
        email: currentCompany.email,
        website: currentCompany.website,
      });
      setLogoFile(null);
    }
  }, [currentCompany]);

  const handleLogoFileChange = (event) => {
    setLogoFile(event.currentTarget.files[0]);
  };

  const getLogoUrl = (logoPath) => {
    return `http://localhost:5001/${logoPath}`;
  };

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
                Name
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
                Logo
              </TableCell>
              <TableCell
                style={{
                  fontWeight: "bold",
                  textTransform: "uppercase",
                }}
              >
                Website
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
            {companies.map((company, index) => (
              <TableRow key={index}>
                <TableCell>{company.name}</TableCell>
                <TableCell>{company.email}</TableCell>
                <TableCell>
                  {company.logo && (
                    <Avatar
                      alt={company.name}
                      src={company?.logo}
                      sx={{ width: 100, height: 100 }}
                    />
                  )}
                </TableCell>
                <TableCell>
                  {company.website && (
                    <Link href={company.website} target="_blank" rel="noopener">
                      {company.website}
                    </Link>
                  )}
                </TableCell>
                <TableCell>
                  <Button
                    style={{
                      marginRight: "10px",
                      color: "green",
                    }}
                    startIcon={<VisibilityIcon />}
                    onClick={() => handleRead(company)}
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
            onClose={() => setReadModalOpen(false)}
            company={selectedCompany}
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
            {isEditing ? "Edit Company" : "Create New Company"}
          </h2>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              margin="normal"
              label="Name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
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
            <input
              type="file"
              accept="image/*"
              onChange={handleLogoFileChange}
              style={{ marginTop: "20px" }}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Website"
              name="website"
              value={formik.values.website}
              onChange={formik.handleChange}
              error={formik.touched.website && Boolean(formik.errors.website)}
              helperText={formik.touched.website && formik.errors.website}
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

export default CompaniesDetails;
