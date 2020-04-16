import React, { ReactNode, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { RouteComponentProps, RouteProps } from 'react-router';
import DominusAppBar from './AppBar';
import OwnApartments from './OwnApartments';
import Login from './Login';

export default function Dominus(_props: {}): JSX.Element {
  const [state, setState] = useState({ isAuthenticated: !!localStorage.getItem('dominus-token') });

  // eslint-disable-next-line functional/no-return-void,functional/functional-parameters
  function onLogout(): void {
    // eslint-disable-next-line functional/no-expression-statement
    localStorage.removeItem('dominus-token');
    // eslint-disable-next-line functional/no-expression-statement
    setState({ ...state, isAuthenticated: false });
  }
  // eslint-disable-next-line functional/no-return-void
  function onLogin(token: string|null): void {
    // eslint-disable-next-line functional/no-expression-statement
    localStorage.setItem('dominus-token', String(token));
    // eslint-disable-next-line functional/no-expression-statement
    setState({ ...state, isAuthenticated: true });
  }
  function AuthRoute(props: RouteProps): JSX.Element {
    const { children, ...rest } = props;

    const renderer = (props: RouteComponentProps<{}>): ReactNode => {
      const { location } = props;
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
