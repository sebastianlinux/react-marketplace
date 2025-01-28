import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import { User } from "types";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";
type ParamsUserList = {
  users: User[];
};
const UsersList: React.FC<ParamsUserList> = ({ users }) => {
  return (
    <Grid container spacing={2}>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap", 
          gap: 2, 
          margin: "0 auto",
          paddingTop: "4rem",
        }}
      >
        <h2>Usuarios registrados en el sistema</h2>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap", 
          justifyContent: "center", 
          gap: 2, 
          margin: "0 auto",
          paddingTop: "4rem",
        }}
      >
        {users.map((user) => (
          <Grid item xs={12} sm={6} md={3} key={user.id}>
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
                    <AccountCircleIcon sx={{ fontSize: 30, color: "white" }} />
                  </Avatar>
                  {user.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {user.email}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{fontWeight:'bold'}}>
                 Rol: {user.role}
                </Typography>
                {user.role === "seyer" && (
                  <Typography variant="body2" color="text.secondary">
                    <Button>Ver productos</Button>
                  </Typography>
                )}
                <Typography variant="body2" color="text.secondary">
                  Estado: {user.status === 'active' ? 'activo':'inactivo'}
                </Typography>
                <Typography variant="body2" color="text.primary">
                  Miembro desde
                  <div>{user.createdAt}</div>
                </Typography>
                <Button
                    variant="contained"
                  component={Link}
                  sx={{marginTop:".9rem"}}
                  to={`/admin/users/products/${user.id}`}
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
