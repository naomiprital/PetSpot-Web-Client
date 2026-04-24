import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from '../../hooks/useUsers';

const ProtectedRoute = () => {
  const { data: user, isLoading } = useUser();

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20vh' }}>
        <h2>Loading PetSpot...</h2>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
