import React from "react";
import {  Route, Switch, Redirect } from "react-router-dom";
import "./assets/styles/app.css";
import Landing from "./pages/landing";
import PersonalInfo from "./pages/personalInfo";
import LaptopPage from "./pages/laptopPage";
import Success from "./pages/successPage";
import LaptopList from "./pages/laptopList";
import LaptopInfo from './pages/laptopInfo';


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
      <Route path='/success'>
        <Success />
      </Route>
      <Route path='/laptoplist' exact>
        <LaptopList />
      </Route>
      <Route path='/laptop/:laptopId' exact>
        <LaptopInfo />
      </Route>
      {/* <Route path="*">
        <Redirect to="/landing" />
      </Route> */}
    </Switch>
  );
}

export default App;
