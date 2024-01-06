import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useGetUserProfileQuery } from '../slices/usersApiSlice';
import Loader from './Loader';

const AdminRoute = () => {
  const { userInfo } = useSelector((store) => store.auth);

  const { data: userProfile, isLoading: profileLoading } =
    useGetUserProfileQuery();

  return profileLoading ? (
    <Loader />
  ) : userInfo && userProfile && userProfile?.isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to='/' replace />
  );
};

export default AdminRoute;
