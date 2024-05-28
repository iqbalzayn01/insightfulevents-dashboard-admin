import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { fetchUser } from '../../redux/auth/actions';

import Sidebar from '../../components/sidebar';

const Dashboard = () => {
  const getToken = useSelector((state) => state.auth.token);
  const getUser = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (getUser) {
      dispatch(fetchUser());
    }
  }, [getUser, dispatch]);

  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-64 p-10">
        <h1 className="text-2xl">Dashboard</h1>
        <p className="mb-3">Selamat datang di dashboard admin!</p>
        {getToken && <h1 className="text-2xl">{`Halo, ${getUser.name}`}</h1>}
      </main>
    </div>
  );
};

export default Dashboard;
