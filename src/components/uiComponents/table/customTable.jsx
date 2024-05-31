import React from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PopupDelete from "./popupDelete/PopupDelete";

const CustomTable = ({
  data,
  onEdit,
  onDelete,
  open,
  setOpen,
  handleClickOpen,
  handleClose,
}) => {
  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell
              sx={{
                fontWeight: "bold",
              }}
            >
              Name
            </TableCell>
            <TableCell
              sx={{
                fontWeight: "bold",
              }}
            >
              Age
            </TableCell>
            <TableCell
              sx={{
                fontWeight: "bold",
              }}
            >
              Email
            </TableCell>
            <TableCell
              sx={{
                fontWeight: "bold",
              }}
            >
              Department
            </TableCell>
            <TableCell
              sx={{
                fontWeight: "bold",
              }}
            >
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.age}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.department}</TableCell>
              <TableCell>
                <IconButton onClick={() => onEdit(row.id)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleClickOpen(row.id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <PopupDelete
        open={open}
        setOpen={setOpen}
        handleClose={handleClose}
        handleDelete={onDelete}
      />
    </>
  );
};

export default CustomTable;
