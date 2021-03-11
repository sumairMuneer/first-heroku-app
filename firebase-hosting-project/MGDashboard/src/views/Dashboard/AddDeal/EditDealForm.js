import React from 'react';
import './addDealForm.css';
import {dealCountryFilter, dealInvestmentTypeFilter, dealRegionFilter, dealSizeFilter, dealStatusFilter, dealTypeFilter} from "../../../services/dropdownFilter";
import {Roller} from "react-awesome-spinners";
import {fetchFullDeal, updateDeal} from '../../../services/firebase'
import firebase from "firebase";

class EditDealForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dealObject: this.props.location.state,
            fetching: true,
            error: '',
            file: '',
            changes: true
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({fetching: false})
        }, 200)
    }

    updateDealData = (type, value) => {
        let dealData = this.state.dealObject;
        this.setState({changes: false})
        switch (type) {
            case 'title':
                let dealTitle = value;
                dealData = {...dealData, dealTitle}
                break;
            case 'investment':
                let dealInvestmentType = value;
                dealData = {...dealData, dealInvestmentType}
                break;
            case 'company':
                let dealCompany = value;
                dealData = {...dealData, dealCompany}
                break;
            case 'industry':
                let dealIndustry = value;
                dealData = {...dealData, dealIndustry}
                break;
            case 'dealType':
                let dealType = value;
                dealData = {...dealData, dealType}
                break;
            case 'dealSize':
                let dealSize = value;
                dealData = {...dealData, dealSize}
                break;
            case 'dealStatus':
                let dealStatus = value;
                dealData = {...dealData, dealStatus}
                break;

            case 'dealOffering':
                let dealOffering = value;
                dealData = {...dealData, dealOffering}
                break;
            case 'dealWebSiteLink':
                let dealWebSiteLink = value;
                dealData = {...dealData, dealWebSiteLink}
                break;

            case 'summary':
                let dealSummary = value;
                dealData = {...dealData, dealSummary}
                break;

            case 'detail':
                let dealDetails = value;
                dealData = {...dealData, dealDetails}
                break;
            case 'dealTeam':
                let dealTeam = value;
                dealData = {...dealData, dealTeam}
                break;
            case 'dealBoard':
                let dealBoard = value;
                dealData = {...dealData, dealBoard}
                break;
            case 'customer':
                let dealCustomer = value;
                dealData = {...dealData, dealCustomer}
                break;
            case'financial':
                let dealFinancial = value;
                dealData = {...dealData, dealFinancial}
                break;
            case'region':
                let dealRegion = value;
                dealData = {...dealData, dealRegion}
                break;
            case'country':
                let dealCountry = value;
                dealData = {...dealData, dealCountry}
                break;

            case'latitude':
                let dealLatitude = value;
                dealData = {...dealData, dealLatitude}
                break;

            case'longitude':
                let dealLongitude = value;
                dealData = {...dealData, dealLongitude}
                break;
            case'target':
                let dealTarget = value;
                dealData = {...dealData, dealTarget}
                break;
            case'amount':
                let dealAmountRaised = value;
                dealData = {...dealData, dealAmountRaised}
                break;
            default:
        }
        this.setState({dealObject: dealData})
    }

    submitDealHandler = (event) => {

        this.setState({fetching: true})
        let storageRef = firebase.storage().ref();
        let video = this.state.file
        if (video) {
            let videoName = video.name
            let videoSize = video.size

            // if (videoType.search('video/')) {
            if (videoSize < 10485770) {// allow video of size max 10mb
                let uploadTask = storageRef.child(`videos/${videoName}`).put(video);

                uploadTask.on('state_changed', (snapshot) => {

                }, (error) => {
                    console.log('error ', error);
                }, () => {
                    // Handle successful uploads on complete
                    uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                        this.onUpdateDealHandler(downloadURL);
                        // this.setState({videoURL: downloadURL, progress: ''})

                    });
                });

            } else {
                this.setState({fetching: false, error: ' Too large video size it should be <=10 MB'})
            }
        } else {
            this.onUpdateDealHandler('')
        }

    }

    onUpdateDealHandler = (dealVideoLink) => {

        // event.preventDefault();
        this.setState({fetching: true, error: ''})
        let dealData = this.state.dealObject;
        if (dealVideoLink) {
            dealData = {...dealData, dealVideoLink}
        }
        let dealId = dealData.dealId

        updateDeal(dealData)
            .then(e => {
                fetchFullDeal(dealId)
                    .then(res => {
                        this.setState({fetching: false, error: '', changes: true})
                    })

            })
            .catch(e => {
                this.setState({fetching: false, error: ' error while updating  deal'})
            })
    }

    render() {

        let {dealObject, fetching, error, changes} = this.state;
        let opacity = 1;
        let cursor = 'pointer'
        if (changes) {
            opacity = .3
            cursor = 'not-allowed'
        }
        if (fetching) {
            return <div className='loading-container'>
                {this.state.fetching && <Roller/>}
            </div>
        }
        let {
            dealTitle,
            dealInvestmentType,
            dealCompany,
            dealIndustry,
            dealType,
            dealSize,
            dealStatus,
            dealOffering,
            dealWebSiteLink,
            dealSummary,
            dealDetails,
            dealTeam,
            dealCustomer,
            dealFinancial,
            dealBoard,
            dealRegion,
            dealCountry,
            dealLatitude,
            dealLongitude,
            dealTarget,
            dealAmountRaised
        } = dealObject

        const dealInvestmentTypeOptionList = dealInvestmentTypeFilter.map((filterElement, index) => {
            return (
                <option key={filterElement}>{filterElement}</option>
            )
        })
        const dealSizeOptionList = dealSizeFilter.map((filterElement, index) => {
            return (
                <option key={filterElement}>{filterElement}</option>
            )
        })
        const dealTypeOptionList = dealTypeFilter.map((filterElement, index) => {
            return (
                <option key={filterElement}>{filterElement}</option>
            )
        })
        const dealRegionOptionList = dealRegionFilter.map((filterElement, index) => {
            return (
                <option key={filterElement}>{filterElement}</option>
            )
        })
        const dealStatusOptionList = dealStatusFilter.map((filterElement, index) => {
            return (
                <option key={filterElement}>{filterElement}</option>
            )
        })
        const dealCountryOptionList = dealCountryFilter.map((filterElement, index) => {
            return (
                <option key={filterElement}>{filterElement}</option>
            )
        })

        return (
            <div className='content-main-container p-0'>
                <div className='add-deal-header'>
                    Edit deal
                </div>
                <div className='outer-input-container'>
                    <span className='error-class'>{error}</span>
                    <div className='main-input-container'>
                        <div className='parallel-input-row'>
                            <label> Title</label>
                            <input placeholder='Title' value={dealTitle} onChange={event => this.updateDealData('title', event.target.value)}/>
                        </div>
                        <div className='parallel-input-row'>
                            <label> Deal Investment Type</label>
                            <select name='dealInvestmentType'
                                    defaultValue={dealInvestmentType}
                                    onChange={event => this.updateDealData('investment', event.target.value)}>
                                {dealInvestmentTypeOptionList}
                            </select>
                        </div>
                    </div>

                    {/*company row*/}
                    <div className='main-input-container'>
                        <div className='parallel-input-row'>
                            <label> company</label>
                            <input placeholder='Company' value={dealCompany} onChange={event => this.updateDealData('company', event.target.value)}/>
                        </div>
                        <div className='parallel-input-row'>
                            <label> Industry</label>
                            <input placeholder='Industry' value={dealIndustry} onChange={event => this.updateDealData('industry', event.target.value)}/>
                        </div>
                    </div>

                    {/*dealtype row*/}
                    <div className='main-input-container'>
                        <div className='parallel-input-row'>
                            <label> Deal Type</label>
                            <select name='dealType' defaultValue={dealType}
                                    onChange={event => this.updateDealData('dealType', event.target.value)}
                            >
                                {dealTypeOptionList}
                            </select>
                        </div>
                        <div className='parallel-input-row'>
                            <label> deal size</label>
                            <select defaultValue={dealSize}
                                    onChange={event => this.updateDealData('dealSize', event.target.value)}
                            >
                                {dealSizeOptionList}
                            </select>
                        </div>
                    </div>

                    {/*deal status row*/}
                    <div className='main-input-container'>
                        <div className='parallel-input-row'>
                            <label> deal status</label>
                            <select defaultValue={dealStatus}
                                    onChange={event => this.updateDealData('dealStatus', event.target.value)}>
                                {dealStatusOptionList}
                            </select>
                        </div>
                        <div className='parallel-input-row'>
                            <label> offering</label>
                            <input value={dealOffering}
                                   onChange={event => this.updateDealData('dealOffering', event.target.value)}
                            />
                        </div>
                    </div>
                    <div className='main-input-container'>
                        <div className='parallel-input-row'>
                            <label> website link</label>
                            <input type='url' value={dealWebSiteLink}
                                   onChange={event => this.updateDealData('dealWebSiteLink', event.target.value)}

                            />
                        </div>
                        <div className='parallel-input-row'>
                            <label> video </label>
                            <input type='file'
                                   accept={['video/* ']} aria-label='Uplaod File : videos, '
                                   onChange={event => this.setState({'file': event.target.files[0], changes: false})}
                            />
                            {/*<div>*/}
                            {/*    {progress > 0 && <progress value={progress} max={100}/>}*/}
                            {/*    <button onClick={(event => this.onUploadVideo('cancel'))}> cancel</button>*/}
                            {/*</div>*/}
                        </div>
                    </div>
                    {/*summary row*/}
                    <div className='main-input-container '>
                        <div className='parallel-input-row full-width'>
                            <label> summary</label>
                            <textarea value={dealSummary}
                                      rows={2} placeholder='Summary'
                                      onChange={event => this.updateDealData('summary', event.target.value)}
                            />
                        </div>
                    </div>
                    {/*details row*/}
                    <div className='main-input-container '>
                        <div className='parallel-input-row full-width'>
                            <label> details</label>
                            <textarea rows={2} value={dealDetails}
                                      placeholder='Details'
                                      onChange={event => this.updateDealData('detail', event.target.value)}
                            />
                        </div>
                    </div>
                    <hr/>
                    <hr/>

                    {/*revenue row*/}
                    {/*<div className='main-input-container'>*/}
                    {/*    <div className='parallel-input-row'>*/}
                    {/*        <label> revenue forcast</label>*/}
                    {/*        <input type='file'/>*/}
                    {/*    </div>*/}
                    {/*    <div className='parallel-input-row'>*/}
                    {/*        <label> chart 1</label>*/}
                    {/*        <input type='file'/>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    {/*/!*chart 2 row*!/*/}
                    {/*<div className='main-input-container'>*/}
                    {/*    <div className='parallel-input-row'>*/}
                    {/*        <label> chart 2</label>*/}
                    {/*        <input type='file'/>*/}
                    {/*    </div>*/}
                    {/*    <div className='parallel-input-row'>*/}
                    {/*        <label> chart 3</label>*/}
                    {/*        <input type='file'/>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    {/*/!*chart 3 row*!/*/}
                    {/*<div className='main-input-container'>*/}
                    {/*    <div className='parallel-input-row'>*/}
                    {/*        <label> chart 3</label>*/}
                    {/*        <input type='file'/>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    {/* team board */}
                    <div className='main-input-container'>
                        <div className='parallel-input-row'>
                            <label> team</label>
                            <textarea value={dealTeam}
                                      rows={2} placeholder='Team'
                                      onChange={event => this.updateDealData('dealTeam', event.target.value)}

                            />
                        </div>
                        <div className='parallel-input-row'>
                            <label> Board</label>
                            <textarea value={dealBoard}
                                      rows={2} placeholder='Board'
                                      onChange={event => this.updateDealData('dealBoard', event.target.value)}

                            />
                        </div>
                    </div>
                    {/*customer financial*/}
                    <div className='main-input-container'>
                        <div className='parallel-input-row'>
                            <label> customer </label>
                            <textarea value={dealCustomer}
                                      rows={2} placeholder='Customer'
                                      onChange={event => this.updateDealData('customer', event.target.value)}
                            />
                        </div>
                        <div className='parallel-input-row'>
                            <label> financial </label>
                            <textarea value={dealFinancial}
                                      rows={2} placeholder='Financial'
                                      onChange={event => this.updateDealData('financial', event.target.value)}
                            />
                        </div>
                    </div>
                    {/*region*/}
                    <div className='main-input-container'>
                        <div className='parallel-input-row'>
                            <label> Region</label>
                            <select defaultValue={dealRegion}
                                    onChange={event => this.updateDealData('region', event.target.value)}
                            >
                                {dealRegionOptionList}
                            </select>
                        </div>
                        <div className='parallel-input-row'>
                            <label> country</label>
                            <select defaultValue={dealCountry}
                                    onChange={event => this.updateDealData('country', event.target.value)}
                            >
                                {dealCountryOptionList}

                            </select>
                        </div>
                    </div>
                    {/* latitude*/}
                    <div className='main-input-container'>
                        <div className='parallel-input-row'>
                            <label> latitude </label>
                            <input type='number' value={dealLatitude} step={1} placeholder='Latitude'
                                   onChange={event => this.updateDealData('latitude', event.target.value)}
                            />
                        </div>
                        <div className='parallel-input-row'>
                            <label> longitude </label>
                            <input type='number' value={dealLongitude} step={1} placeholder='Longitude'
                                   onChange={event => this.updateDealData('longitude', event.target.value)}
                            />
                        </div>
                    </div>
                    {/*target*/}
                    <div className='main-input-container'>
                        <div className='parallel-input-row'>
                            <label> Target</label>
                            <input type='number' min={0} max={100} placeholder='Target' value={dealTarget}
                                   onChange={event => this.updateDealData('target', event.target.value)}
                            />
                        </div>
                        <div className='parallel-input-row'>
                            <label> Amount Raised</label>
                            <input type='number' placeholder='Amount Raised' min={0} max={100} value={dealAmountRaised}
                                   onChange={event => this.updateDealData('amount', event.target.value)}
                            />
                        </div>
                    </div>
                    <div className='main-input-container'>
                        <div className='parallel-input-row normal-width'>
                            <button disabled={changes} style={{opacity: opacity, cursor: cursor}} onClick={(event) => this.submitDealHandler(event)}> Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default EditDealForm
