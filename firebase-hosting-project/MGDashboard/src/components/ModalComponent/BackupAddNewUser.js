import React, {Component} from "react";
import './addNewUser.css'

import {Modal,ModalBody} from "reactstrap";
import {register} from "../../services/firebase";

class AddNewUser extends Component {

    state = {
        showModal: this.props.showModal,
        title: this.props.title,
        data: this.props.data
    }

    onSubmit = () => {

    }

    render() {
        const {showModal, data} = this.props;
        return (
            <Modal isOpen={showModal} toggle={() => this.props.closeModal()} className='modal--ainer'>
                <div className="add-user-modal-Header  ">
                    <h4 className="">Add new user</h4>
                    {/*<button*/}
                    {/*    className="close display-none"*/}
                    {/*    type="button"*/}
                    {/*    onClick={() => this.props.closeModal()}*/}
                    {/*>*/}
                    {/*    <i className="now-ui-icons ui-1_simple-remove"></i>*/}
                    {/*</button>*/}

                </div>
                <ModalBody className='add-user-modal-body add-user-section-pd'>
                    <div className='add-user-input-container pt-5'>
                        <div className='display-flex flex-column align-item-start'>
                            <label>First name</label>
                            <input/>
                        </div>
                          <div className='display-flex flex-column align-item-start'>
                            <label>last name</label>
                            <input/>
                        </div>
                    </div>
                    <div className='add-user-input-container pt-5'>
                          <div className='display-flex flex-column align-item-start'>
                            <label>email</label>
                            <input/>
                        </div>
                         <div className='display-flex flex-column align-item-start'>
                            <label>password</label>
                            <input/>
                        </div>
                    </div>
                </ModalBody>
                <div className="add-user-modal-footer add-user-section-pd">
                    <button>Submit</button>
                    <button onClick={() => this.props.closeModal()}>Close Dialog</button>
                    {/*<button*/}
                    {/*    className="close display-none1"*/}
                    {/*    type="button"*/}
                    {/*    onClick={() => this.props.closeModal()}*/}
                    {/*>*/}
                    {/*    <i className="now-ui-icons ui-1_simple-remove " style={{color: 'red'}}></i>*/}
                    {/*</button>*/}
                </div>
            </Modal>

        )
    }
}

export default AddNewUser
