import React from 'react';
import '../AddDeal/addDealForm.css';
import './dealCardView.css';
import cityImg from '../../../assets/images/city-image.jpg'
import {dealRegionFilter, dealSizeFilter, dealTypeFilter} from "../../../services/dropdownFilter";
import {fetchAllDeals, fetchUser, updateUser} from "../../../services/firebase";
import {Roller} from "react-awesome-spinners";
import GoogleMAp from "./GoogleMAp";

class DealCardView extends React.Component {

    state = {
        dealList: [],
        user: {},
        filterDealsList: [],
        role: '',
        dealType: '',
        userFavouriteDealsList: [],
        fetching: true,
        favourite: false,
        error: '',
        dealSizeFilterValue: '',
        dealTypeFilterValue: '',
        dealRegionFilterValue: '',
        starClickEnable: true,
        searchedValue:''
    }

    componentDidMount() {
        this.setUserAndDealsData()

    }

    setUserAndDealsData = () => {
        let user = JSON.parse(localStorage.getItem('@m-g-t-f-u'))
        this.setState({user})
        let role = '', dealType = '', userFavouriteDealsList = []
        if (user.hasOwnProperty('role')) {
            role = user.role;
            this.setState({role}, () => {

                if (user.hasOwnProperty('dealsList')) {
                    userFavouriteDealsList = user.dealsList;
                    this.setState({userFavouriteDealsList})
                }
                if (role === '2' || role === '3') {
                    if (user.hasOwnProperty('dealType')) {
                        dealType = user.dealType;
                        this.setState({dealType})
                    }

                }
                this.fetchDeals()
                    .then(deals => {
                        let newDealList = []
                        if (dealType.length > 0) {
                            for (let i = 0; i < deals.length; i++) {
                                for (let j = 0; j < dealType.length; j++) {
                                    if (deals[i].dealType === dealType[j]) {
                                        newDealList.push(deals[i])
                                    }
                                }
                            }
                            this.setState({dealList: newDealList, filterDealsList: newDealList}, () => {
                                setTimeout(() => {
                                    this.setState({fetching: false})
                                }, 400)
                            })
                        } else {

                            this.setState({dealList: deals, filterDealsList: deals,}, () => {
                                setTimeout(() => {
                                    this.setState({fetching: false})
                                }, 400)
                            })
                        }
                    })
            })
        } else {
            this.props.history.push('/signin')
        }

    }

    fetchDeals = async () => {
        let response = await fetchAllDeals()
        return response;
    }

    viewFullDealDetail = (dealId) => {
        this.setState({fetching: true})
        this.props.history.push(`${this.props.match.url}/dealsList/${dealId}`)

    }

    onFilterChange = (filterName, value) => {
        if (filterName === 'searchedValue') {
            this.setState({searchedValue: value.toLowerCase()}, () => {
                this.setDealsList()
            })
        } else if (filterName === 'dealSize') {
            this.setState({dealSizeFilterValue: value}, () => {
                this.setDealsList()
            })
        } else if (filterName === 'dealType') {
            this.setState({dealTypeFilterValue: value}, () => {
                this.setDealsList()
            })
        }
        if (filterName === 'dealRegion') {
            this.setState({dealRegionFilterValue: value}, () => {
                this.setDealsList()
            })
        }
        // this.setDealsList()
    }
    setDealsList = () => {
        let dealList = this.state.dealList;

        let newDealsList = []
        let {dealSizeFilterValue, dealTypeFilterValue, dealRegionFilterValue, searchedValue} = this.state;
        if (searchedValue) {

           let value=searchedValue
            let filterDeals = []
            for (let index = 0; index < dealList.length; index++) {
                let a = dealList[index].dealTitle.toLowerCase()
                let b = dealList[index].dealSize.toLowerCase()
                let c = dealList[index].dealStatus.toLowerCase()
                let d = dealList[index].dealTarget.toLowerCase()
                let e = dealList[index].dealAmountRaised.toLowerCase()
                let f = dealList[index].dealType.toLowerCase()
                let g = dealList[index].dealSummary.toLowerCase()
                if (
                    (a.search(value) >= 0) || (b.search(value) >= 0) || (c.search(value) >= 0) || (d.search(value) >= 0) ||
                    (e.search(value) >= 0) || (f.search(value) >= 0) || (g.search(value) >= 0)
                ) {
                    filterDeals.push(dealList[index])
                }
            }

            dealList = filterDeals
            // this.setState({filterDealsList: filterDeals}, () => {
            //     this.setDealsList()
            // })
        }
        if (dealSizeFilterValue === 'all') {
            dealSizeFilterValue = ''
        }
        if (dealTypeFilterValue === 'all') {
            dealTypeFilterValue = ''
        }
        if (dealRegionFilterValue === 'all') {
            dealRegionFilterValue = ''
        }
        if (dealSizeFilterValue && dealTypeFilterValue && dealRegionFilterValue) {
            for (let i = 0; i < dealList.length; i++) {
                if ((dealList[i].dealSize === dealSizeFilterValue) && (dealList[i].dealType === dealTypeFilterValue) && (dealList[i].dealRegion === dealRegionFilterValue)) {
                    newDealsList.push(dealList[i])
                }
            }
            this.setState({filterDealsList: newDealsList})
            return;
        } else if (dealSizeFilterValue && dealTypeFilterValue) {
            for (let i = 0; i < dealList.length; i++) {
                if ((dealList[i].dealSize === dealSizeFilterValue) && (dealList[i].dealType === dealTypeFilterValue)) {
                    newDealsList.push(dealList[i])
                }
            }
            this.setState({filterDealsList: newDealsList})
            return;
        } else if (dealTypeFilterValue && dealRegionFilterValue) {
            for (let i = 0; i < dealList.length; i++) {
                if ((dealList[i].dealType === dealTypeFilterValue) && (dealList[i].dealRegion === dealRegionFilterValue)) {
                    newDealsList.push(dealList[i])
                }
            }
            this.setState({filterDealsList: newDealsList})
            return;
        } else if (dealSizeFilterValue && dealRegionFilterValue) {
            for (let i = 0; i < dealList.length; i++) {
                if ((dealList[i].dealSize === dealSizeFilterValue) && (dealList[i].dealRegion === dealRegionFilterValue)) {
                    newDealsList.push(dealList[i])
                }
            }
            this.setState({filterDealsList: newDealsList})
            return;
        } else if (dealTypeFilterValue) {
            for (let i = 0; i < dealList.length; i++) {
                if (dealList[i].dealType === dealTypeFilterValue) {
                    newDealsList.push(dealList[i])
                }
            }
            this.setState({filterDealsList: newDealsList})
            return;
        } else if (dealSizeFilterValue) {
            for (let i = 0; i < dealList.length; i++) {
                if ((dealList[i].dealSize === dealSizeFilterValue)) {
                    newDealsList.push(dealList[i])
                }
            }
            this.setState({filterDealsList: newDealsList})
            return;
        } else if (dealRegionFilterValue) {
            for (let i = 0; i < dealList.length; i++) {
                if (dealList[i].dealRegion === dealRegionFilterValue) {
                    newDealsList.push(dealList[i])
                }
            }
            this.setState({filterDealsList: newDealsList})
            return;
        } else {
            this.setState({filterDealsList: dealList})
        }

    }

    onStarClickHandler = async (dealId) => {
        // this.setState({fetching: true})
        let found = false;
        let updateUserFavouriteDealsList = [];
        let userFavouriteDealsList = this.state.userFavouriteDealsList;
        for (let i = 0; i < userFavouriteDealsList.length; i++) {
            if (userFavouriteDealsList[i] === dealId) {
                found = true
                break;
            }
        }
        if (found) {
            for (let i = 0; i < userFavouriteDealsList.length; i++) {
                if (userFavouriteDealsList[i] !== dealId) {
                    updateUserFavouriteDealsList.push(userFavouriteDealsList[i])
                }
            }
            userFavouriteDealsList = updateUserFavouriteDealsList
        } else {
            userFavouriteDealsList.push(dealId)
        }
        let user = this.state.user;
        let updatedUser = {...user, dealsList: userFavouriteDealsList}
        let userId = user.id
        await updateUser(updatedUser)
            .then(async () => {
                await fetchUser(userId)
                    .then(data => {

                        localStorage.setItem('@m-g-t-f-u', JSON.stringify(data))
                        this.setUserAndDealsData();
                    })
            })
    }

    onFavouriteBtnHandler = () => {
        let filterDealsList = this.state.filterDealsList;
        let userFavouriteDealsList = this.state.userFavouriteDealsList;
        let updatedDealsList = []
        for (let i = 0; i < filterDealsList.length; i++) {
            for (let j = 0; j < userFavouriteDealsList.length; j++) {
                if (filterDealsList[i].dealId === userFavouriteDealsList[j]) {
                    updatedDealsList.push(filterDealsList[i])
                }
            }
        }
        this.setState({filterDealsList: updatedDealsList})
    }

    render() {

        let { fetching, error, role, filterDealsList, userFavouriteDealsList} = this.state;

        if (fetching) {
            return <div className='loading-container'>
                {this.state.fetching && <Roller/>}
            </div>
        }

        let deals = []
        deals = filterDealsList.length > 0 && filterDealsList.map((deal, index) => {
            let starColor = ''
            for (let i = 0; i < userFavouriteDealsList.length; i++) {
                if (userFavouriteDealsList[i] === deal.dealId) {
                    starColor = 'gold'
                    break;
                }
            }

            return (
                <div key={index} className='deal-card-container '>

                    <div className='  deal-available-header'>
                        <span>
                        Available For Investment
                        </span>
                        <i className='fa fa-star' style={{color: starColor, cursor: 'pointer'}} onClick={() => {
                            this.onStarClickHandler(deal.dealId).then()
                        }}/>
                        {/*<i className='fa fa-star'/>*/}
                    </div>
                    <div className='p-2'>
                        <img src={cityImg} alt={'deal Img'}/>
                        <div className='deal-type-status-container '>
                            <div className='badge-default '>{deal.dealType}</div>
                            <div>{deal.dealStatus}</div>
                        </div>
                        <div className=' deal-title-text'>{deal.dealTitle}</div>

                        <div className='pt-4 deal-description'>{deal.dealSummary}</div>
                        <div className='pt-3 display-flex flex-direction-row justify-content-between align-item-center' style={{width: '50%'}}>
                            <div>Deal Size:</div>
                            <div>{deal.dealSize}</div>
                        </div>
                        <div className='pt-1 display-flex flex-direction-row justify-content-between align-item-center' style={{width: '50%'}}>
                            <div>Target:</div>
                            <div>{deal.dealTarget}</div>
                        </div>
                        <div className='pt-1 display-flex  align-item-start justify-content-between '>
                            <div>amount raised:</div>
                            <div className='pt-1 pb-2 full-width'>
                                <progress id="file" value={deal.dealAmountRaised} max="100"/>
                            </div>
                        </div>
                    </div>
                    <hr className='m-0'/>
                    <div className='align-self-center pt-3'>
                        <button className='view-detail-btn' onClick={() => this.viewFullDealDetail(deal.dealId)}> view details</button>
                    </div>
                </div>
            )
        })

        const dealSizeOptionList = dealSizeFilter.map((filterElement, index) => {
            if (index === 0) {
                return (
                    <option key={index} hidden style={{color: 'red'}}>{filterElement}</option>
                )
            } else {
                return (
                    <option key={filterElement}>{filterElement}</option>
                )
            }

        })
        const dealTypeOptionList = dealTypeFilter.map((filterElement, index) => {
            if (index === 0) {
                return (
                    <option key={index} hidden style={{color: 'red'}}>{filterElement}</option>
                )
            } else {
                return (
                    <option key={filterElement}>{filterElement}</option>
                )
            }
        })
        const dealRegionOptionList = dealRegionFilter.map((filterElement, index) => {
            if (index === 0) {
                return (
                    <option key={index} hidden style={{color: 'red'}}>{filterElement}</option>
                )
            } else {
                return (
                    <option key={filterElement}>{filterElement}</option>
                )
            }
        })

        return (
            <div className='content-main-container p-0'>
                {/*AIzaSyB4jPVK5bXXtSY6exyH4qlA8P-AYSiNq0M*/}
                <div className='filters-main-container'>
                    <div className=' deal-container-plus-btn'>
                        <div className='user-list-title'>
                            Deals
                        </div>
                        <div className='fev-all-deal-btn-container '>
                            <button className='blue-btn' onClick={() => this.setDealsList()}> All deals</button>
                            <button className='blue-btn' onClick={this.onFavouriteBtnHandler}> Favourite deals</button>
                        </div>
                    </div>
                    {/*filter container*/}
                    <div className='filters-container'>
                        <select onChange={(event) => {
                            this.onFilterChange('dealSize', event.target.value)
                            // this.setState({dealSizeFilterValue: event.target.value}, () => {
                            //     this.onFilterChange('dealSize', event.target.value)
                            // })
                        }}>
                            {dealSizeOptionList}
                            <option value="all">All</option>
                        </select>
                        {role === '1' && <select onChange={(event) => {
                            // this.setState({dealTypeFilterValue: event.target.value}, () => {
                            //     this.onFilterChange('dealType', event.target.value)
                            // })
                            this.onFilterChange('dealType', event.target.value)
                        }}>
                            {dealTypeOptionList}
                            <option value="all">All</option>
                        </select>}
                        <select onChange={(event) => {
                            // this.setState({dealRegionFilterValue: event.target.value}, () => {
                            //     this.onFilterChange('dealRegion', event.target.value)
                            // })
                            this.onFilterChange('dealRegion', event.target.value)
                        }}>
                            {dealRegionOptionList}
                            <option value="all">All</option>
                        </select>
                        <input placeholder='Search text'
                               onChange={(event) => {
                                   this.onFilterChange('searchedValue', event.target.value)
                                   // this.onSearchHandler(event.target.value)
                               }}
                        />
                    </div>
                </div>


                <span className='error-class'>{error}</span>

                {deals ?
                    <div className='deals-map-container'>
                        <div className='map-container'>
                            <div>Deal on Map</div>
                            <div className='map-component'>
                                <GoogleMAp data={filterDealsList} {...this.props} />
                            </div>
                        </div>
                        <div className='outer-input-container deal-card-outer-main-container'>
                            {deals}
                        </div>
                    </div> : (<div className='outer-input-container not-found-container '>
                        <div>no record found</div>
                    </div>)}

            </div>
        )
    }
}

export default DealCardView
