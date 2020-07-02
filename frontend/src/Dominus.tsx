import React, { ReactNode, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { RouteComponentProps, RouteProps } from 'react-router';
import jwtDecode from 'jwt-decode';
import DominusAppBar from './AppBar';
import OwnApartments from './OwnApartments';
import Login from './Login';

function isAuthenticated(): boolean {
  const token = localStorage.getItem('dominus-token');
  if (!token) {
    return false;
  }
  return jwtDecode<{readonly exp: number}>(token).exp > (Date.now() / 1000);
}

export default function Dominus(_props: {}): JSX.Element {
  const [state, setState] = useState({ isAuthenticated: isAuthenticated() });

  function onLogout(): void {
    localStorage.removeItem('dominus-token');
    setState({ ...state, isAuthenticated: false });
  }
  function onLogin(token: string|null): void {
    localStorage.setItem('dominus-token', String(token));
    setState({ ...state, isAuthenticated: true });
  }
  function AuthRoute(props: RouteProps): JSX.Element {
    const { children, ...rest } = props;

    const renderer = (routeComponentProps: RouteComponentProps<{}>): ReactNode => {
      const { location } = routeComponentProps;
      return state.isAuthenticated
        ? children
        : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        );
    };
    // eslint-disable-next-line react/jsx-props-no-spreading
    return <Route {...rest} render={renderer} />;
  }

  return (
    <Router>
      <DominusAppBar authenticated={state.isAuthenticated} logout={onLogout} />
      <React.StrictMode>
        <Switch>
          // TODO: Type-safe paths
          <Route path="/login">
            <Login onLogin={onLogin} />
          </Route>
          <AuthRoute path="/apartments">
            <OwnApartments />
          </AuthRoute>
          <AuthRoute path="/tenants">
            <div>tenants</div>
          </AuthRoute>
          <AuthRoute path="/misc">
            <div>misc</div>
          </AuthRoute>
          <AuthRoute path="/homeSeekers">
            <div>home seekers</div>
          </AuthRoute>
          <AuthRoute path="/otherApts">
            <div>other interesting apartments</div>
          </AuthRoute>
          <AuthRoute path="/">
            <div />
          </AuthRoute>
        </Switch>
      </React.StrictMode>
    </Router>
  );
}
