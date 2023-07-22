import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import ListMemberComponent from "./components/ListMemberComponent";
import CreateMemberComponent from "./components/CreateMemberComponent";
import UpdateMemberComponent from "./components/UpdateMemberComponent";

function App() {
  return (
    <div>
      <Router>
        <Header />
        <div className="container">
          <Switch>
            <Route path="/" exact component={ListMemberComponent}></Route>
            <Route path="/members" component={ListMemberComponent}></Route>
            <Route path="/add-member" component={CreateMemberComponent}></Route>
            <Route
              path="/update-member/:id"
              component={UpdateMemberComponent}
            ></Route>
          </Switch>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
