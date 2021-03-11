import React from 'react'
import {Modal} from 'semantic-ui-react'
import './addNewUser.css'

class AgreementModal extends React.Component {
    state = {
        userList:[],
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    }



    render() {
        const {open,modalData,closeModal}=this.props;
        let title='default', subTitle='default', body='default'
        if(modalData.hasOwnProperty('title')){
            title= modalData.title
        }
        if(modalData.hasOwnProperty('subTitle')){
            subTitle= modalData.subTitle
        }if(modalData.hasOwnProperty('body')){
            body= modalData.body
        }

        return (
            <Modal dimmer={'blurring'} basic open={open} size='tiny' onClose={closeModal} className='agreement-modal-container'>
                <Modal.Header className=' new-user-header'>{title}</Modal.Header>
                    <Modal.Content className='agreement-content-container'>
                    {/*<Image wrapped size='medium' src='/images/avatar/large/rachel.png' />*/}
                    <Modal.Description>
                       <div className='agreement-subtitle'>
                           {subTitle}
                       </div>
                        <div>
                            {body}
                        </div>
                    </Modal.Description>
                    <div className="add-user-modal-footer ">
                        <div className='main-input-container'>
                            {/*<div className='parallel-input-row normal-width' onClick={() => this.props.closeModal()}>*/}
                            {/*    <button onClick={(event => this.submitNewUserForm(event))}>Submit</button>*/}
                            {/*</div>*/}
                            <div className='parallel-input-row normal-width' onClick={() => closeModal()}>
                                <button>Close Dialog</button>
                            </div>
                        </div>
                    </div>
                </Modal.Content>
            </Modal>

        );
    }
}


export default AgreementModal
