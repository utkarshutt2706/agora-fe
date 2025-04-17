import { JSX } from 'react';
import { Route, Routes } from 'react-router-dom';
import { CustomRoute, routes } from '../../routes/index';

const renderRoute = (routes: CustomRoute[]) => {
  return routes.map((route): JSX.Element => {
    return (
      <>
        <Route
          key={route.path}
          path={route.path}
          element={<route.Component />}
        />
        {route.children && route.children.length ? (
          renderRoute(route.children)
        ) : (
          <></>
        )}
      </>
    );
  });
};

function PrivateRoute() {
  return (
    <>
      <Routes>{renderRoute(routes)}</Routes>
    </>
  );
}

export default PrivateRoute;
