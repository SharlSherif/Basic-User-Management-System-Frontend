import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import UsersTable from "./users/users-table/users-table";
import CustomNavbar from "./navbar/navbar";
import Store from "./state/store";
import CreateUserForm from "./users/creation-form/create-user";
import UserViewTable from "./users/user-view/user-view";
import EditUserForm from "./users/edit-form/edit-user";

function App() {
  return (
    <Store>
      <Router>
        <CustomNavbar />
        {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/create/user" component={CreateUserForm} />
          <Route path="/edit/user/:userId" component={EditUserForm} />
          <Route path="/view/users" component={UsersTable} />
          <Route path="/view/user/:userId" component={UserViewTable} />
        </Switch>
      </Router>
    </Store>
  );
}

export default App;
