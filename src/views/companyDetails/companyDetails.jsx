import React from "react";
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
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";

const dummyCompanies = [
  {
    name: "Company A",
    email: "companyA@example.com",
    logo: "https://via.placeholder.com/100x100",
    website: "https://www.companyA.com",
  },
  {
    name: "Company B",
    email: "companyB@example.com",
    logo: "https://via.placeholder.com/100x100",
    website: "https://www.companyB.com",
  },
  {
    name: "Company C",
    email: "companyC@example.com",
    logo: "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg",
    website: "https://www.companyC.com",
  },
  {
    name: "Company B",
    email: "companyB@example.com",
    logo: "https://via.placeholder.com/100x100",
    website: "https://www.companyB.com",
  },
  {
    name: "Company C",
    email: "companyC@example.com",
    logo: "https://via.placeholder.com/100x100",
    website: "https://www.companyC.com",
  },
];

const CompaniesDetails = () => {
  const handleRead = (index) => {
    // Add your read logic here
    console.log("Read company details at index:", index);
  };

  const handleEdit = (index) => {
    // Add your edit logic here
    console.log("Edit company at index:", index);
  };

  const handleDelete = (index) => {
    // Add your delete logic here
    console.log("Delete company at index:", index);
  };

  return (
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
          </TableRow>
        </TableHead>
        <TableBody>
          {dummyCompanies.map((company, index) => (
            <TableRow key={index}>
              <TableCell>{company.name}</TableCell>
              <TableCell>{company.email}</TableCell>
              <TableCell>
                {company.logo && (
                  <Avatar
                    alt={company.name}
                    src={company.logo}
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
                  onClick={() => handleRead(index)}
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
      </Table>
    </TableContainer>
  );
};

export default CompaniesDetails;
