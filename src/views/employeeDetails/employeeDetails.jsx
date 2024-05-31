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
} from "@mui/material";

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
    logo: "https://via.placeholder.com/100x100",
    website: "https://www.companyC.com",
  },
];

const EmployeeDetails = () => {
  return (
    <TableContainer
      component={Paper}
      style={{
        width: "100%",
        marginTop: "30px",
      }}
    >
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Logo</TableCell>
            <TableCell>Website</TableCell>
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EmployeeDetails;
