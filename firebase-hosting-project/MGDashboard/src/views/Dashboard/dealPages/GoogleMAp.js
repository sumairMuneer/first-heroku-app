import React, {Component} from 'react';
import {GoogleApiWrapper, InfoWindow, Map, Marker} from 'google-maps-react';

export class MapContainer extends Component {

    constructor(props) {
        super(props);

        // this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    state = {
        showingInfoWindow: false,
        activeMarker: {},
        selectedPlace: {}
    };

    componentWillMount() {
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    onMarkerClick = (props, marker, e) => {
        let deal = props.name
        this.setState({
            selectedPlace: deal,
            activeMarker: marker,
            showingInfoWindow: true
        });
    }
    onClose = props => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMarker: null
            });
        }
    };

    updateWindowDimensions = () => {
        // if (window.innerWidth < 701) {
        //     this.showOverlaySidebar()
        // } else {
        //     this.showNormalSidebar()
        // }
    }

    render() {

        let data = this.props.data;
        let selectedDeal = this.state.selectedPlace
        let markers = data.map((markerData, index) => {
            let no = index + 1
            markerData = {...markerData, index: no}
            if (markerData.hasOwnProperty('dealLatitude') && (markerData.hasOwnProperty('dealLongitude'))) {
                let lat = markerData.dealLatitude, lng = markerData.dealLongitude
                return (
                    <Marker key={index}
                            position={{
                                lat: lat,
                                lng: lng
                            }}
                            onClick={this.onMarkerClick}
                            name={markerData}
                    />
                )
            }
            return(<></>);

        })

        return (
            <Map
                google={this.props.google}
                zoom={3}
                style={{
                    width: '50%',
                    height: '50%'

                }}
                initialCenter={{
                    lat: 33,
                    lng: 71
                }}
            >

                {markers}

                <InfoWindow
                    marker={this.state.activeMarker}
                    visible={this.state.showingInfoWindow}
                    onClose={this.onClose}
                >
                    <div>
                        <div className='marker-row'>
                            <div>
                                <div>Title</div>
                            </div>
                            <div>{this.state.selectedPlace.dealTitle}</div>
                        </div>
                        <div className='marker-row'>
                            <div>
                                <div>Type</div>
                            </div>
                            <div>{this.state.selectedPlace.dealType}</div>
                        </div>
                        <div className='marker-row'>
                            <div>
                                <div>Summary</div>
                            </div>
                            <div>{this.state.selectedPlace.dealSummary}</div>
                        </div>
                        <a href={`/dashboard/dealsList/${selectedDeal.dealId}`} style={{paddingLeft: 5, margin: 5}}>View Details</a>
                    </div>
                </InfoWindow>
            </Map>
        );
    }
}

export default GoogleApiWrapper({
    // apiKey: 'AIzaSyA2tgyf6q1t1dfCzH3e34coHouguj2_h4E'
    apiKey: 'AIzaSyA-LkifqvF1eOJ6b2kPEavqWvBme4vxUIg'
})(MapContainer);
