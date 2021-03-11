import React from 'react'
import {MDBDataTable} from 'mdbreact';
import '../AddDeal/addDealForm.css'
import './userListView.css'
import {fetchAllUser,updateUser} from "../../../services/firebase";
import AddNewUserModal from "../../../components/ModalComponent/AddNewUserModal";
import {Roller} from "react-awesome-spinners";

class UserListView extends React.Component {

    state = {
        fetching: true,
        error: '',
        userList: [],
        smart: false,
        showModal: false,
        selectedUser: null,
        newUser: true,
        role: ''
    }

    componentDidMount() {
        let user = JSON.parse(localStorage.getItem('@m-g-t-f-u'))
        let role = ''
        if (user.hasOwnProperty('role')) {
            role = user.role;
            this.setState({role}, () => {
                this.updateUserList();
            })
        } else {
            this.props.history.push('/signin')
        }
    }

    updateUserList = () => {
        this.fetchUsers()
            .then(d => {
                this.setState({fetching: false})
            })
    }
    closeModal = () => {
        this.setState({showModal: false})
    }
    editUserHandler = (user) => {
        this.setState({selectedUser: user, newUser: false, showModal: true})
    }

    deleteUserHandler = (userData => {
        this.setState({fetching: true})
        let isDeleted = !userData.isDeleted;
        let newUserData = {...userData, isDeleted}
        updateUser(newUserData).then(() => {
            this.fetchUsers()
                .then(d => {
                    this.setState({fetching: false})
                })
        })
    })
    fetchUsers = async () => {
        let role = this.state.role;
        let dataTableData = {
            columns: [
                {
                    label: head('ID'),
                    field: 'index',
                    width: 50
                }, {
                    label: head('Name'),
                    field: 'userName',
                    width: 350
                },
                {
                    label: head('Email'),
                    field: 'email',
                    width: 200
                },
                {
                    label: head('Role'),
                    field: 'role',
                    width: 200
                },
                {
                    label: head('Mobile'),
                    field: 'mobile',
                    width: 200
                }
            ]
        }
        let rowArray = []

        let users = await fetchAllUser()

        for (let i = 0; i < users.length; i++) {
            // if(users[])
            let userName = users[i].firstName + ' ' + users[i].lastName || users[i].userName;
            let userRole = users[i].role
            let roleName = '';
            if (userRole === '1') {
                roleName = 'Admin'
            } else if (userRole === '2') {
                roleName = 'Employee'
            } else if (userRole === '3') {
                roleName = 'Investor'
            }
            let obj = {
                index: i + 1, userName, email: users[i].email, mobile: users[i].mobile, role: roleName
            }
            if (role === "1") {
                dataTableData = {
                    columns: [
                        {
                            label: head('ID'),
                            field: 'index',
                            width: 50
                        }, {
                            label: head('Name'),
                            field: 'userName',
                            width: 350
                        },
                        {
                            label: head('Email'),
                            field: 'email',
                            width: 200
                        },
                        {
                            label: head('Role'),
                            field: 'role',
                            width: 200
                        },
                        {
                            label: head('Mobile'),
                            field: 'mobile',
                            width: 200
                        },
                        {
                            label: ('Action'),
                            field: 'action',
                            width: 300
                        }
                    ]
                }
                let actionBtn;

                if (users[i].isDeleted) {
                    actionBtn = (
                        <div className='deal-action-container'>
                                <button className='border-none' onClick={() => {
                                    this.editUserHandler(users[i]);
                                }}>
                                    <i className=' fas fa-pencil-alt edit-delete-icon'/>
                                    {/*edit icon*/}
                                </button>
                            <button className='border-none'
                                    onClick={() => {
                                        this.deleteUserHandler(users[i])
                                    }}>
                                <i className='fas fa-history edit-delete-icon'/>
                            </button>
                        </div>
                    )
                } else {
                    actionBtn = (
                        <div className='deal-action-container'>
                            <button className='border-none' onClick={() => {
                                this.editUserHandler(users[i]);
                            }}>
                                <i className=' fas fa-pencil-alt edit-delete-icon'/>
                                {/*edit icon*/}
                            </button>
                            <button className='border-none'
                                    onClick={() => {
                                        this.deleteUserHandler(users[i])
                                    }}><i className=' far fa-trash-alt edit-delete-icon'/>
                            </button>
                        </div>
                    )
                }
                obj = {...obj, action: actionBtn}
                rowArray.push(obj)
            } else {
                rowArray.push(obj)
            }

        }
        dataTableData = {...dataTableData, rows: rowArray}
        this.setState({userList: dataTableData})
    }

    render() {
        const {userList, showModal, fetching,  role} = this.state;

        if (fetching) {
            return <div className='loading-container'>
                {this.state.fetching && <Roller/>}
            </div>
        }
        return (
            <div className='content-main-container'>
                <div className='deal-create-deal-container'>
                    <div className='user-list-title'>
                        Users List
                    </div>
                    {role === '1' && <div className='create-user-container'>
                        <span onClick={() => {
                            this.setState({showModal: true, selectedUser: '', newUser: true})
                        }}> create user</span>
                    </div>}

                </div>
                {showModal &&
                <AddNewUserModal
                    open={showModal}
                    closeModal={this.closeModal}
                    selectedUser={this.state.selectedUser}
                    newUser={this.state.newUser}
                    updateUserList={this.updateUserList}
                />}
                <div>
                    <MDBDataTable
                        style={{fontSize: 12, textAlign: 'left'}}
                        striped
                        bordered
                        hover
                        data={userList}
                        searching={true}
                        displayEntries={true}
                        noBottomColumns={true}
                    />
                </div>
            </div>
        )
    }
}

export default UserListView

const head = (label) => {
    return (
        <table>
            <thead>
            <tr>
                <th style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    border: 'none',
                    height: 25,
                    alignItems: 'center',
                }}>
                    <p style={{float: 'left', fontWeight: 'bold', marginTop: 14, fontSize: 13}}>
                        {label}
                    </p>
                    <div style={{float: 'right', marginTop: 5}}>
                        <i key="Name" className="fas fa-sort" aria-hidden="true"></i>
                    </div>
                </th>
            </tr>
            </thead>
        </table>

    )
}



