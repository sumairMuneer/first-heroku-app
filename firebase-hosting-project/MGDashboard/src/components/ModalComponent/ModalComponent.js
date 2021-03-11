import React, {Component} from "react";

import {Modal, ModalBody} from "reactstrap";

class ModalComponent extends Component {

    state = {
        showModal: this.props.showModal,
        title: this.props.title,
        data: this.props.data
    }

    onSubmit = () => {

    }

    render() {
        const {showModal, data } = this.props;
        return (
            <Modal isOpen={showModal} toggle={() => this.props.closeModal()} className='profile-modal-container'>
                <div className="modal-Header ">
                    <h4 className="title title-up">{data.title}</h4>
                    <button
                        className="close display-none"
                        type="button"
                        onClick={() => this.props.closeModal()}
                    >
                        <i className="now-ui-icons ui-1_simple-remove"></i>
                    </button>

                </div>
                <ModalBody className='modal-Body'>
                    <p>
                        {data.body}
                    </p>
                </ModalBody>
                <div className="modal-footer">
                    <button
                        className="close display-none1"
                        type="button"
                        onClick={() => this.props.closeModal()}
                    >
                        <i className="now-ui-icons ui-1_simple-remove " style={{color: 'red'}}></i>
                    </button>
                </div>
            </Modal>

        )
    }
}

export default ModalComponent
