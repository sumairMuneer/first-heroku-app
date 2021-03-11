import React from 'react';
import '../Dashboard/AddDeal/addDealForm.css';
import './signIn.css'
import {loginWithEmailAndPassword} from "../../services/firebase";
import ResetPasswordModal from "../../components/ModalComponent/ResetPasswordModal";

import {Roller} from "react-awesome-spinners";

class SignIn extends React.Component {

    state = {
        email: '',
        password: '',
        error: '',
        fetching: true,
        showModal: false,
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({fetching: false})
        }, 200)
    }

    closeModal = () => {
        this.setState({showModal: false})
    }

    signInHandler = (event) => {
        // event.preventDefault();
        this.setState({fetching: true})
        // let email = 'sumair786186@gmail.com';
        // let email = 'tabish@emp.com';
        let email = this.state.email;
        let password = this.state.password;
        // let password = '111111';
        if (email && password) {
            loginWithEmailAndPassword(email, password)
                .then(user => {
                    if (user.hasOwnProperty('error')) {
                        // console.log(user.error)
                        this.setState({error: 'Invalid email address or password', fetching: false})
                    } else {
                        user = user.user
                        if (user) {
                            this.setState({error: '', fetching: false})
                            if (user.hasOwnProperty('userVisited')) {

                                localStorage.setItem('@m-g-t-f-u', JSON.stringify(user))
                                if (user.userVisited) {
                                    this.props.history.push('/dashboard/dealsList', user)
                                } else {
                                    this.props.history.push('/userInfo', user)
                                }
                            }
                        }
                        else {
                            this.props.history.push('/dashboard/userInfo', user)
                        }
                    }
                })
        } else {
            this.setState({error: 'Invalid Email or Password ', fetching: false})
        }
    }

    render() {
        const {error, fetching, showModal, email} = this.state
        if (fetching) {
            return <div className='loading-container'>
                {this.state.fetching && <Roller style={{color: 'black'}}/>}
            </div>
        }
        return (
            <div className='content-main-container signin-outer-container'>
                <div className='signin-main-container '>
                    <div className='add-deal-header'>
                        Sign In <sub className='invitation-text'>( By invitation only )</sub>
                    </div>
                    <div className='outer-input-container'>
                        <span className='error-class'>{error}</span>
                            <div className='signIn-input-container'>
                                <div className='parallel-input-row full-width'>
                                    <label> Email</label>
                                    <input type='email' placeholder='Email' value={email} required onChange={(event => this.setState({email: event.target.value, error: ''}))}/>
                                </div>
                                <div className='parallel-input-row full-width'>
                                    <label> password</label>
                                    <input type='password' placeholder='Password' required onChange={(event => this.setState({password: event.target.value, error: ''}))}/>
                                </div>
                            </div>
                            <hr/>

                            {/*revenue row*/}
                            <div className='display-flex flex-row justify-content-end'>
                                {/*<input type='submit' value='signin' onClick={(event) => this.signInHandler(event)}/>*/}
                                <div className='parallel-input-row normal-width'>
                                    <button onClick={(event) => this.signInHandler(event)}> SignIn</button>
                                </div>
                                <div className='parallel-input-row normal-width'>
                                    <button onClick={(event) => {
                                        // event.preventDefault();
                                        this.setState({showModal: true})
                                    }}> Reset Password
                                    </button>
                                </div>
                            </div>
                            <ResetPasswordModal
                                // showModal={showModal}
                                open={showModal}
                                closeModal={this.closeModal}
                                modalData=''
                            />
                    </div>
                </div>
            </div>
        )
    }

}

export default SignIn
