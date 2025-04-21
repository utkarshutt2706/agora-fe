import { AuthContext } from '@/contexts/AuthContext';
import { UserWithToken } from '@/interfaces';
import { getAuthToken, getUserDetails } from '@/lib/storage';
import { JSX, useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { CustomRoute, routes } from '../../routes/index';

const renderRoute = (routes: CustomRoute[]): JSX.Element[] => {
  return routes.map((route): JSX.Element => {
    return (
      <Route key={route.path} path={route.path} element={<route.Component />}>
        {route.children &&
          route.children.length > 0 &&
          renderRoute(route.children)}
      </Route>
    );
  });
};

function PrivateRoute() {
  const navigate = useNavigate();
  const [authData, setAuthData] = useState(null as UserWithToken | null);

  useEffect(() => {
    const user = getUserDetails();
    const authToken = getAuthToken();
    if (user && authToken) {
      setAuthData({ user, authToken });
    } else {
      navigate('/');
    }
  }, [navigate]);

  return (
    <>
      <AuthContext.Provider value={authData}>
        <Routes>{renderRoute(routes)}</Routes>
      </AuthContext.Provider>
    </>
  );
}

export default PrivateRoute;
