import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import DominusAppBar from './AppBar';
import OwnApartments from './OwnApartments';

export default function Dominus(_props: {}): JSX.Element {
  return (
    <Router>
      <DominusAppBar />
      <React.StrictMode>
        <Switch>
          // TODO: Type-safe paths
          <Route path="/apartments">
            <OwnApartments />
          </Route>
          <Route path="/tenants">
            <div>tenants</div>
          </Route>
          <Route path="/misc">
            <div>misc</div>
          </Route>
          <Route path="/homeSeekers">
            <div>home seekers</div>
          </Route>
          <Route path="/otherApts">
            <div>other interesting apartments</div>
          </Route>
          <Route path="/">
            <div />
          </Route>
        </Switch>
      </React.StrictMode>
    </Router>
  );
}
