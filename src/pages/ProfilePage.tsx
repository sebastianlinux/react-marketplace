import { useSelector } from "react-redux";
import { RootState } from "store";
import { Card, CardContent, Typography, Avatar, Box } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Navbar from "components/Navbar";


const ProfilePage = () => {
    const { user } = useSelector((state: RootState) => state.auth);

    return (
        <>
        <Navbar />
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>  
            <Card sx={{ maxWidth: 400, width: '90%' }}> {/* Ajusta el ancho máximo */}
                <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>  
                    <Avatar sx={{ width: 100, height: 100, mb: 2, backgroundColor: 'primary.main' }}> 
                        <AccountCircleIcon sx={{ fontSize: 80, color: 'white' }} /> 
                    </Avatar>
                    {user && (  
                        <>
                            <Typography variant="h5" component="h2" gutterBottom>
                                {user.name}
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                {user.email}
                            </Typography>

                            <Typography variant="body2" color="text.secondary">
                                Rol: {user.role}
                            </Typography>
                        </>
                    )}
                    {!user && (
                        <Typography variant="body1" color="text.secondary">
                            No hay usuario logueado.
                        </Typography>
                    )}
                </CardContent>
            </Card>
        </Box>
        </>
    );
}

export default ProfilePage