import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";

import './dashboard.css'
import matwaLogo from '../../assets/images/matwa-logo.png';

import MySidebar from "./MySidebar/MySidebar";
import DealCardView from "./dealPages/DealCardView";
import DealListView from "./dealPages/DealListView";
import UserListView from "./user/UserListView";
import {logout} from "../../services/firebase";
import AddDealForm from "./AddDeal/AddDealForm";
import FullDealDetail from "./dealPages/FullDealDetail";
import EditDealForm from "./AddDeal/EditDealForm";
import SignIn from "../signIn/SignIn";
import {Roller} from "react-awesome-spinners";

class Dashboard extends React.Component {
    constructor(props) {
        super(props);

        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    state = {
        showSidebar: true,
        smart: false,
        fetching: true,
        authenticate: false,
        overlaySidebar: false
    }

    componentDidMount() {

        window.addEventListener('resize', this.updateWindowDimensions);
        // console.warn = () => {
        // }


        let data = localStorage.getItem('@m-g-t-f-u');
        data = JSON.parse(data);
        if (data) {
            if (data.hasOwnProperty('userVisited') && data.hasOwnProperty('isDeleted')) {
                this.setState({fetching: false, authenticate: true})
            } else {
                this.setState({fetching: false, authenticate: false})
                this.logoutHandler().then()
            }
        } else {
            this.setState({fetching: false, authenticate: false})
            this.props.history.push('/signIn')
        }
    }

    updateWindowDimensions = () => {

        if (window.innerWidth < 701) {
           this.setState({showSidebar:false})
        } else {
            this.setState({showSidebar:true})
        }
    }
    showOverlaySidebar = () => {
        let overlaySidebar = this.state.overlaySidebar
        this.setState({showSidebar: false, smart: false, overlaySidebar: !overlaySidebar})

    }

    handleSmartSidebar = () => {
        this.setState({smart: !this.state.smart})
    }

    logoutHandler = async (event) => {
        this.setState({fetching: true})
        let a = await logout()
        if (a) {
            localStorage.removeItem('@m-g-t-f-u')
            this.props.history.push('/signIn');
        }
    }

    render() {

        let {showSidebar, smart, fetching, authenticate, overlaySidebar} = this.state;
        if (window.innerWidth < 701) {
            showSidebar = false
        }
        let contentContainer = showSidebar ? 'small-page-content' : 'full-page-content';
        if (showSidebar && smart) {
            contentContainer = 'medium-page-content';
        }
        // overlaySidebar=this.
        let routes = <Route path='/signIn' component={() => <SignIn {...this.props}/>}/>
        if (authenticate) {
            routes = <Switch>
                {/*<Route path='/dashboard/userInfo' component={() => <LandingPage {...this.props}/>}/>*/}
                <Route path='/dashboard/dealsList' exact component={() => <DealCardView {...this.props}/>}/>
                <Route path='/dashboard/dealsList/:id' component={() => <FullDealDetail {...this.props}/>}/>
                <Route path='/dashboard/editDeal/:id' component={() => <EditDealForm {...this.props}/>}/>
                <Route path='/dashboard/dealList' exact component={DealListView}/>
                <Route path='/dashboard/users' component={UserListView}/>
                <Route path='/dashboard/addDeal' component={AddDealForm}/>
                <Redirect to='/dashboard/dealsList' exact component={() => <DealCardView {...this.props}/>}/>
            </Switch>
        } else {
            routes = <Switch>
                <Route path='/' exact component={() => <SignIn {...this.props}/>}/>
                <Redirect to='/'/>
            </Switch>
        }

        if (fetching) {
            return <div className='loading-container'>
                {this.state.fetching && <Roller style={{color: 'black'}}/>}
            </div>
        }
        return (
            <div className='first-div'>
                {/*<div className='display-flex '>*/}
                {/*    <div onClick={() => this.setState({smart: !smart})}>*/}
                {/*        <h1> show smart side bar</h1>*/}
                {/*    </div>*/}
                {/*    <div onClick={() => this.setState({showSidebar: !showSidebar})}>*/}
                {/*        <h1> side bar</h1>*/}
                {/*    </div>*/}
                {/*</div>*/}
                <div className='dashboard-navbar-container'>
                    <div className='dashboard-navbar-first-inner-container'>
                        <div onClick={() => this.setState({smart: !smart, showSidebar: true, overlaySidebar: false})} className='hide-show-sidebar1'>
                            <i className='fa fa-fw fa-bars' aria-hidden="true"/>
                        </div>
                        <div onClick={this.showOverlaySidebar} className='hide-show-sidebar'>
                            <i className='fa fa-fw fa-bars' aria-hidden="true"/>
                        </div>
                        {/*<button onClick={(event => this.setState({showSidebar: false, overlaySidebar:!overlaySidebar}))} className='hide-show-sidebar'>*/}
                        {/*    side bar*/}
                        {/*</button>*/}
                        {/*<div onClick={() => this.props.history.push('/home')}>*/}
                        <div onClick={() => this.props.history.push('/dashboard/dealsList')}>
                            <img src={matwaLogo} alt='img'/>
                        </div>
                    </div>

                    <button onClick={(event => this.logoutHandler(event))}>
                        logout
                    </button>
                </div>
                <div style={{overflow: 'auto'}}>
                    {showSidebar && <MySidebar
                        props={this.props}
                        smart={smart}
                        handleSmartSidebar={this.handleSmartSidebar}
                        overlaySidebar={overlaySidebar}
                    />}
                    {overlaySidebar && <MySidebar
                        props={this.props}
                        smart={smart}
                        handleSmartSidebar={this.handleSmartSidebar}
                        overlaySidebar={overlaySidebar}
                    />}

                    <div className={contentContainer}>
                        {routes}
                        {/*<Switch>*/}
                        {/*    <Route path='/dashboard/editDeal/:id' component={() => <EditDealForm {...this.props}/>}/>*/}
                        {/*    <Route path='/dashboard/userInfo' component={() => <LandingPage {...this.props}/>}/>*/}
                        {/*    <Route path='/dashboard/dealsList' exact component={() => <DealCardView {...this.props}/>}/>*/}
                        {/*    <Route path='/dashboard/dealList' exact component={DealListView}/>*/}
                        {/*    <Route path='/dashboard/dealsList/:id' component={() => <FullDealDetail {...this.props}/>}/>*/}
                        {/*    <Route path='/dashboard/users' component={UserListView}/>*/}
                        {/*    <Route path='/dashboard/addDeal' component={AddDealForm}/>*/}
                        {/*    <Route path='/' component={() => <DealListView {...this.props}/>}/>*/}
                        {/*    /!*<Route path='/dashboard/publish' component={DealListView}/>*!/*/}
                        {/*</Switch>*/}
                    </div>

                </div>


            </div>
        )
    }
}

export default Dashboard
