
import React from "react";
import {Redirect, Route, Switch} from "react-router-dom";


import Dashboard from "./views/Dashboard/Dashboard";
import SignIn from "./views/signIn/SignIn";
import LandingPage from "./views/Dashboard/LandingPage/LandingPage";

class MainPage extends React.Component {
    componentDidMount() {
        // console.warn = () => {
        // }
    }

    render() {
        return (
            <div>
                <Switch>
                    <Route path="/" exact render={props => <SignIn {...props} />}/>
                    <Route path="/signIn" render={props => <SignIn {...props} />}/>
                    <Route path='/userInfo' component={(props) => <LandingPage {...props}/>}/>
                    <Route path="/dashboard" render={props => <Dashboard {...props} />}/>
                    <Redirect to="/"/>
                </Switch>
            </div>)
    }
}

export default MainPage
