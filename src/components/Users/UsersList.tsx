import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import React, { useState } from "react";
import { User } from "types";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";
type ParamsUserList = {
  users: User[];
};
const UsersList: React.FC<ParamsUserList> = ({ users }) => {
  const [localSearch, setLocalSearch] = useState<string>("");
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setLocalSearch(value);
 
  };

  return (
    <Grid container spacing={2} sx={{ width: "90%", margin: "0 auto" }}>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          margin: "0 auto",
          paddingTop: "10rem",
        }}
      >
        <h2>Usuarios registrados en el sistema</h2>
      </Box>

      <TextField
        label="Buscar usuarios"
        variant="outlined"
        value={localSearch}
        onChange={handleSearchChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {localSearch && (
                <IconButton onClick={() => setLocalSearch("")}>
                  <ClearIcon />
                </IconButton>
              )}
              <IconButton>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
        fullWidth // Para que ocupe todo el ancho disponible
      />

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          paddingTop: "4rem",
        }}
      >
        {users
          .filter(
            (u) =>
              u.name.toLowerCase().includes(localSearch.toLowerCase()) ||
              u.email.toLowerCase().includes(localSearch.toLowerCase())
          )
          .map((user) => (
            
            <Grid  item xs="auto" sm="auto" md="auto" lg="auto" xl="auto" key={user.id}>
              <Card>
                <CardContent>
                  <Typography
                    sx={{ display: "flex", alignItems: "center" }}
                    gutterBottom
                    variant="h5"
                    component="div"
                  >
                    <Avatar
                      sx={{
                        width: 20,
                        height: 20,
                        backgroundColor: "primary.main",
                        margin: "5px",
                      }}
                    >
                      <AccountCircleIcon
                        sx={{ fontSize: 30, color: "white" }}
                      />
                    </Avatar>
                    {user.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {user.email}
                  </Typography>
                  <Box sx={{background:'#1976d2',width:'fit-content',padding:'.4rem'}}>
                    <Typography 
                      variant="body2"
                      color="#fff"
                      sx={{ fontWeight: "bold" }}
                    >
                      Rol: {user.role}
                    </Typography>
                  </Box>
                  {user.role === "seyer" && (
                    <Typography variant="body2" color="text.secondary">
                      <Button>Ver productos</Button>
                    </Typography>
                  )}
                  <Typography variant="body2" color="text.secondary">
                    Estado: {user.status === "active" ? "activo" : "inactivo"}
                  </Typography>
                  <Typography variant="body2" color="text.primary">
                    Miembro desde
                    <div>{user.createdAt}</div>
                  </Typography>
                  <Button
                    variant="contained"
                    component={Link}
                    sx={{ marginTop: ".9rem" }}
                    to={`/user/products/${user.id}`}
                  >
                    Ver Productos
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Box>
    </Grid>
  );
};

export default UsersList;
