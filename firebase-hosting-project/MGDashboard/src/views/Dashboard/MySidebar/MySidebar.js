import React from "react";
import './testSide.css';

import dealIcon from '../../../assets/images/dealIcon.PNG'

class MySidebar extends React.Component {

    state = {
        dealNestMenu: false,
        smartSidebar: this.props.smart,
        userNestMenu: false,
        role: '',
        overlaySidebar: this.props.overlaySidebar
    }

    componentDidMount() {

        let user = JSON.parse(localStorage.getItem('@m-g-t-f-u'))
        let role = '';
        if (user.hasOwnProperty('role')) {
            role = user.role;
            this.setState({role})
        }
    }

    render() {

        const {dealNestMenu, userNestMenu, role,} = this.state;
        let {overlaySidebar} = this.props
        let user = ''
        if (role === '1') {
            user = 'Admin'
        } else if (role === '2') {
            user = 'Employee'
        } else if (role === '3') {
            user = 'Investor'
        }
        let dropdownIcon = dealNestMenu ? "fa fa-angle-up mg-color" : "fa fa-angle-down mg-color";
        let userDropdownIcon = userNestMenu ? "fa fa-angle-up mg-color" : "fa fa-angle-down mg-color";
        let smartSidebar = this.props.smart;

        let [sidebarContainer, fullTab, dropDownIcon] = smartSidebar ? ['smart-sidebar-container', 'full-tab display-none', 'none'] : ['sidebar-container', 'full-tab'];
        if (dropDownIcon) {
            dropdownIcon = dropDownIcon;
        }
        let [smartTab, nestTabContainer] = smartSidebar ? ['smart-tab ', 'smart-nest-tab-container '] : ['smart-tab display-none', 'nest-tab-container'];
        if (overlaySidebar) {
            sidebarContainer = 'overlaySidebar-container '
        }
        return (
            <div className={sidebarContainer}>
                <a className="menu-item border-bottom-light" href="/dashboard/deals">
                    <div className={fullTab}>
                        <i className='fa fa-home mg-color'/>
                        <span style={{paddingLeft: 15}}>IoTDashboard</span>
                    </div>
                    <div className={smartTab}>
                        <i className='fa fa-home tab-icon-bold mg-color'/>
                        <span>IoT</span>
                    </div>
                </a>
                {/*<a href='#' className="menu-item border-bottom-light" >*/}
                    <div className="menu-item border-bottom-light " style={{cursor: 'normal', fontSize: 'large', fontWeight: 600}}>
                        <div className={fullTab}>
                            {user}
                        </div>
                        <div className={smartTab}>
                            {user}
                        </div>
                    </div>
                {/*</a>*/}

                {/*<a className="menu-item" href="/dashboard/conversation" >*/}
                {/*    <div className={fullTab}>*/}
                {/*        <i className='fa fa-home'/>*/}
                {/*        <span>Conversation</span>*/}
                {/*    </div>*/}
                {/*    <div className={smartTab}>*/}
                {/*        <i className='fa fa-home tab-icon-bold'/>*/}
                {/*    </div>*/}
                {/*</a>*/}
                {/*nesting menu*/}

                {/*deals nesting menu*/}
                <div className={fullTab}>
                    <div className="nest-tab border-bottom-light" onClick={() => {
                        this.setState({dealNestMenu: !dealNestMenu})
                    }} title={'dropdown'}>
                        {/*<div onClick={() => this.props.closeModal()}>*/}
                        <div>
                            <img src={dealIcon} alt={''} width={22}/>
                            <span> Deals</span>
                        </div>
                        <div>
                            <i className={dropdownIcon} aria-hidden="true"/>
                        </div>
                    </div>
                </div>
                {/*smart sidebar deal tab*/}
                <div className={smartTab}
                     onClick={() => {
                         this.props.handleSmartSidebar()
                         this.setState({dealNestMenu: !dealNestMenu})
                         // this.setState({smartSidebar: !smartSidebar})
                     }}
                     style={{borderBottom: '1px solid #6c757d2e '}}
                >
                    {/*<i className='fa fa-home mg-color tab-icon-bold' aria-hidden="true"/>*/}
                    <img src={dealIcon} alt={''} width={22}/>
                    <span> Deals</span>
                </div>
                {dealNestMenu &&
                <div className={nestTabContainer}>
                    <a className="menu-item border-bottom-light" href="/dashboard/dealsList">
                        <span> Deals</span>
                    </a>
                    {role === '1' && <a className="menu-item border-bottom-light" href="/dashboard/addDeal">
                        <span>Add Deals</span>
                    </a>}
                    <a className="menu-item border-none " href="/dashboard/dealList">
                        <span>List</span>
                    </a>
                </div>}

                {/*users nesting menu*/}
                <div className={fullTab}>
                    <div className="nest-tab border-bottom-light border-top-light" onClick={() => {
                        this.setState({userNestMenu: !userNestMenu})
                    }} title={'dropdown'}>
                        {/*<div onClick={() => this.props.closeModal()}>*/}
                        <div>
                            <i className='fa fa-user mg-color' aria-hidden="true"/>
                            <span style={{paddingLeft: 15}}> Users</span>
                        </div>
                        <div>
                            <i className={userDropdownIcon} aria-hidden="true"/>
                        </div>
                    </div>
                </div>
                {/*<div className="nest-tab border-top-light" onClick={() => {*/}
                {/*    this.setState({userNestMenu: !userNestMenu})*/}
                {/*}} title={'dropdown'}>*/}
                {/*    /!*<div onClick={() => this.props.closeModal()}>*!/*/}
                {/*    <div>*/}
                {/*        <i className={userDropdownIcon} aria-hidden="true"/>*/}
                {/*        <span> Users</span>*/}
                {/*    </div>*/}
                {/*    <div>*/}
                {/*        <i className={userDropdownIcon} aria-hidden="true"/>*/}
                {/*    </div>*/}
                {/*</div>*/}


                {/*smart sidebar users tab*/}
                <div className={smartTab}
                     onClick={() => {
                         this.props.handleSmartSidebar()
                         this.setState({userNestMenu: !userNestMenu})
                         // this.setState({smartSidebar: !smartSidebar})
                     }}
                >
                    <i className='fa fa-user mg-color' aria-hidden="true"/>
                    <span> Users</span>
                </div>
                {/*{userNestMenu && <div className='nest-tab-container'>*/}
                {userNestMenu && <div className={nestTabContainer} style={{borderTop: '1px solid #6c757d2e '}}>
                    <a className="menu-item " href="/dashboard/users">
                        <span> Add User</span>
                        {/*    <ModalExampleTopAligned*/}
                        {/*        // showModal={showModal}*/}
                        {/*        closeModal={this.closeModal}*/}
                        {/*        data={this.state.data}*/}
                        {/*    />*/}
                    </a>
                </div>}


                {/*<a className="menu-item border-none" href="/dashboard/dealList">*/}
                {/*    <div className={fullTab}>*/}
                {/*        <i className='fa fa-home'/>*/}
                {/*        <span>Deal List </span>*/}
                {/*    </div>*/}
                {/*    <div className={smartTab}>*/}
                {/*        <i className='fa fa-home tab-icon-bold'/>*/}
                {/*    </div>*/}
                {/*</a>*/}

            </div>
        )
    }
};

export default MySidebar
