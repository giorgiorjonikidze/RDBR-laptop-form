import React from "react";
import {  Route, Switch, Redirect } from "react-router-dom";
import "./assets/styles/app.css";
import Landing from "./pages/landing";
import PersonalInfo from "./pages/personalInfo";
import LaptopPage from "./pages/laptopPage";


function App() {
  return (
    <Switch>
      <Route path="/landing">
        <Landing />
      </Route>
      <Route path='/personalinfo'>
        <PersonalInfo />
      </Route>
      <Route path='/laptoppage'>
        <LaptopPage />
      </Route>
      <Route path="*">
        <Redirect to="/landing" />
      </Route>
    </Switch>
  );
}

export default App;
