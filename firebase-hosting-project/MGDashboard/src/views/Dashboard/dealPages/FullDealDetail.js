import React from 'react';
import '../AddDeal/addDealForm.css';
import './dealCardView.css'
import "./fullDealDetail.css"

import {Roller} from "react-awesome-spinners";
import {fetchFullDeal} from "../../../services/firebase";
import {sendAWSEmail} from "../../../services/AWS_Email";

class FullDealDetail extends React.Component {

    state = {
        fetching: true,
        error: '',
        deal: {}
    }

    componentDidMount() {

        let path = this.props.location.pathname
        let n = path.split('/')
        n = n[n.length - 1]
        // n=n+1;

        fetchFullDeal(n).then(deal => {
            if (deal.hasOwnProperty('error')) {

                this.setState({
                    error: ' Error in fetching deal details. ',
                    fetching: false
                })
            } else {
                this.setState({error: '', deal: deal, fetching: false})
            }
        })
    }

    sendEmail = async () => {
        this.setState({fetching: true})
        let user = localStorage.getItem('@m-g-t-f-u');
        user = JSON.parse(user);
        let res = await sendAWSEmail(user)
        this.setState({fetching: false})
        alert(res.msg)

    }

    render() {

        let {fetching, error, deal} = this.state;

        if (fetching) {
            return <div className='loading-container'>
                {fetching && <Roller/>}
            </div>
        }
        if (error) {
            return <div className='loading-container'>
                <span className='error-class'>{error}</span>
            </div>
        }
        return (
            <div className='full-deal-main-container'>
                <div className='deal-detail-outer-container'>
                    <div className='add-deal-header'>
                        {deal.dealTitle}
                    </div>
                    <div className='full-deal-content-container'>
                        <div className='deal-detail-container'>
                            <div className='single-item-row'>
                                <div className='small-heading-style'>Summary :</div>
                                <div>{deal.dealSummary}</div>
                            </div>
                            <div className='single-item-row'>
                                <div className='  small-heading-style'>Deal Type :</div>
                                <div>
                                    {deal.dealType}
                                </div>
                            </div>

                            <div className='single-item-row'>
                                <div className='small-heading-style'>Company :</div>
                                <div>{deal.dealCompany}</div>
                            </div>
                            <div className='single-item-row'>
                                <div className='  small-heading-style'>Industry :</div>
                                <div>{deal.dealIndustry}</div>
                            </div>


                            <div className='single-item-row'>
                                <div className='  small-heading-style'>Website Link :</div>
                                <div>
                                    <a href={deal.dealWebSiteLink} target={1}>{deal.dealWebSiteLink}</a>
                                </div>
                            </div>
                            <div className='single-item-row'>
                                <div className='  small-heading-style'>Details :</div>
                                <div>
                                    {deal.dealDetail}
                                </div>
                            </div>

                            <div className='company-industry-row '>
                                <div className='company-industry-col'>
                                    <div className=' small-heading-style'>Teams :</div>
                                    <div>{deal.dealTeam}</div>
                                </div>
                                <div className='company-industry-col'>
                                    <div className='  small-heading-style'>Board :</div>
                                    <div>{deal.dealBoard}</div>
                                </div>
                            </div>


                            <div className='single-item-row'>
                                <div className='  small-heading-style'>Customer :</div>
                                <div>
                                    {deal.dealDetail}
                                </div>

                            </div>

                            <div className='company-industry-row '>
                                <div className='company-industry-col'>
                                    <div className=' small-heading-style'>Region :</div>
                                    <div>{deal.dealRegion}</div>
                                </div>
                                <div className='company-industry-col'>
                                    <div className='  small-heading-style'>Country :</div>
                                    <div>{deal.dealCountry}</div>
                                </div>
                            </div>
                            {/*<div className='single-item-row'>*/}
                            {/*    <div className=' small-heading-style'>Region :</div>*/}
                            {/*    <div>{deal.dealRegion}</div>*/}
                            {/*</div>*/}
                            {/*<div className='single-item-row'>*/}
                            {/*    <div className='  small-heading-style'>Country :</div>*/}
                            {/*    <div>{deal.dealCountry}</div>*/}
                            {/*</div>*/}

                            <div className='single-item-row'>
                                <div className='  small-heading-style'>Target Raise :</div>
                                <div>{deal.dealTarget}</div>
                            </div>

                            <div className='single-item-row'>
                                <div className='  small-heading-style'>Deal Investment Type</div>
                                <div>{deal.dealInvestmentType}</div>
                            </div>

                            <div className='single-item-row'>
                                <div className='  small-heading-style'>Raised so far :</div>
                                <div>{deal.dealAmountRaised}</div>
                            </div>
                        </div>
                        {/*video container*/}
                        <div className='full-deal-video-container'>
                            <div className='single-item-row'>
                                <video src={deal.dealVideoLink} width='100%' controls loop/>
                            </div>
                            <div className='virtual-btn-container'>
                                <div>
                                    <button className='blue-btn' onClick={this.sendEmail}>Virtual Deal Room</button>
                                </div>
                                <div className='virtual-btn-des'>
                                    Request more information regarding this offering through the deal room
                                </div>

                            </div>
                        </div>

                    </div>


                </div>

                {/*<div className='investment-opportunity-container'>*/}
                {/*    <div className=''>investment opportunity</div>*/}
                {/*    <hr className='mar-0'/>*/}
                {/*    <div className=''>*/}
                {/*        <div className='investment-opportunity-inner-container'>*/}
                {/*            <div className=' pr-2'>Target Raise:</div>*/}
                {/*            <div>{deal.dealTarget}</div>*/}
                {/*        </div>*/}
                {/*        <div className='investment-opportunity-inner-container'>*/}
                {/*            <div className=' pr-2'>Deal Type:</div>*/}
                {/*            <div>{deal.dealInvestmentType}</div>*/}
                {/*        </div>*/}
                {/*        <div className='investment-opportunity-inner-container'>*/}
                {/*            <div className=' pr-2'>Raised so far:</div>*/}
                {/*            <div>{deal.dealCompany}</div>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>
        )
    }
}

export default FullDealDetail
