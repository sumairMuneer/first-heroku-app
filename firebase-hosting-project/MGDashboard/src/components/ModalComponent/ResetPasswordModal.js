import React from 'react'
import {Modal} from 'semantic-ui-react'
import './addNewUser.css'
import firebase from "firebase";
import {Roller} from "react-awesome-spinners";

class ResetPasswordModal extends React.Component {
    state = {

        email: '',
        fetching: '',
        error: ''
    }

    resetPassword = (event) => {
        // event.preventDefault()
        let email = this.state.email
        if (email) {
            this.setState({fetching: true, error: ''})
            firebase.auth().sendPasswordResetEmail(email)
                .then((user) => {
                    this.setState({fetching: false, error: ''})
                    alert('Please check your email...')
                    // setTimeout(() => {
                        this.props.closeModal();
                    // }, 200)

                    // this.setState({email: ''})
                }).catch((e) => {
                this.setState({fetching: false, error: 'Invalid Email'})
            })
        } else {
            this.setState({error: 'Enter email first!'})
        }
    }

    render() {
        const {open, closeModal,} = this.props;
        let {error, fetching} = this.state;
        // if (fetching) {
        //     return
        // }
        // }

        return (
            <Modal dimmer={'blurring'} basic open={open} size='tiny' onClose={closeModal} className='reset-password-modal-container'>
                <Modal.Header className=' new-user-header'>Reset Password</Modal.Header>
                <Modal.Content className='agreement-content-container'>
                    {/*<Image wrapped size='medium' src='/images/avatar/large/rachel.png' />*/}
                    {fetching && <Modal.Description>
                        <div className='loading-container'>
                            <Roller/>
                        </div>
                    </Modal.Description>}

                    {!fetching && <Modal.Description>
                        <span className='error-class'>{error}</span>
                        <div className='signIn-input-container'>
                            <div className='parallel-input-row full-width'>
                                <label> Email</label>
                                <input type='email' placeholder='Email' required onChange={(event => {
                                    this.setState({email: event.target.value, error: ''})
                                })}/>
                            </div>
                        </div>
                    </Modal.Description>}
                    <hr/>
                    {!fetching && <div className="add-user-modal-footer ">
                        <div className='main-input-container'>
                            {/*<div className='parallel-input-row normal-width' onClick={() => this.props.closeModal()}>*/}
                            {/*    <button onClick={(event => this.submitNewUserForm(event))}>Submit</button>*/}
                            {/*</div>*/}
                            <div className='parallel-input-row normal-width'>
                                <button onClick={(event => this.resetPassword(event))}>Submit</button>
                            </div>
                        </div>
                    </div>}
                </Modal.Content>
            </Modal>

        );
    }
}

export default ResetPasswordModal
