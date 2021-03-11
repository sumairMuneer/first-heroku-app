import React from 'react';
import './addDealForm.css';
import {dealCountryFilter, dealInvestmentTypeFilter, dealRegionFilter, dealSizeFilter, dealStatusFilter, dealTypeFilter} from "../../../services/dropdownFilter";

import {addDeal} from '../../../services/firebase'
import {Roller} from "react-awesome-spinners";
import firebase from "firebase";

class AddDealForm extends React.Component {

    state = {
        dealTitle: '',
        dealInvestmentType: '',
        dealCompany: '',
        dealIndustry: '',
        dealType: '',
        dealSize: '',
        dealStatus: '',
        dealOffering: '',
        dealWebSiteLink: '',
        dealSummary: '',
        dealDetails: '',
        dealTeam: '',
        dealBoard: '',
        dealCustomer: '',
        dealFinancial: '',
        dealRegion: '',
        dealCountry: '',
        dealLatitude: '',
        dealLongitude: '',
        dealTarget: '',
        dealAmountRaised: '',
        fetching: false,
        error: '',
        progress: '',
        file: ''
    }

    onDealSubmitHandler = (event) => {

        this.setState({fetching: true})
        if (this.state.file) {
            let storageRef = firebase.storage().ref();
            let video = this.state.file
            let videoName = video.name
            // let videoType = video.type;
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
                        this.addNewDeal(downloadURL);
                        // this.setState({videoURL: downloadURL, progress: ''})

                    });
                });

            } else {
                this.setState({fetching: false, error: ' Too large video size it should be <=10 MB'})
            }
        } else {
            this.addNewDeal('')
        }

    }
    addNewDeal = (dealVideoLink) => {
        this.setState({fetching: true})
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
            dealBoard,
            dealCustomer,
            dealFinancial,
            dealRegion,
            dealCountry,
            dealLatitude,
            dealLongitude,
            dealTarget,
            dealAmountRaised
        } = this.state;

        const dealData = {
            dealTitle, dealInvestmentType, dealCompany, dealIndustry, dealType, dealSize, dealStatus, dealVideoLink,
            dealOffering, dealWebSiteLink, dealSummary, dealDetails, dealTeam, dealBoard, dealCustomer, dealFinancial,
            dealRegion, dealCountry, dealLatitude, dealLongitude,
            dealTarget, dealAmountRaised
        }

        addDeal(dealData)
            .then(e => {
                this.setState({fetching: false, error: ''})
                // console.log(" deal added successfully ")
            })
            .catch(e => {
                this.setState({fetching: false, error: '! error while adding new deal'});
                // console.log(" error while adding new deal  ")
            })
    }

    render() {
        let {fetching, error} = this.state;
        if (fetching) {
            return <div className='loading-container'>
                {this.state.fetching && <Roller/>}
            </div>
        }
        const dealInvestmentTypeOptionList = dealInvestmentTypeFilter.map((filterElement, index) => {
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
        const dealStatusOptionList = dealStatusFilter.map((filterElement, index) => {
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
        const dealCountryOptionList = dealCountryFilter.map((filterElement, index) => {
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
                <div className='add-deal-header'>
                    add deal
                </div>
                <div className='outer-input-container'>
                    <span className='error-class'>{error}</span>
                    <div className='main-input-container'>

                        <div className='parallel-input-row'>
                            <label> Title</label>
                            <input placeholder='Title' onChange={(event => this.setState({dealTitle: event.target.value}))}/>
                        </div>
                        <div className='parallel-input-row'>
                            <label> Deal Investment Type</label>
                            <select name='dealInvestmentType'
                                    onChange={(event => {
                                        this.setState({dealInvestmentType: event.target.value})
                                    })}>
                                {dealInvestmentTypeOptionList}
                            </select>
                        </div>
                    </div>

                    {/*company row*/}
                    <div className='main-input-container'>
                        <div className='parallel-input-row'>
                            <label> company</label>
                            <input placeholder='Company' onChange={(event => this.setState({dealCompany: event.target.value}))}/>
                        </div>
                        <div className='parallel-input-row'>
                            <label> Industry</label>
                            <input placeholder='Industry' onChange={(event => this.setState({dealIndustry: event.target.value}))}/>
                        </div>
                    </div>

                    {/*dealtype row*/}
                    <div className='main-input-container'>
                        <div className='parallel-input-row'>
                            <label> Deal Type</label>
                            <select name='dealType'
                                    onChange={(event => {
                                        this.setState({dealType: event.target.value})
                                    })}>
                                {dealTypeOptionList}
                            </select>
                        </div>
                        <div className='parallel-input-row'>
                            <label> deal size</label>
                            <select
                                onChange={(event => {
                                    this.setState({dealSize: event.target.value})
                                })}
                            >
                                {dealSizeOptionList}
                            </select>
                        </div>
                    </div>

                    {/*deal status row*/}
                    <div className='main-input-container'>
                        <div className='parallel-input-row'>
                            <label> deal status</label>
                            <select
                                onChange={(event => {
                                    this.setState({dealStatus: event.target.value})
                                })}
                            >
                                {dealStatusOptionList}
                            </select>
                        </div>
                        <div className='parallel-input-row'>
                            <label> offering</label>
                            <input onChange={(event => {
                                this.setState({dealOffering: event.target.value})
                            })}
                            />
                        </div>
                    </div>
                    {/*deal video website row*/}
                    <div className='main-input-container'>
                        <div className='parallel-input-row'>
                            <label> website link</label>
                            <input type='url' onChange={(event => {
                                this.setState({dealWebSiteLink: event.target.value})
                            })}
                            />
                        </div>
                        <div className='parallel-input-row'>
                            <label> video </label>
                            <input type='file'
                                   accept={['video/* ']} aria-label='Uplaod File : videos, '
                                   onChange={(event => {
                                       // this.setState({file: event.target.files[0]}, () => this.onUploadVideo(event))
                                       this.setState({file: event.target.files[0]})

                                   })}
                            />
                        </div>
                    </div>

                    {/*summary row*/}
                    <div className='main-input-container '>
                        <div className='parallel-input-row full-width'>
                            <label> summary</label>
                            <textarea rows={2} placeholder='Summary'
                                      onChange={(event => {
                                          this.setState({dealSummary: event.target.value})
                                      })}
                            />
                        </div>
                    </div>
                    {/*details row*/}
                    <div className='main-input-container '>
                        <div className='parallel-input-row full-width'>
                            <label> details</label>
                            <textarea rows={2} placeholder='Details' onChange={(event => {
                                this.setState({dealDetails: event.target.value})
                            })}/>
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
                    {/*chart 2 row*/}
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
                            <textarea rows={2} placeholder='Team'
                                      onChange={(event => {
                                          this.setState({dealTeam: event.target.value})
                                      })}
                            />
                        </div>
                        <div className='parallel-input-row'>
                            <label> Board</label>
                            <textarea rows={2} placeholder='Board'
                                      onChange={(event => {
                                          this.setState({dealBoard: event.target.value})
                                      })}
                            />
                        </div>
                    </div>
                    {/*customer financial*/}
                    <div className='main-input-container'>
                        <div className='parallel-input-row'>
                            <label> customer </label>
                            <textarea rows={2} placeholder='Customer'
                                      onChange={(event => {
                                          this.setState({dealCustomer: event.target.value})
                                      })}
                            />
                        </div>
                        <div className='parallel-input-row'>
                            <label> financial </label>
                            <textarea rows={2} placeholder='Financial'
                                      onChange={(event => {
                                          this.setState({dealFinancial: event.target.value})
                                      })}
                            />
                        </div>
                    </div>
                    {/*region*/}
                    <div className='main-input-container'>
                        <div className='parallel-input-row'>
                            <label> Region</label>
                            <select
                                onChange={(event => {
                                    this.setState({dealRegion: event.target.value})
                                })}
                            >
                                {dealRegionOptionList}
                            </select>
                        </div>
                        <div className='parallel-input-row'>
                            <label> country</label>
                            <select
                                onChange={(event => {
                                    this.setState({dealCountry: event.target.value})
                                })}
                            >
                                {dealCountryOptionList}

                            </select>
                        </div>
                    </div>
                    {/* latitude*/}
                    <div className='main-input-container'>
                        <div className='parallel-input-row'>
                            <label> latitude </label>
                            <input type='number' step={1} placeholder='Latitude' onChange={(event => {
                                this.setState({dealLatitude: event.target.value})
                            })}
                            />
                        </div>
                        <div className='parallel-input-row'>
                            <label> longitude </label>
                            <input type='number' step={1} placeholder='Longitude' onChange={(event => {
                                this.setState({dealLongitude: event.target.value})
                            })}
                            />
                        </div>
                    </div>
                    {/*target*/}
                    <div className='main-input-container'>
                        <div className='parallel-input-row'>
                            <label> Target</label>
                            <input type='number' placeholder='Target' min={0} max={100} onChange={(event => {
                                this.setState({dealTarget: event.target.value})
                            })}
                            />
                        </div>
                        <div className='parallel-input-row'>
                            <label> Amount Raised</label>
                            <input type='number' placeholder='Amount Raised' min={0} max={100} onChange={(event => {
                                this.setState({dealAmountRaised: event.target.value})
                            })}
                            />
                        </div>
                    </div>
                    <div className='main-input-container'>
                        <div className='parallel-input-row normal-width'>
                            <button onClick={(event) => this.onDealSubmitHandler(event)}> Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default AddDealForm

//
// onUploadVideo = (action) => {
//
//     let storageRef = firebase.storage().ref();
//     let video = this.state.file
//     let videoName = video.name
//     let videoType = video.type;
//     let videoSize = video.size
//
//     // if (videoType.search('video/')) {
//     if (videoSize < 10485770) {// allow video of size max 10mb
//         let uploadTask = storageRef.child(`videos/${videoName}`).put(video);
//         if (action === 'cancel') {
//             // if (!uploadTask.isComplete()) {
//             uploadTask.cancel();
//             storageRef.child(`videos/${videoName}`).delete();
//             // uploadTask.snapshot.ref.delete();
//             this.setState({progress: ''})
//             uploadTask=''
//             // } else {
//             //     //Upload is complete, but user wanted to cancel. Let's delete the file
//             //     uploadTask.snapshot.ref.delete();
//             //     // storageRef.delete(); // will delete all your files
//             // }
//         } else {
//             uploadTask.on('state_changed', (snapshot) => {
//                 // Observe state change events such as progress, pause, and resume
//                 // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
//                 let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//                 console.log('Upload is ' + progress + '% done');
//                 this.setState({progress})
//                 switch (snapshot.state) {
//                     case firebase.storage.TaskState.PAUSED: // or 'paused'
//                         console.log('Upload is paused');
//                         break;
//                     case firebase.storage.TaskState.RUNNING: // or 'running'
//                         console.log('Upload is running');
//                         break;
//                 }
//             }, (error) => {
//                 console.log('error ', error);
//                 // Handle unsuccessful uploads
//             }, () => {
//                 // Handle successful uploads on complete
//                 // For instance, get the download URL: https://firebasestorage.googleapis.com/...
//                 uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
//                     this.setState({videoURL: downloadURL, progress: ''})
//                     console.log('File available at', downloadURL);
//                 });
//             });
//         }
//     }
// }
