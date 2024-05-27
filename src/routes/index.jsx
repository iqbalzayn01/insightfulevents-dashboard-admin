import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';

import Login from '../pages/login';
import RequireAuth from './requireAuth';
import Dashboard from '../pages/dashboard';
import NotFound from '../pages/notFound';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/login" element={<Login />} />
      <Route element={<RequireAuth />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/*" element={<NotFound />} />
      </Route>
    </>
  )
);

export default router;
