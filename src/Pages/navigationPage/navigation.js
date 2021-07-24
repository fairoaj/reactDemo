import React, { useState } from "react";
import { Switch, Route } from "react-router-dom/cjs/react-router-dom.min";
import { BrowserRouter } from "react-router-dom";
import Home from "../homePage/home";
import Login from "../loginPage/login";
import { AppContext } from "../../lips/context";
import Register from "../registerPage/register";

function Routing() {
  const [isAuthenticated, userHasAuthenticated] = useState(false);

  return (
    <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
      <BrowserRouter>
        <Switch>
          <Route path="/Home">
            <Home></Home>
          </Route>
          <Route path="/Register">
            <Register></Register>
          </Route>
          <Route path="/">
            <Login></Login>
          </Route>
        </Switch>
      </BrowserRouter>
    </AppContext.Provider>
  );
}
export default Routing;
