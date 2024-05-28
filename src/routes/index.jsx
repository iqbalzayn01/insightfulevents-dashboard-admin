import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';

import Login from '../pages/login';
import RequireAuth from './requireAuth';
import Dashboard from '../pages/dashboard';
import DataUser from '../pages/users';
import DataPembicara from '../pages/talents';
import NotFound from '../pages/notFound';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/login" element={<Login />} />
      <Route element={<RequireAuth />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/data-user" element={<DataUser />} />
        <Route path="/data-pembicara" element={<DataPembicara />} />
        <Route path="/*" element={<NotFound />} />
      </Route>
    </>
  )
);

export default router;
