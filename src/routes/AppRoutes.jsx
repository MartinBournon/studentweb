import React from "react";
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import HomePage from "../pages/HomePage";


const AppRoutes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage} />
        {/* <Route component={ErrorScreen} /> */}
      </Switch>
    </Router>
  );
};

export default AppRoutes;
