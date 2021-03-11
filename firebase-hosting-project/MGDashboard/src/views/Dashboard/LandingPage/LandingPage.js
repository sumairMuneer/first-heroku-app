import React from 'react';
import '../AddDeal/addDealForm.css';
import "./landingPage.css"
import {nonDisclosureAgreement, termsOfUse} from "../../../components/ModalComponent/Agreements";
import AgreementModal from "../../../components/ModalComponent/AgreementModal";

import {logout, updateUser} from "../../../services/firebase";
import {Roller} from "react-awesome-spinners";
import firebase from "firebase";

class LandingPage extends React.Component {

    constructor(props) {
        super(props);
        const userData = props.location.state;
        let firstName = '', lastName = '', email = ''
        if (userData) {
            email = userData.email;
            firstName = userData.firstName;
            lastName = userData.lastName;
        }

        this.state = {
            user: userData,
            email,
            firstName,
            lastName,
            mobile: '',
            password: '',
            confirmPassword: '',
            agreement1: false,
            agreement2: false,
            showModal: false,
            modalData: '',
            fetching: false,
            error: '',
            passError: '',
            disabled: false
        }
    }

    closeModal = () => {
        this.setState({showModal: false})
    }

    onChangePasswordHandler = (field, value) => {

        let password = this.state.password, confirmPassword = this.state.confirmPassword
        if (field === 'pass') {
            if (value !== confirmPassword) {
                // console.log(" error ", passError)
                this.setState({passError: ' Password Mismatch'})
            } else {
                this.setState({passError: ''})
            }
            this.setState({password: value}, () => {
                password = this.state.password
            })
        } else {
            if (value !== password) {
                // console.log(" error ", passError)
                this.setState({passError: ' Password Mismatch'})
            } else {
                this.setState({passError: ''})
            }
            this.setState({confirmPassword: value}, () => {
                confirmPassword = this.state.confirmPassword
            })
        }

        // let passError = password != confirmPassword;
        // if (passError) {
        //     console.log(" error ", passError)
        //     this.setState({passError: ' Password mis-matched'})
        // } else {
        //     console.log("not  error ", passError)
        //     this.setState({passError: ''})
        // }

    }

    logoutHandler = async (event) => {
        this.setState({fetching: true})
        let a = await logout()
        if (a) {
            this.props.history.push('/signIn');
            localStorage.removeItem('@m-g-t-f-u')
        }
    }

    linkHandler = (agreementType => {
        let modalData = ''
        if (agreementType === 'terms') {
            modalData = termsOfUse;
        } else {
            modalData = nonDisclosureAgreement
        }
        this.setState({showModal: true, modalData})
    })

    updatePassword1 = async (newPassword) => {
        await firebase.auth().onAuthStateChanged(async (user) => {
            let currentUser = await firebase.auth().currentUser
            if (currentUser) {
                currentUser.updatePassword(newPassword).then((data) => {

                    return true
                    // localStorage.removeItem('@m-g-t-f-u')
                    // this.props.history.push('/signIn');
                    // this.logoutHandler().then();
                    // Update successful.
                })
            } else {
                return false
                // this.logoutHandler().then();
            }

            //     .catch((error) => {
            //     this.setState({ error: 'password not updated'})
            //     console.log(" password is not  updated  ", error)
            //     // An error happened.
            // });
        });
    }

    addUserInfo = (event) => {
        // event.preventDefault();
        this.setState({fetching: true, error: '', disabled: false})
        let {
            firstName,
            lastName,
            mobile,
            password,
            confirmPassword,
            user,
            agreement1,
            agreement2
            ,
        } = this.state;

        if (firstName && lastName && mobile && password && confirmPassword && agreement1 && agreement2) {
            let userVisited = true

            const userData = {...user, userVisited, firstName, lastName, mobile}

            // updateUser(userData)
            //     .then(e => {
                    this.updatePassword1(password)
                        .then(d => {
                            // this.setState({error: ''});
                            console.log(" password  is updatd ", d)
                            updateUser(userData)
                                .then(e => {
                                    alert(" User data is successfully updated.")
                                    localStorage.removeItem('@m-g-t-f-u')
                                    console.log(" user is updatd ", e)
                                    this.props.history.push('/signIn');
                                })
                        })
                    // console.log(" user data added successfully ")
                    // this.setState({fetching: false, error: ''});
                    // this.props.history.push('/dashboard/dealsList')
                // })
                // .catch(e => {
                //     this.setState({fetching: false, error: ''});
                //     // console.log(" error while adding new user  ")
                //
                // })
        } else {
            this.setState({fetching: false, disabled: false, error: 'Please complete all fields '});
        }

    }

    // componentWillUnmount() {
    //     this.logoutHandler().then()
    // }

    render() {
        const {showModal, modalData, email, firstName, lastName, mobile, error, fetching, passError, disabled} = this.state

        if (fetching) {
            return <div className='loading-container'>
                {this.state.fetching && <Roller style={{color: 'black'}}/>}
            </div>
        }
        return (
            <div className='content-main-container signin-outer-container'>
                <div className='landing-page-main-container'>
                    <div className='add-deal-header'>
                        Invest with Matwa Group – Investing in the Future
                    </div>
                    <div className='outer-input-container'>
                        <span className='error-class'>{error}</span>
                        {!error && <span className='error-class'>{passError}</span>}
                        {/*email address row*/}
                        <div className='main-input-container'>
                            <div className='parallel-input-row'>
                                <label> Email Address</label>
                                <input required={true} value={email} readOnly={true}/>
                            </div>
                            <div className='parallel-input-row'>
                                <label> Mobile Number</label>
                                <input required={true} value={mobile} placeholder='Mobile Number *' onChange={(event => this.setState({mobile: event.target.value}))}/>
                            </div>
                        </div>
                        {/*names input row*/}
                        <div className='main-input-container'>
                            <div className='parallel-input-row'>
                                <label> First Name</label>
                                <input required={true} placeholder='First Name *' value={firstName} onChange={(event => this.setState({firstName: event.target.value}))}/>
                            </div>
                            <div className='parallel-input-row'>
                                <label> Last Name</label>
                                <input required={true} placeholder='Last Name *' value={lastName} onChange={(event => this.setState({lastName: event.target.value}))}/>
                            </div>
                        </div>
                        {/*password input row*/}
                        <div className='main-input-container'>
                            <div className='parallel-input-row'>
                                <label> Password</label>
                                <input required={true} type='password' placeholder='Password (must be at least 6 characters) *'
                                       onChange={event => this.onChangePasswordHandler('pass', event.target.value)}/>
                            </div>
                            <div className='parallel-input-row'>
                                <label> Confirm Password</label>
                                <input required={true} type='password' placeholder='Pasword Confirmation *'
                                       onChange={event => this.onChangePasswordHandler('newPass', event.target.value)}/>
                            </div>
                        </div>
                        <div className='agreement-container mt-3'>
                            <input required={true} type='radio' onChange={(event => this.setState({agreement1: true}))}/>
                            <label> I have read and agree to the <span className='agreement-link' onClick={() => this.linkHandler('terms')}>Terms of Use.</span> *</label>
                        </div>
                        <div className='agreement-container'>
                            <input required={true} type='radio' onChange={(event => {
                                this.setState({agreement2: true})
                            })}/>
                            <label> I have read and agree to the <span className='agreement-link' onClick={() => this.linkHandler('disclosure')}>Non-Disclosure Agreement.</span> *</label>
                        </div>

                        <hr/>

                        <div className='main-input-container'>
                            <div className='parallel-input-row normal-width'>
                                <button disabled={disabled} onClick={(event) => this.addUserInfo(event)}> Submit</button>
                            </div>
                        </div>
                        <AgreementModal
                            // showModal={showModal}
                            open={showModal}
                            closeModal={this.closeModal}
                            modalData={modalData}
                        />
                    </div>
                </div>
            </div>
        )
    }

}

export default LandingPage
