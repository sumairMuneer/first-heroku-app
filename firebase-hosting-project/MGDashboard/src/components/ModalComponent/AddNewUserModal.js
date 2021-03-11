import React from 'react'
import {Modal} from 'semantic-ui-react'
import './addNewUser.css'
import {register, updateUser} from "../../services/firebase";
import {Roller} from "react-awesome-spinners";
import {dealTypeFilter} from "../../services/dropdownFilter";

class AddNewUserModal extends React.Component {

    constructor(props) {
        super(props);

        let user = this.props.selectedUser
        let email = '', firstName = '', lastName = '', mobile = '', role = '', dealType = []
        if (user) {
            email = user.email;
            firstName = user.firstName;
            lastName = user.lastName;
            mobile = user.mobile
            role = user.role
            dealType = user.dealType
        }

        this.state = {
            open: props.open,
            closeModal: props.closeModal,
            userList: [],
            firstName,
            lastName,
            email,
            role,
            dealType,
            password: '',
            mobile,
            selectedUser: this.props.selectedUser,
            newUser: this.props.newUser,
            fetching: false,
            hideDealType: false
        }
    }

    componentDidMount() {
        let role = this.state.role;
        if (role === '1') {
            this.setState({hideDealType: true})
        } else {
            this.setState({hideDealType: false})
        }
    }

    submitNewUserForm = async (event) => {
        event.preventDefault();
        this.setState({fetching: true})
        let {firstName, lastName, email, password, role, dealType} = this.state;
        let proceed = false;
        if (role === '1') {
            if (email && password && role) {
                dealType = []
                proceed = true;
            }
        } else {
            if (email && password && role && dealType.length > 0) {
                proceed = true
            } else {
                this.setState({error: 'Please complete all fields', fetching: false})
            }
        }
        const userObject = {firstName, lastName, email, password, role, dealType}

        if (proceed) {
            register(userObject)
                .then(d => {
                    if (d.hasOwnProperty('error')) {
                        //
                        this.setState({error: d.error.code, fetching: false})
                    } else {
                        alert(" New user added Successfully. ")
                        this.closeDialogHandler()
                    }
                })

        } else {
            this.setState({error: 'Please complete all fields', fetching: false})
        }
    }

    updateUserForm = (event) => {
        event.preventDefault();
        this.setState({fetching: true})

        let user = this.state.selectedUser;
        let {firstName, lastName, mobile, role, dealType} = this.state;
        let check = false;
        if (firstName) {
            user = {...user, firstName}
        }
        if (lastName) {
            user = {...user, lastName}
        }
        if (mobile) {
            user = {...user, mobile}
        }
        if (role === '1') {
            dealType = []
            user = {...user, dealType}
            check = true
        } else {
            if (dealType.length > 0) {
                user = {...user, dealType}
                check = true;
            }
        }

        if (check) {
            updateUser(user)
                .then(d => {

                    // if (d.hasOwnProperty('error')) {
                    //
                    //     this.setState({error: d.error.code,fetching:false})
                    // }
                    // else{
                    this.closeDialogHandler()
                    // }
                })

        } else {
            this.setState({error: 'All fields are required.'})
        }

    }
    closeDialogHandler = (event) => {
        // event.preventDefault();
        this.props.closeModal();
        this.props.updateUserList();
    }
    onRoleChangeHandler = (role) => {
        if (role === '1') {
            this.setState({hideDealType: true, role})
        } else {
            this.setState({hideDealType: false, role})
        }
    }
    onDealTypeChangeHandler = (event) => {
        // this.setState({dealType: event.target.value})
        let options = event.target.options;
        let values = []
        for (let i = 0; i < options.length; i++) {
            if (options[i].selected) {
                values.push(options[i].value)
            }
        }
        this.setState({dealType: values})
    }

    render() {
        let {open, closeModal, fetching, hideDealType, firstName, lastName, email, mobile, newUser, error, role, dealType} = this.state;

        let dealTypeOptionList = dealTypeFilter.map((filterElement, index) => {
            if (index === 0) {
                return <option key={filterElement} value={filterElement} style={{display:'none'}}></option>
            } else {
                return (
                    <option key={filterElement} value={filterElement}>{filterElement}</option>
                )
            }
        })
        if (dealType.length > 0) {
            let dealTypeOptionList1 = dealTypeOptionList.map(filterElement => {
                if (filterElement) {
                    if (filterElement.hasOwnProperty('key')) {
                        filterElement = filterElement.key;
                        for (let j = 0; j < dealType.length; j++) {
                            if (dealType[j] === filterElement) {
                                return (<option key={filterElement} selected >{filterElement}</option>)
                            } else {
                                return (
                                    <option key={filterElement}>{filterElement}</option>
                                )
                            }
                        }
                    }
                }
                return (<></>)

            })
            dealTypeOptionList = dealTypeOptionList1
        }

        let inputList = '';
        if (newUser) {
            inputList = (
                <Modal.Content className='new-user-modal-content-container'>
                    <Modal.Description>
                        <span className='error-class'>{error}</span>
                        <div className='main-input-container pt-3'>
                            <div className='parallel-input-row'>
                                <label> Email</label>
                                <input placeholder='Email' required onChange={(event => this.setState({email: event.target.value}))}/>
                            </div>
                            <div className='parallel-input-row'>
                                <label> password</label>
                                <input type='password' required placeholder='Password' onChange={(event => this.setState({password: event.target.value}))}/>
                            </div>
                        </div>
                        <div className='main-input-container'>
                            <div className='parallel-input-row'>
                                <label> First Name</label>
                                <input placeholder='First Name' onChange={(event => this.setState({firstName: event.target.value}))}/>
                            </div>
                            <div className='parallel-input-row'>
                                <label> Last Name</label>
                                <input placeholder='Last Name' onChange={(event => this.setState({lastName: event.target.value}))}/>
                            </div>
                        </div>
                        <div className='main-input-container'>
                            <div className='parallel-input-row'>
                                <label> Role</label>
                                <select onChange={(event => this.onRoleChangeHandler(event.target.value))}>
                                    <option hidden>Role</option>
                                    <option value={1}>Admin</option>
                                    <option value={2}>Employee</option>
                                    <option value={3}>Investor</option>
                                </select>
                            </div>
                            {!hideDealType && <div className='parallel-input-row'>
                                <label> Deal Type</label>
                                <select onChange={event => this.onDealTypeChangeHandler(event)} multiple={true}>
                                    {/*<option  hidden >Deal Type</option>*/}
                                    {dealTypeOptionList}
                                </select>
                            </div>}
                        </div>

                        {/*</div>*/}
                    </Modal.Description>
                    <div className="add-user-modal-footer ">
                        <div className='main-input-container'>
                            <div className='parallel-input-row normal-width'>
                                <button onClick={(event => this.submitNewUserForm(event))}>Submit</button>
                            </div>
                            <div className='parallel-input-row normal-width' onClick={(event) => {
                                this.closeDialogHandler()
                            }}>
                                <button>Close Dialog</button>
                            </div>
                        </div>
                    </div>
                </Modal.Content>
            )
        } else {
            inputList = (
                <Modal.Content className='new-user-modal-content-container'>
                    <Modal.Description>
                        <span className='error-class'>{error}</span>
                        <div className='main-input-container pt-3'>
                            <div className='parallel-input-row'>
                                <label> Email</label>
                                <input placeholder='email' disabled value={email}/>
                            </div>
                            <div className='parallel-input-row'>
                                <label> Mobile</label>
                                <input type='text' placeholder='Mobile' value={mobile} onChange={(event => this.setState({mobile: event.target.value}))}/>
                            </div>


                        </div>
                        <div className='main-input-container'>
                            <div className='parallel-input-row'>
                                <label> First Name</label>
                                <input placeholder='Last Name' value={firstName} onChange={(event => this.setState({firstName: event.target.value}))}/>
                            </div>
                            <div className='parallel-input-row'>
                                <label> Last Name</label>
                                <input placeholder='Last Name' value={lastName} onChange={(event => this.setState({lastName: event.target.value}))}/>
                            </div>
                        </div>
                        <div className='main-input-container'>
                            <div className='parallel-input-row'>
                                <label> Role</label>
                                <select defaultValue={role} onChange={(event => this.onRoleChangeHandler(event.target.value))}>
                                    <option hidden>Role</option>
                                    <option value={1}>Admin</option>
                                    <option value={2}>Employee</option>
                                    <option value={3}>Investor</option>
                                </select>
                            </div>
                            {!hideDealType && <div className='parallel-input-row'>
                                <label> Deal Type</label>
                                <select defaultValue={dealType} onChange={event => this.onDealTypeChangeHandler(event)} multiple={true}>
                                    {/*<option  hidden >Deal Type</option>*/}
                                    {dealTypeOptionList}
                                </select>
                            </div>}
                        </div>
                        {/*</div>*/}
                    </Modal.Description>
                    <div className="add-user-modal-footer ">
                        <div className='main-input-container'>
                            <div className='parallel-input-row normal-width'>
                                <button onClick={(event => this.updateUserForm(event))}>Submit</button>
                            </div>
                            <div className='parallel-input-row normal-width' onClick={(event) => this.closeDialogHandler(event)}>
                                <button>Close Dialog</button>
                            </div>
                        </div>
                    </div>
                </Modal.Content>
            )
        }

        let loading = (<div className='loading-container'>
            {this.state.fetching && <Roller/>}
        </div>)

        return (
            <Modal dimmer={'blurring'} basic open={open} size='tiny' onClose={closeModal} className='add-new-user-modal-container'>

                <Modal.Header className=' new-user-header'>Add New User</Modal.Header>
                {fetching && <Modal.Content>
                    {loading}
                </Modal.Content>}
                {!fetching && inputList}
            </Modal>
        );
    }
}

export default AddNewUserModal
