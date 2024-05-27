import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { fetchUser } from '../../redux/auth/actions';

import Sidebar from '../../components/sidebar';

const Dashboard = () => {
  const getToken = useSelector((state) => state.auth.token);
  const getUser = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (getToken) {
          dispatch(fetchUser());
        }
      } catch (error) {
        console.error('Get One User Error:', error);
      }
    };

    fetchData();
  }, [getToken, dispatch]);

  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-64 p-4">
        <h1 className="text-2xl">Dashboard</h1>
        <p>Welcome to the admin dashboard!</p>
        {getToken && <h1 className="text-2xl">{`Halo, ${getUser.name}`}</h1>}
      </main>
    </div>
  );
};

export default Dashboard;
