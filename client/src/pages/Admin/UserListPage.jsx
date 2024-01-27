import { Link } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';
import { FaTimes, FaTrash, FaEdit, FaCheck } from 'react-icons/fa';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import {
  useGetAllUsersQuery,
  useDeleteUserMutation,
} from '../../slices/usersApiSlice';
import { toast } from 'react-toastify';

const UserListPage = () => {
  const { data: users, isLoading, refetch, error } = useGetAllUsersQuery();

  const [deleteUser, { isLoading: loadingDelete }] = useDeleteUserMutation();

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        // we need unwrap the Promise to catch a possible rejection
        const res = await deleteUser(id).unwrap();
        toast.success(res.message);
        refetch();
      } catch (err) {
        console.log(err);
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <>
      <h1>Users</h1>

      {loadingDelete ? <Loader /> : null}

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              return (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user?.name}</td>
                  <td>
                    <a href={`mailto:${user?.email}`}>{user?.email}</a>
                  </td>
                  <td>
                    {user.isAdmin ? (
                      <FaCheck style={{ color: 'green' }} />
                    ) : (
                      <FaTimes style={{ color: 'red' }} />
                    )}
                  </td>
                  <td>
                    <Link to={`/admin/user/${user._id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <FaEdit />
                      </Button>
                    </Link>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(user._id)}
                    >
                      <FaTrash style={{ color: 'white' }} />
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
    </>
  );
};
export default UserListPage;
