import React from 'react'
import '../AddDeal/addDealForm.css'
import './dealCardView.css'
import {MDBDataTable} from 'mdbreact';
import {Roller} from "react-awesome-spinners";
import {deleteDeal, fetchAllDeals} from "../../../services/firebase";

class DealListView extends React.Component {

    state = {
        dealsList: [],
        fetching: true,
        role: '',
        dealType: '',
        error: ''
    }

    deleteDealHandler = (dealData => {
        this.setState({fetching: true})
        deleteDeal(dealData).then(d => {
            this.fetchDeals()
                .then(d => {

                })
        })
    })

    componentDidMount() {

        let user = JSON.parse(localStorage.getItem('@m-g-t-f-u'))
        let role = '', dealType = ''
        if (user.hasOwnProperty('role')) {
            role = user.role;
            this.setState({role}, () => {
                if (role === '2' || role === '3') {
                    if (user.hasOwnProperty('dealType')) {
                        dealType = user.dealType;
                        this.setState({dealType})
                    }
                }
                this.fetchDeals()
                    .then(d => {

                    })
            })
        } else {
            this.props.history.push('/signin')
        }

    }

    fetchDeals = async () => {

        this.setState({fetching: true, error: ''})

        let role = this.state.role;
        let userDealType = this.state.dealType
        let dataTableData = {}

        dataTableData = {
            columns: [
                {
                    label: head ('ID'),
                    field: 'index',
                    width: 50
                },
                {
                    label: head ('Title'),
                    field: 'dealTitle',
                    width: 50
                },
                {
                    label: head ('Summary'),
                    field: 'summary',
                    width: 200
                },
                {
                    label: head ('Company'),
                    field: 'company',
                    width: 200
                },
                {
                    label: head ('Industry'),
                    field: 'industry',
                    width: 200
                },
                {
                    label: head ('Status'),
                    field: 'status',
                    width: 100
                },
                {
                    label: head ('Type'),
                    field: 'type',
                    width: 100
                }
            ]
        }

        let rowArray = []

        let deals = await fetchAllDeals();

        for (let i = 0; i < deals.length; i++) {
            if (role === '1') {
                let obj = {
                    index: i + 1, summary: deals[i].dealSummary, company: deals[i].dealCompany,
                    industry: deals[i].dealIndustry, type: deals[i].dealType, status: deals[i].dealStatus, dealTitle: deals[i].dealTitle
                }
                dataTableData = {
                    columns: [
                        {
                            label: head ('ID'),
                            field: 'index',
                            width: 50
                        },
                        {
                            label: head ('Title'),
                            field: 'dealTitle',
                            width: 50
                        },
                        {
                            label: head ('Summary'),
                            field: 'summary',
                            width: 200
                        },
                        {
                            label: head ('Company'),
                            field: 'company',
                            width: 200
                        },
                        {
                            label: head ('Industry'),
                            field: 'industry',
                            width: 200
                        },
                        {
                            label: head ('Status'),
                            field: 'status',
                            width: 100
                        },
                        {
                            label: head ('Type'),
                            field: 'type',
                            width: 100
                        },
                        {
                            label:  ('Action'),
                            field: 'action',
                            width: 300
                        }
                    ]
                }

                let editBtn;
                if (deals[i].isDeleted) {
                    editBtn = (
                        <div className='deal-action-container'>
                            {/*<a href={`${this.props.match.url}/editDeal/${i}`}>*/}
                            <button className='deal-edit-btn' onClick={() => {
                                this.editDealDetail(deals[i], i)
                            }}> Edit
                            </button>
                            {/*</a>*/}

                            <button className='deal-un-delete-btn'
                                    onClick={() => {
                                        this.deleteDealHandler(deals[i])
                                    }}> UnDel
                            </button>
                        </div>
                    )
                } else {
                    editBtn = (
                        <div className='deal-action-container'>
                            <button className='deal-edit-btn' onClick={() => {
                                this.editDealDetail(deals[i], i)
                            }}> Edit
                            </button>
                            <button className='deal-delete-btn'
                                    onClick={() => {
                                        this.deleteDealHandler(deals[i])
                                    }}> Delete
                            </button>
                        </div>
                    )
                }
                obj = {...obj, action: editBtn}
                rowArray.push(obj)
            } else {
                if (deals[i].dealType === userDealType) {
                    let obj = {
                        index: i + 1, summary: deals[i].dealSummary, company: deals[i].dealCompany,
                        industry: deals[i].dealIndustry, type: deals[i].dealType, status: deals[i].dealStatus, dealTitle: deals[i].dealTitle
                    }
                    rowArray.push(obj)
                }
            }
            dataTableData = {...dataTableData, rows: rowArray}
        }

        // let newDealList = []
        // if (dealType) {
        //     for (let i = 0; i < deals.length; i++) {
        //         if (deals[i].dealType === dealType) {
        //             newDealList.push(deals[i])
        //         }
        //     }
        //     this.setState({dealList: newDealList, fetching: false})
        // } else {
        //
        //     this.setState({dealList: deals, fetching: false})
        // }
        this.setState({dealsList: dataTableData, fetching: false})
    }

    editDealDetail = (deal, id) => {
        this.props.history.push(`/dashboard/editDeal/${id}`, deal)
    }

    render() {

        const {dealsList, fetching,  role} = this.state
        if (fetching) {
            return <div className='loading-container'>
                {this.state.fetching && <Roller/>}
            </div>
        }
        return (
            <div className='content-main-container'>
                <div className='deal-create-deal-container'>
                    <div className='user-list-title'>
                        Deals
                    </div>
                    {role === '1' && <div className='create-user-container'>
                        <a href='/dashboard/addDeal'> <span onClick={() => this.setState({showModal: true})}>  create deal</span></a>
                    </div>}
                </div>
                <div>
                    <MDBDataTable
                        style={{fontSize: 12,}}
                        striped
                        bordered
                        // centered
                        noBottomColumns={true}
                        hover
                        data={dealsList}
                        searching={true}
                        displayEntries={true}
                        responsive
                        entries={20}
                    />
                </div>
            </div>
        )
    }
}

export default DealListView


let head = (label) => {
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



