import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

import GoogleMap from 'google-map-react'
import DealerMap from '../../components/DealerMap'
import FilterableTableContainer from '../../containers/filterableTableContainer'
import BookingProgressBar from '../../components/BookingProgressBar'
import { getDealerList, getCitylist, searchDealer, getNearbyDealers, clearDealers, selectDealer, startLoadingNearByDealer, endLoadingNearByDealer } from '../../actions/dealerActions'
import { updateStage } from '../../actions/bookingAction'
import { loadingStart, loadingFail, loadingSuccess } from '../../actions/loadingActions'
import { timeWaitToReload } from '../../config'
import Loadable from 'react-loading-overlay'
import T from 'i18n-react'

import './LocateDealer.css'

class LocateDealer extends Component {

  constructor(props) {

    super(props)
    this.parseDealerList = this.parseDealerList.bind(this)
    this.onIconClick = this.onIconClick.bind(this)
    this.searchLocation = this.searchLocation.bind(this)
    this.gotoCurrentLocation = this.gotoCurrentLocation.bind(this)
    this.distanceWithPromise = this.distanceWithPromise.bind(this)
    this.searchDealerInCity = this.searchDealerInCity.bind(this)
    this.searchNearbyDealer = this.searchNearbyDealer.bind(this)
    this.state = {
      activeWorkshop: 0,
      distanceList: [],
      currentLocation: {},
      hasLocation: false,
      searchedLocation: null,
      loadNear : false,
      locationErrorMessage : null,
      isGeoActive: false,
      lookingAt : 0,
    }
  }

  componentWillReceiveProps(np){
  
    console.log("hello", np.isGeoActive, this.state.isGeoActive);

    if(np.isGeoActive && !this.state.isGeoActive){
      console.log("going to get nav stuff");
      if (navigator.geolocation) {
        this.props.startLoadingNearByDealer()
        navigator.geolocation.getCurrentPosition(position => {
          let currLoca = { lat: position.coords.latitude, lng: position.coords.longitude }
          //let currLoca = { lat: 41.015137, lng: 28.979530 }

            this.setState({
              currentLocation: currLoca,
              hasLocation: true,
              //loadNear : false,
            })
            console.log("gotten pos", currLoca);
            this.searchNearbyDealer(currLoca)
            
          }, err => {
            console.log("nav geo error");
            console.log(err);
            console.log(err.code);
            console.log(err.message);

            let errMsg = ""
            switch (err.code){
              case 1 :
                errMsg = "You have rejected location services, please enable location services from ..."
              break
              case 2 :
                errMsg = ""
              break
              case 3 :
                errMsg = "Unable to get location, please ensure that location is enabled"
              break

            }
            this.setState({
              locationErrorMessage : errMsg,
              currentLocation: {},
            })
            this.props.endLoadingNearByDealer()

          }, {
            enableHighAccuracy: false,
            timeout: 7000,
            maximumAge: 5000
          })
      }

    }
    this.setState({
      isGeoActive : np.isGeoActive,
    })
  }

  componentWillMount() {
    //this.props.getDealerList(this.parseDealerList)
    //this.props.getNearbyDealers(null,null)
    navigator.geolocation.getCurrentPosition(position => {
      let currLoca = { lat: position.coords.latitude, lng: position.coords.longitude }
      //let currLoca = { lat: 41.015137, lng: 28.979530 }

        this.setState({
          currentLocation: currLoca,
          hasLocation: true,
          //loadNear : false,
        })
        console.log("gotten pos", currLoca);
        this.searchNearbyDealer(currLoca)

      });
  }

  componentWillUnmount(){
    console.log("unmount delare");
    this.props.selectDealer(null)
    this.props.clearDealers()
  }

  componentDidMount() {
    console.log("did mount for locate dealer");
   
    let cTime = moment().toDate().getTime()
    if(cTime - this.props.cityListLastLoaded > timeWaitToReload){
      console.log(cTime, this.props.cityListLastLoaded, timeWaitToReload);
      this.props.getCitylist(cTime)
    }
    
     
   


    //this.props.getDealerList(this.parseDealerList)
  }

  shouldComponentUpdate(nextProps, nextState) {


    // console.log("this:",this.state.currentLocation.lat)
    // console.log("next:",nextState.currentLocation.lat)
    if(nextState.currentLocation.lat !== this.state.currentLocation.lat){
      console.log("location acquired, refresh dealer list", nextState.currentLocation)
      //this.props.getNearbyDealers(this.parseDealerList,nextState.currentLocation)
    }
    return true
  }



  onIconClick(id) {
    // console.log("onIconClick id:",id)
    // this.setState({
    //   activeWorkshop: id,
    // })
  }

  parseDealerList() {
    // if(this.state.hasLocation !== false) {
    //   let geocoder = new google.maps.Geocoder()
    //   let locationResults = this.props.dealerList.map(dealer => {
    //     let lat = parseFloat(dealer.Latitude)
    //     let lng = parseFloat(dealer.Longitude)
    //     let id = dealer.WorkshopId
    //     return {
    //       id,
    //       lat,
    //       lng,
    //     }
    //   })
    //   let distancePromises = locationResults.map(location =>
    //     this.distanceWithPromise({
    //       'origins': [{lat: location.lat,lng: location.lng}],
    //       'destinations': [this.state.currentLocation],
    //       'travelMode': 'DRIVING'
    //     })
    //   )
    //
    //   Promise.all(distancePromises).then(values => {
    //     console.log("google promises",values);
    //     let distanceResults = values.map((item) => {
    //       if(item.rows[0].elements[0].distance && item.rows[0].elements[0].duration){
    //         return {
    //           distance: item.rows[0].elements[0].distance.text,
    //           duration: item.rows[0].elements[0].duration.text,
    //         }
    //       } else return
    //     })
    //     // this.props.loadingSuccess()
    //     let resultList = []
    //     distanceResults.forEach((distanceObj,index) => {
    //       let resultInfo = {
    //         workshopId: locationResults[index].id,
    //         distance: typeof(distanceObj) !== 'undefined' ? distanceObj.distance : -1,
    //         duration: typeof(distanceObj) !== 'undefined' ? distanceObj.duration : 'NA',
    //       }
    //       resultList.push(resultInfo)
    //     })
    //
    //     // this.setState({
    //     //   distanceList: resultList,
    //     // })
    //   })
    //
    // }
  }

  geocodeWithPromise(data,geocoder) {
    let promise = new Promise(function(resolve,reject) {
      geocoder.geocode(data, function (results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
              resolve(results[0].geometry.location, status)
          } else {
              reject(status)
          }
      })
    })
    return promise
  }

  distanceWithPromise(data) {
    let promise = new Promise((resolve,reject) => {
      let distanceService = new google.maps.DistanceMatrixService()
      distanceService.getDistanceMatrix(data, (results, status) => {
          if (status == 'OK') {
              resolve(results, status)
              this.props.loadingSuccess()
          } else {
              reject(status)
              this.props.loadingFail()
          }
      })
    });
    return promise
  }

  searchLocation(term) {
    // let geocoder = new google.maps.Geocoder()
    // let searchLocationPromise = this.geocodeWithPromise({ 'address': term, 'region': 'TR' },geocoder)
    // searchLocationPromise.then(latlng => {
    //   let lat = latlng.lat()
    //   let lng = latlng.lng()
    //   this.setState({
    //     searchedLocation: { lat: lat, lng: lng },
    //     activeWorkshop: 0,
    //   })
    // })
  }

  gotoCurrentLocation() {
    this.setState({
      searchedLocation: this.state.currentLocation,
      activeWorkshop: 0,
    })
  }

  searchDealerInCity(city){
    this.setState({
      lookingAt : 1,
    })
    this.props.searchDealer(this.parseDealerList, city)
  }

  searchNearbyDealer(loc){
    
    console.log("inside search nearby dealer ");
    console.log(loc)
    if(loc){
     
      console.log("inside first condition");
      let shouldFindNearBy = this.checkDistanceWithBaseLoc(this.props.nearbyDealerListBase, loc, 0.5)
      console.log("shouldFindNearBy", shouldFindNearBy);
      if(shouldFindNearBy){
        this.props.getNearbyDealers(this.parseDealerList,loc)
      }else{
        this.props.endLoadingNearByDealer()
      }
    } else if(this.state.hasLocation) {
      console.log("inside seconds condition");
   
      let shouldFindNearBy = this.checkDistanceWithBaseLoc(this.props.nearbyDealerListBase, this.state.currentLocation, 0.5)
      if(shouldFindNearBy){
        this.props.getNearbyDealers(this.parseDealerList,this.state.currentLocation)
      }else{
        console.log("inside last condition");
        this.props.endLoadingNearByDealer()
      }

    } else {
      console.log("location not available, cannot search nearby dealer")
      // if location service is disabled, do not show any dealer
      this.props.getNearbyDealers(null,null)
    }

    this.setState({
      lookingAt : 0,
    })

  }

  toRad(Value) {
    return Value * Math.PI / 180;
  }

  checkDistanceWithBaseLoc(base, curr, distanceRequired){
    if(base == null || curr == null){
      return true
    }
    let lat1 = base.lat
    let lon1 = base.lng
    let lat2 = curr.lat
    let lon2 = curr.lng
    let R = 6371e3; 
    let φ1 = this.toRad(lat1);
    let φ2 = this.toRad(lat2);
    let Δφ = this.toRad(lat2-lat1)
    let Δλ = this.toRad(lon2-lon1)

    let a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    let d = R * c;
    if(d > distanceRequired){
      return true
    }
    return false
  }

  render() {
    setTimeout(
      function() {
     
      }
      .bind(this),
      2000
  );
    console.log("is active?", this.props.isGeoActive);
    console.log("Locate dealer current location:", this.state.currentLocation)
    return (
        <div className="LocateDealer" style={{width:"100%", height:"100%","background":"white", display:this.props.active?"block":"none"}}>
          {typeof(this.props.isSettingMode) === 'undefined' ?
            <BookingProgressBar
             title = {T.translate(`booking.workshop.title`)}
             currentStage = {0}
             latestStage = {this.props.latestStage}
             switchStage = {this.props.switchStage}
            /> : ''
          }
          <div className={typeof(this.props.isSettingMode) === 'undefined' ? "dealer-list-container" : "dealer-list-container-alt"}>
            { this.props.isLoadingNearBy || this.props.isInitLoading ?
              <Loadable
                active={true}
                spinner={true}
                animate
                style={{position:"absolute", display: "flex"}}
              />
              :
              null
            }
            <FilterableTableContainer
              lookingAt={this.state.lookingAt}
              onItemSelect={this.onIconClick}
              distanceList={this.state.distanceList}
              gotoCurrentLocation={this.gotoCurrentLocation}
              currentLocation={this.state.currentLocation}
              hasLocation ={this.state.hasLocation}
              onIconClick={this.onIconClick}
              citylist={this.props.citylist}
              searchDealerInCity={this.searchDealerInCity}
              searchNearbyDealer={this.searchNearbyDealer}
              isSettingMode={this.props.isSettingMode}
              settingPageForward={this.props.settingPageForward}
            />
          </div>
        </div>
    )
  }
}

LocateDealer.contextTypes = {
  router: React.PropTypes.object.isRequired
}


function mapStateToProps(state) {
  return {
    isLoadingNearBy : state.dealer.isLoadingNearBy,
    nearbyList : state.dealer.nearbyDealerList,
    nearbyDealerListBase : state.dealer.nearbyDealerListBase,
    dealerList: state.dealer.all,
    latestStage: state.booking.latestStage,
    citylist: state.dealer.citylist,
    cityListLastLoaded : state.dealer.cityListLastLoaded,
  }
}

export default connect(mapStateToProps, { endLoadingNearByDealer, startLoadingNearByDealer, clearDealers, getDealerList, getNearbyDealers, loadingStart, loadingFail, loadingSuccess, updateStage, getCitylist, searchDealer, selectDealer })(LocateDealer)
