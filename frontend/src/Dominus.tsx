import React, { ReactNode } from 'react';
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
  return (
    <Router>
      <DominusAppBar authenticated={isAuthenticated()} />
      <React.StrictMode>
        <Switch>
          // TODO: Type-safe paths
          <Route path="/login">
            <Login />
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

function isAuthenticated(_foo?: string): boolean {
  return false;
}
function AuthRoute(props: RouteProps): JSX.Element {
  const { children, ...rest } = props;

  const renderer = (props: RouteComponentProps<{}>): ReactNode => {
    const location = props.location;
    return isAuthenticated()
      ? children
      : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: location },
          }}
        />
      );
  };
  return <Route {...rest} render={renderer} />;
}
