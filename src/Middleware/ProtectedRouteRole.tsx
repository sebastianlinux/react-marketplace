import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom'; // Importa useLocation
import { RootState } from 'store';

interface ProtectedRouteRoleProps {
  allowedRoles?: string[];
  element: React.ReactNode; // Añade el prop element
}

const ProtectedRouteRole: React.FC<ProtectedRouteRoleProps> = ({ allowedRoles, element }) => {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const location = useLocation(); // Obtén la ubicación actual

  if (!isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />; // Usa state y replace
  }

  if (allowedRoles && user?.role && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" state={{ from: location }} replace />; // Usa state y replace
  }

  return <>{element}</>; // Renderiza el componente que se pasa como prop
};

export default ProtectedRouteRole;