import React, { Component, PropTypes } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import * as moment from 'moment'
import 'moment/locale/pt-br'
import { logout } from '../../actions/initialAction'
import T from 'i18n-react'
import GoogleMap from 'google-map-react'
import { Transition } from 'react-transition-group'
import { FadeTransitionContainer, FadeTransitionContainer2, fadeDuration, transitionfadeStyles, fixFadeStyle, transitUpStyles, transitUpStyle, transitUpDuration } from './transitions'
import WebDisplay from '../../components/CIAM/WebDisplay'
import TopBar from '../../components/TopBar'
import Loadable from 'react-loading-overlay'
import { initPrefix, fReloadContent } from '../../actions/initialAction'
import { showLegal, hideLegal } from '../../actions/legalAction'
import { selectLanguage } from '../../actions/languageAction'
import { selectDate, selectService, updateStage, setCurrentStage } from '../../actions/bookingAction'
import { fetchModels } from '../../actions/vehicleAction'
import { selectDealer, selectAgent } from '../../actions/dealerActions'
import { dismissWebview, showWebview } from '../../actions/webDisplayAction'
import { loadingEnd, loadingStart } from '../../actions/loadingActions'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import { fetchAccessories, fetchCollections } from '../../actions/productsActions'
import { fetchCampaigns, fetchOthers } from '../../actions/campaignActions'
import { updateMainTab } from '../../actions/mainTabsActions'

import { getAppointment } from '../../actions/appointmentActions'

import { enablePushNotification, updatePushToken } from '../../actions/pushNotification'

import VehicleMain from '../VehicleMain'
import ProductsMain from '../ProductsMain'
import ProfileMain from '../ProfileMain'
import ContactUsMain from '../ContactUsMain'
import NewsMain from '../NewsMain'

import VehicleRegistration from '../VehicleRegistration'
import VehicleUpdateDetails from '../ProfileMain/VehicleUpdateDetails'
import StatusTracker from '../StatusTracker'

import LeadDetailContainer from '../../containers/LeadDetailContainer'

import NewAppointmentMain from '../NewAppointmentMain'
import LegalTermPage from '../LegalTerm'
import Login from '../Login'
import DealerSettingContainer from '../../containers/DealerSettingContainer'

import { timeWaitToReload, timeToRelogin } from '../../config'

import { initImageCache } from '../../cache'

import FastClick from 'fastclick'

import './App.css'

const ModalTopBar = (backButtonEvent, infoButtonEvent, dismissModalEvent) => {

  var title = ""
  var type = ""
  var showBackButton = false
  var showExitButton = true

  return (
    <TopBar
      type={type}
      title={title}
      onClickBack={backButtonEvent}
      onClickInfo={infoButtonEvent}
      onClickClose={dismissModalEvent}
      showBackButton={showBackButton}
      showExitButton={showExitButton}
      showLegalTermButton={true}
      modalType="booking"
    />)
}

class App extends Component {
  constructor(props) {
    super(props)

    console.log("APP constructor")
    console.log("hahah");

    console.log(props.isPushNotificationEnabled);
    this.state = {
      previousLoginFlag: false,
      isPreviousLoginFlag: false,
      isHidelegalButtons: false,
      isDeviceLevelLoading: true,
      deviceType: 0,
      isPNenabled: props.isPushNotificationEnabled,
      navState: 3,
      modalType: "",
      showModal: false,
      showLogin: false,
      showCampaigns: false,
      showOtherEvents: false,
      showAccessories: false,
      showCollections: false,
      selectedAccId: -1,
      selectedColId: -1,
      selectedCampaignId: -1,
      selectedOtherEventId: -1,
      isShowStatusTracker: false,
      pushNotificationController: null,
      isShowNewAppointmentMain: false,
      isAdobeAnalyticsEnabled: false,
    }

    this.generatedTopBar = this.generateTopBar(8)
    props.initPrefix()

    this.initPushNotification = this.initPushNotification.bind(this)
    this.enablePushNotificaiton = this.enablePushNotificaiton.bind(this)

    axios.defaults.headers.common['Authorization'] = `Bearer ${props.token}`
    this.showModal = this.showModal.bind(this)
    this.showVehUpdateModal = this.showVehUpdateModal.bind(this)

    this.showAccessoriesPage = this.showAccessoriesPage.bind(this)
    this.hideAccessoriesPage = this.hideAccessoriesPage.bind(this)
    this.showCollectionsPage = this.showCollectionsPage.bind(this)
    this.hideCollectionsPage = this.hideCollectionsPage.bind(this)
    this.showCampaignPage = this.showCampaignPage.bind(this)
    this.hideCampaignPage = this.hideCampaignPage.bind(this)

    this.showOtherEventsPage = this.showOtherEventsPage.bind(this)
    this.hideOtherEventsPage = this.hideOtherEventsPage.bind(this)

    this.hideStatusTracker = this.hideStatusTracker.bind(this)
    this.showStatusTracker = this.showStatusTracker.bind(this)

    this.closeNewBookingModal = this.closeNewBookingModal.bind(this)

    this.closeModal = this.closeModal.bind(this)
    this.handleClickBackBtn = this.handleClickBackBtn.bind(this)
    this.handleClickInfoBtn = this.handleClickInfoBtn.bind(this)
    this.dismissModal = this.dismissModal.bind(this)
    this.notificationCallback = this.notificationCallback.bind(this)
    this.jailBreakCallback = this.jailBreakCallback.bind(this)
    this.onResume = this.onResume.bind(this)
    this.onPause = this.onPause.bind(this)
    this.onBackKeyDown = this.onBackKeyDown.bind(this)

    this.timeAwayStart = null

    this.onDeviceReady = this.onDeviceReady.bind(this)
    this.tryLoadCatalog = this.tryLoadCatalog.bind(this)

    this.modalTopBar = ModalTopBar(this.handleClickBackBtn, this.handleClickInfoBtn, this.dismissModal)

    if (window.jailbreakdetection) {
      window.jailbreakdetection.isJailbroken(
        result => {
          if (result) {
            // console.log('jailBroken: ' + result)
            navigator.notification.confirm(
              'Your device is jailbroken. Do you want to continue to use this app?',         // message
              this.jailBreakCallback, // callback
              'Jailbreak detection',           // title
              ['Yes', 'Exit'] // buttonName
            )
          }
        },
        err => console.error(err)
      )
    }
  }

  mobilecheck() {
    if (navigator.userAgent.match(/Android/i)) {

      return "android"
    }
    else {
      if (navigator.userAgent.match(/iPhone/i)) {
        return "ios"
      }
    }
  };

  showPermission() {
    cordova.plugins.deneme.permissionCheck("Analytic Data Permission Checking", function (response) {
      console.log(response)
      return response
    }, function (error) {
      console.log(error);
      return error
    });
  }

  enablePushNotificaiton() {
    console.log("enable push notification lvl 1");
    this.props.enablePushNotification()
  }

  initPushNotification(mSelf) {
    console.log("init push notification");
    if (typeof PushNotification != 'undefined') {
      var push = PushNotification.init({
        android: {
          senderID: "480395107743",
          clearBadge: true,
          sound: true,
          clearNotifications: true,
        },
        browser: {
          pushServiceURL: 'http://push.api.phonegap.com/v1/push'
        },
        ios: {
          alert: "true",
          badge: "true",
          sound: "true",
          clearBadge: "true",
        },
        windows: {}
      })

      push.on('registration', function (data) {
        console.log("push notification register");

        window.registerID = data.registrationId
        mSelf.props.updatePushToken({ token: data.registrationId, isLogin: mSelf.props.isLogin })
        console.log(window.registerID);
      })

      let appCallback = (res) => {

        console.log("app call back", res);

        try {
          let appointment = res.data
          if (appointment) {
            if (appointment.Service) {
              if (appointment.Service.ServiceStatuses[1] && appointment.Service.ServiceStatuses[6]) {
                var mins = Math.round(moment.default(appointment.Service.ServiceStatuses[6].TimeStamp).diff(moment.default(appointment.Service.ServiceStatuses[1].TimeStamp)) / (1000 * 60))


                if (this.mobilecheck() === "android") {
                  cordova.plugins.deneme.permissionCheck("permissionCheck", function (response) {


                    /*if(window.ADB && response==="PermissionIsOpen"){
                      window.ADB.trackAction('Service Completed', {'serviceduration':mins})
                     }*/

                    if (this.mobilecheck() === "android") {
                      cordova.plugins.deneme.permissionCheck("permissionCheck", function (response) {


                        if (window.ADB && response === "PermissionIsOpen") {
                          window.ADB.trackAction('Service Completed', { 'serviceduration': mins })
                        }

                      });

                    }


                  });

                }
                if (this.mobilecheck() === "ios") {
                  cordova.plugins.perm.permCheck("permCheck", function (response) {


                    /*if(window.ADB && response==="PermissionIsOpen"){
                      window.ADB.trackAction('Service Completed', {'serviceduration':mins})
                     }*/

                    if (this.mobilecheck() === "ios") {
                      cordova.plugins.perm.permCheck("permCheck", function (response) {


                        if (window.ADB && response === "True") {
                          window.ADB.trackAction('Service Completed', { 'serviceduration': mins })
                        }

                      });

                    }

                  });

                }


              }
            }
          }
        } catch (err) {
          console.log(err);
        }
      }

      let registerCallback = (data) => {
        console.log('notification event')
        console.log(JSON.stringify(data));

        mSelf.props.fetchCampaigns(moment.default().toDate().getTime())
        mSelf.props.fetchOthers(moment.default().toDate().getTime())
        mSelf.props.fetchAccessories(moment.default().toDate().getTime())
        mSelf.props.fetchCollections(moment.default().toDate().getTime())

        navigator.notification.alert(
          data.message,         // message
          mSelf.notificationCallback, // callback
          data.title,           // title
          'OK'                  // buttonName
        )

        console.log(data.additionalData.acmecategory);
        console.log(data.additionalData.acmevalue);
        if (data.additionalData) {
          if (data.additionalData.acmecategory) {
            console.log(data.additionalData.acmecategory);

            if (data.additionalData.acmecategory === "Handover" && window.ADB) {
              if (data.additionalData.acmevalue) {
                console.log("log window ga");

                //getAppointment(data.additionalData.acmevalue, appCallback)

                var appointment
                mSelf.props.vehList.find(veh => {
                  appointment = veh.Appointments.find(app => {
                    if (app.AppointmentId === data.additionalData.acmevalue) {
                      return true
                    }
                  })
                  if (appointment) {
                    console.log(appointment);
                    return true
                  }
                })

                if (appointment) {
                  console.log("there is appointment");
                } else {
                  console.log("there is no appointment");
                }

                if (appointment) {
                  //console.log(appointment);
                  if (appointment.Service) {
                    if (appointment.Service.ServiceStatuses[1] && appointment.Service.ServiceStatuses[6]) {
                      var mins = Math.round(moment.default(appointment.Service.ServiceStatuses[6].TimeStamp).diff(moment.default(appointment.Service.ServiceStatuses[1].TimeStamp)) / (1000 * 60))
                      
                      // if(window.ADB){
                      //   window.ADB.trackAction('servicecompleted', {'serviceduration':mins})
                      // }


                      if (this.mobilecheck() === "android") {
                        cordova.plugins.deneme.permissionCheck("permissionCheck", function (response) {


                          if (window.ADB && response === "PermissionIsOpen") {
                            window.ADB.trackAction('servicecompleted', { 'serviceduration': mins })
                          }

                        });

                      }
                      if (this.mobilecheck() === "ios") {
                        cordova.plugins.perm.permCheck("permCheck", function (response) {


                          /*if(window.ADB && response==="PermissionIsOpen"){
                            window.ADB.trackAction('Service Completed', {'serviceduration':mins})
                           }*/




                          if (window.ADB && response === "True") {
                            window.ADB.trackAction('Service Completed', { 'serviceduration': mins })
                          }





                        });

                      }

                    }
                  }
                }

              }
            }

          }
        }
      }

      push.on('notification', registerCallback)

      push.on('error', (e) => {
        console.log(e.message)
      })

      mSelf.setState({
        pushNotificationController: push
      })

    }
  }

  jailBreakCallback(index) {
    switch (index) {
      case 0:
        break
      case 1:
        console.warn('Risky environment detected')
        this.props.logout()
        break
      default:
        break
    }
  }

  notificationCallback() {
    if (this.props.isLogin) {
      this.props.fReloadContent(true)
    }
    if (window.push) {
      window.push.clearAllNotifications(function () {
        console.log('clear noti');
      }, function () {
        console.log('clear noti error');
      });

      window.push.setApplicationIconBadgeNumber(function () {
        console.log('success set to 0');
      }, function () {
        console.log('error');
      }, 0);

    }
  }

  onBackKeyDown() {
    // Handle the back button
    console.log("back button down down down");

    if (this.props.isShowLegal) {
      this.props.hideLegal()
      
    } else if (this.state.showModal) {
      switch (this.state.modalType) {
        case "vehicleEdit":
          this.closeModal()
          break
        case "vehicleRegister":
          this.closeModal()
          break
        case "bookingAdd":
          this.closeNewBookingModal()
          break
        case "settingAddPre":
          this.closeModal()
          break
      }
    } else {
      var trigger = false
      switch (this.props.mainTabState) {
        case 1:
          if (this.state.showCampaigns) {
            this.hideCampaignPage()
          } else if (this.state.showOtherEvents) {
            this.hideOtherEventsPage()
          }
          break
        case 2:
          if (this.state.showAccessories) {
            this.hideAccessoriesPage()
          } else if (this.state.showCollections) {
            this.hideCollectionsPage()
          }
          break
        case 3:
          if (this.state.isShowStatusTracker) {
            this.hideStatusTracker()
          }
          break
      }
    }

  }

  onPause() {
    console.log("system pause or away");
    this.timeAwayStart = moment.default()
    /*if(window.ADB){
      window.ADB.trackTimedActionStart("minimizeapp")
    }*/

    if (this.mobilecheck() === "android") {
      cordova.plugins.deneme.permissionCheck("permissionCheck", function (response) {


        if (window.ADB && response === "PermissionIsOpen") {
          window.ADB.trackTimedActionStart("minimizeapp")
        }

      });

    }
    if (this.mobilecheck() === "ios") {
      cordova.plugins.perm.permCheck("permCheck", function (response) {




        if (window.ADB && response === "True") {
          window.ADB.trackAction('Service Completed', { 'serviceduration': mins })
        }





      });

    }


  }





  onResume() {

    /*if(window.ADB){
      window.ADB.trackTimedActionEnd("minimizeapp")
    }*/

    if (this.mobilecheck() === "android") {
      cordova.plugins.deneme.permissionCheck("permissionCheck", function (response) {


        if (window.ADB && response === "PermissionIsOpen") {
          window.ADB.trackTimedActionEnd("minimizeapp")
        }

      });

    }

    console.log("appResumeCallback")
    if (this.props.isLogin) {
      if (this.props.lastLoginTime !== null) {

        // if(moment.default().toDate().getTime() - this.props.lastLoginTime > timeToRelogin){
        //   this.props.showWebview('inv_login')
        // }else{
        //   //reload user items
        //   this.props.fReloadContent(true)
        // }

        this.props.fReloadContent(false)

      }

      if (this.timeAwayStart !== null) {
        var duration = moment.default().diff(this.timeAwayStart, 'minutes')
        if (duration > 0) {
          /*if(window.ADB){
          window.ADB.trackState('time in back ground', {'duration':duration})
          }
*/
          if (this.mobilecheck() === "android") {
            cordova.plugins.deneme.permissionCheck("permissionCheck", function (response) {


              if (window.ADB && response === "PermissionIsOpen") {
                window.ADB.trackState('time in back ground', { 'duration': duration })
              }

            });

          }

        }
        this.timeAwayStart = null
      }
    }

    if (window.push) {
      window.push.clearAllNotifications(function () {
        console.log('success clear badges');
      }, function () {
        console.log('error');
      });

      window.push.setApplicationIconBadgeNumber(function () {
        console.log('success set to 0');
      }, function () {
        console.log('error');
      }, 0);
    }
  }

  onDeviceReady() {

    console.log("deviceReadyCallback")
    initImageCache(this.callBackImageCacheInit.bind(this))


    console.log(JSON.stringify(window.ADB));


    console.log("status");
    console.log(StatusBar);
    console.log(JSON.stringify(StatusBar));
    if (device.platform.toLowerCase() === "ios") {
      console.log("i'm ios");
      console.log("is natofication enabled ?");
      console.log(this.props.isPushNotificationEnabled);
      //console.log("hiding status bar");
      //StatusBar.show();
      console.log("asdf");
      //StatusBar.styleBlackTranslucent();
      //StatusBar.styleBlackOpaque();
      StatusBar.backgroundColorByName("black");
      StatusBar.show();
    }

    if (device.platform.toLowerCase() === "ios") {
      this.setState({
        deviceType: 2
      })
    } else if (device.platform.toLowerCase() === "android") {
      this.setState({
        deviceType: 1
      })
    }

    if (this.props.isPushNotificationEnabled) {
      this.initPushNotification(this)
    }
  }

  componentWillReceiveProps(nextProps) {

    if (nextProps.isPushNotificationEnabled && !this.state.isPNenabled) {
      this.setState({
        isPNenabled: true
      })
      this.initPushNotification(this)
    }

    if (nextProps.isLogin != this.state.previousLoginFlag) {

      this.setState({
        previousLoginFlag: nextProps.isLogin,
        isPreviousLoginFlag: true,
      })

      setTimeout(() => {
        this.setState({
          isPreviousLoginFlag: false
        })
      }, 3000)

    }

  }

  handleClickInfoBtn() {
    this.props.showLegal()
  }

  dismissModal(modalType) {
    switch (modalType) {
      case "booking":
        this.props.selectService({})
        this.props.selectAgent(null)
        this.props.selectDealer(null)
        this.props.selectDate(null)
        this.props.updateStage(0)
        break
      default:
        break
    }
    this.closeModal();
  }

  componentWillUnmount() {
    console.log("app unmount");
    document.removeEventListener("deviceready", this.onDeviceReady, false)
  }

  callBackImageCacheInit() {
    this.setState({
      isDeviceLevelLoading: false,
    })
  }

  componentWillMount() {
    document.addEventListener("deviceready", this.onDeviceReady, false)
    document.addEventListener("pause", this.onPause, false)
    document.addEventListener("resume", this.onResume, false)
    document.addEventListener("backbutton", this.onBackKeyDown, false)
  }

  componentDidMount() {


    if ('addEventListener' in document) {
      document.addEventListener('DOMContentLoaded', function () {
        FastClick.attach(document.body);
      }, false);
    }

    console.log("mounting App once");
    if (this.props.loading.status === 0) {
      //dismiss any loading view
      // console.log(this.props)
      this.props.loadingEnd()
    }

    console.log(window.innerHeight);
    console.log(window.screen.height);

    //document.body.setAttribute("height",window.innerHeight+"px")
    //document.getElementById('root').style.height = window.innerHeight+"px"
    //document.getElementById('aniamtionFrame').style.height = window.innerHeight+"px"

    window.addEventListener("resize",
      function () {
        console.log("resize happen here");
        console.log(window.innerHeight);
        console.log(window.screen.height);
        //document.body.setAttribute("height",window.innerHeight+"px")
        console.log(document.activeElement.tagName);
        if (document.activeElement.tagName == "INPUT" || document.activeElement.tagName == "IFRAME" || document.activeElement.tagName == "TEXTAREA") {
          console.log("its here now");
          window.setTimeout(function () {
            document.activeElement.scrollIntoViewIfNeeded()
          }, 0)
        }
      })


    document.addEventListener("deviceready", this.onDeviceReady, false)
    document.addEventListener("pause", this.onPause, false)
    document.addEventListener("resume", this.onResume, false)
    document.addEventListener("backbutton", this.onBackKeyDown, false)

    this.props.selectService({})
    this.props.selectAgent(null)
    this.props.selectDealer(null)
    this.props.selectDate(null)
    this.props.updateStage(0)
    this.props.loadingEnd()

    if (typeof (cordova) === 'undefined') {
      initImageCache(this.callBackImageCacheInit.bind(this))
    }

  }

  tryLoadCatalog() {
    var currentTime = moment.default().toDate().getTime()
    if (currentTime - this.props.catalogLastLoaded > timeWaitToReload) {
      this.props.fetchModels(moment.default().toDate().getTime())
    }
  }

  switchMains(mainType) {
    switch (mainType) {
      case 1: {
        var currentTime = moment.default().toDate().getTime()
        if (currentTime - this.props.campaignsLastLoaded > timeWaitToReload) {
          this.props.fetchCampaigns(moment.default().toDate().getTime())
        }
        if (currentTime - this.props.othersLastLoaded > timeWaitToReload) {
          this.props.fetchOthers(moment.default().toDate().getTime())
        }

        if (this.mobilecheck() === "android") {
          cordova.plugins.deneme.permissionCheck("permissionCheck", function (response) {


            if (window.ADB && response === "PermissionIsOpen") {
              window.ADB.trackState("MB World")
            }


            //alert("Metod->"+response);
            //this.setState({status:response})
            //return ""+response;
          });


          //alert(navigator.permissionCheck())
        }

        if (this.mobilecheck() === "ios") {
          cordova.plugins.perm.permCheck("permCheck", function (response) {
            

            if (window.ADB && response === "True") {
              window.ADB.trackState("MB World")
            }
          });
        }

        break
      }
      case 2: {
        var currentTime = moment.default().toDate().getTime()
        if (currentTime - this.props.collectionsLastLoaded > timeWaitToReload) {
          this.props.fetchCollections(moment.default().toDate().getTime())
        }
        if (currentTime - this.props.accessoriesLastLoaded > timeWaitToReload) {
          this.props.fetchAccessories(moment.default().toDate().getTime())
        }

        /*if(window.ADB){
          window.ADB.trackState("products")
        }*/

        if (this.mobilecheck() === "android") {
          cordova.plugins.deneme.permissionCheck("permissionCheck", function (response) {


            if (window.ADB && response === "PermissionIsOpen") {
              window.ADB.trackState("products")
            }

          });

        }

        break
      }
      case 3: {
        var currentTime = moment.default().toDate().getTime()
        if (currentTime - this.props.vehListLastUpdated > timeWaitToReload) {
          this.props.fReloadContent(false)
        }

        /*if(window.ADB){
          window.ADB.trackState("landing")
        }*/

        if (this.mobilecheck() === "android") {
          cordova.plugins.deneme.permissionCheck("permissionCheck", function (response) {


            if (window.ADB && response === "PermissionIsOpen") {
              window.ADB.trackState("landing")
            }

          });

        }

        break;
      }
      case 4: {
        /*if(window.ADB){
          window.ADB.trackState("profile")
        }*/

        if (this.mobilecheck() === "android") {
          cordova.plugins.deneme.permissionCheck("permissionCheck", function (response) {


            if (window.ADB && response === "PermissionIsOpen") {
              window.ADB.trackState("profile")
            }

          });

        }

        break;
      }
      case 5: {
        /*if(window.ADB){
          window.ADB.trackState("contact us")
        }*/

        if (this.mobilecheck() === "android") {
          cordova.plugins.deneme.permissionCheck("permissionCheck", function (response) {


            if (window.ADB && response === "PermissionIsOpen") {
              window.ADB.trackState("contact us")
            }

          });

        }

        break;
      }
    }

    //this.setState({navState : mainType})
    this.props.updateMainTab(mainType)
  }

  closeNewBookingModal() {

    this.setState({
      showModal: false,
      modalType: ""
    })
  }

  closeModal() {
    this.setState({
      showModal: false,
      modalType: ""
    })
  }

  showModal(value) {
    if (value === "bookingAdd") {
      console.log("showmodal here");
      // this.props.selectService({})
      // this.props.selectAgent(null)
      // this.props.selectDealer(null)
      // this.props.selectDate(null)
      // this.props.updateStage(0)
      // this.props.setCurrentStage(0)
    }

    this.setState({
      showModal: true,
      modalType: value
    })
  }

  showVehUpdateModal(value, vehID) {
    this.setState({
      updateVehId: vehID
    })
    this.showModal(value)

  }

  handleClickBackBtn() {
    console.log("button access here");
    this.context.router.goBack()
  }

  showAccessoriesPage(itemid) {
    this.setState({
      showAccessories: true,
      selectedAccId: itemid,
    })
  }

  hideAccessoriesPage() {
    this.setState({
      showAccessories: false,
    })
  }

  showCollectionsPage(itemid) {
    this.setState({
      showCollections: true,
      selectedColId: itemid,
    })
  }

  hideCollectionsPage() {
    this.setState({
      showCollections: false,
    })
  }

  showCampaignPage(itemid) {
    this.setState({
      showCampaigns: true,
      selectedCampaignId: itemid,
    })
  }

  hideCampaignPage() {
    this.setState({
      showCampaigns: false,
    })
  }

  showOtherEventsPage(itemid) {
    this.setState({
      showOtherEvents: true,
      selectedOtherEventId: itemid,
    })
  }

  hideOtherEventsPage() {
    this.setState({
      showOtherEvents: false,
    })
  }

  showStatusTracker() {
    this.setState({
      isShowStatusTracker: true,
    })
  }

  hideStatusTracker() {
    this.setState({
      isShowStatusTracker: false,
    })
  }

  generateTopBar(value) {
    var title = ""
    var type = "mainmenu"
    var showBackButton = false
    var showExitButton = true

    if (value == 0) {
      title = ""
      type = "login"
      showBackButton = false
      showExitButton = false

      return (
        <TopBar
          type={type}
          title={title}
          onClickBack={null}
          onClickInfo={() => {
            this.setState({
              isHidelegalButtons: true
            })
            this.handleClickInfoBtn()
          }}
          onClickClose={() => {
            this.setState({
              isHidelegalButtons: false
            })
            this.dismissModal()
          }}
          showBackButton={showBackButton}
          showExitButton={showExitButton}
          showLegalTermButton={true}
          modalType="booking"
        />)

    }

    if (value == 1) {
      title = T.translate("mb world.title")
      type = "vehiclemain"
    }
    if (value == 2) {
      title = T.translate("products.title")
      type = "vehiclemain"
    }
    if (value == 3) {
      type = "vehiclemain"
    }
    if (value == 4) {
      title = T.translate("profile.title")
      type = "vehiclemain"
    }
    if (value == 5) {
      title = T.translate("contactus.title")
      type = "vehiclemain"
    }

    if (value == 6) {
      //modal
      type = ""
    }

    if (value == 7) {
      title = "Product"
      type = ""
      showBackButton = true
      showExitButton = false
    }

    if (value == 8) {
      title = ""
      type = "login"
      showBackButton = false
      showExitButton = true

      return (
        <TopBar
          type={type}
          title={title}
          onClickBack={null}
          onClickInfo={() => {

            //this.props.dismissWebview()
            this.setState({
              isHidelegalButtons: true
            })
            this.handleClickInfoBtn()
          }}
          onClickClose={() => {
            this.props.dismissWebview()
          }}
          showBackButton={showBackButton}
          showExitButton={showExitButton}
          showLegalTermButton={true}
          modalType="booking"
        />)

    }

    return (
      <TopBar
        type={type}
        title={title}
        onClickBack={this.handleClickBackBtn}
        onClickInfo={this.handleClickInfoBtn}
        onClickClose={this.dismissModal}
        showBackButton={showBackButton}
        showExitButton={showExitButton}
        showLegalTermButton={true}
        modalType="booking"
      />)
  }

  render() {




    let topbar_gen = this.generateTopBar(1)
    // console.log("App: webviewStatus ", this.props.webviewStatus)
    if (this.props.selectedLanguage === "ENGLISH") {
      T.setTexts(require('../../locales/locales_en.yml'))
      moment.locale('en')
    } else if (this.props.selectedLanguage === "TURKISH") {
      T.setTexts(require('../../locales/locales_tur.yml'))
      moment.locale('tr')
    } else {
      T.setTexts(require('../../locales/locales_en.yml'))
      moment.locale('en')
    }

    let text = ''
    let color = 'white'
    switch (this.props.loading.status) {
      case 0:
        text = ''
        color = 'white'
        break
      case 1:
        text = this.props.loading.message
        color = 'white'
        break
      case 2:
        text = this.props.loading.message
        color = 'white'
        break
      case 3:
        break
    }

    return (
      <MuiThemeProvider>
        <div className="App">

          <Loadable
            active={this.props.loading.status !== 3 || this.state.isPreviousLoginFlag}
            spinner={this.props.loading.status === 0}
            animate
            text={text}
            color={color}
            style={{ position: "none", display: this.props.loading.status !== 3 ? "flex" : "none" }}
          />

          <Transition
            in={this.props.isShowLegal || (!this.props.isLogin && this.props.isFirstTimeOnApp)}
            mountOnEnter={false}
            unmountOnExit={false}
            timeout={transitUpDuration}>
            {(state) => {
              return (
                <div style={{
                  ...transitUpStyle,
                  ...transitUpStyles[state],
                  zIndex: "20",
                }}>
                  <LegalTermPage
                    showLogin={() => {
                      //alert("TermPage Opening...");
                      this.setState({ showLogin: true })
                      console.log("TermPage");
                    }}
                    hideButtons={this.state.isHidelegalButtons}
                    initNoti={this.enablePushNotificaiton}
                    deviceType={this.state.deviceType}
                    isShowLegal={this.props.isShowLegal}
                    transitionState={state}
                  />
                </div>
              )
            }}
          </Transition>

          <Transition
            in={this.props.webviewStatus === 'show'}
            mountOnEnter={true}
            unmountOnExit={true}
            timeout={transitUpDuration}>
            {(state) => {
              return (
                <div style={{
                  ...transitUpStyle,
                  ...transitUpStyles[state],
                  display: this.props.webviewType !== "inv_login" ? "flex" : "none"
                }}>
                  <WebDisplay
                    topbar={this.generatedTopBar}
                  />
                </div>
              )
            }}
          </Transition>

          <div id="aniamtionFrame" style={{ width: '100%', height: '100%' }} >

            <div style={{ width: '100%', height: '100%' }}>

              {(this.state.showLogin && !this.props.isLogin) || (!this.props.isFirstTimeOnApp && !this.props.isLogin) ?
                <div id="loginMaster" style={{ width: '100%', height: '100%', position: "fixed", top: "0", left: "0", zIndex: "21", backgroundColor: "black" }}>
                  <Login topbar={this.generateTopBar(0)} />
                </div>
                :
                null
              }

              {this.props.isLogin ?
                <div style={{ width: '100%', height: '100%' }}>
                  <div id="mainPageContainer">
                    <div style={{ width: '100%', height: 'calc(100% - var(--main-nav-height))', position: 'relative' }}>
                      <div id="aniamtionFrame_inner" style={{ width: '100%', height: '100%' }}>
                        <div style={{ zIndex: "-1" }}>
                          {this.generateTopBar(this.props.mainTabState)}
                        </div>
                        <div style={{ height: "calc(100% - var(--top-container-height))", position: "relative" }}>
                          <FadeTransitionContainer
                            in={this.props.mainTabState == 1}
                          >
                            {!this.state.isDeviceLevelLoading ?
                              <NewsMain key={"NewsMain"} selectedLanguage={this.props.selectedLanguage}
                                topbar={this.generateTopBar(1)} active={true}
                                showCampaign={this.showCampaignPage}
                                showOtherEvents={this.showOtherEventsPage}
                                currType={this.state.showCampaigns ? "campaign" : this.state.showOtherEvents ? "others" : "none"}>
                                <LeadDetailContainer
                                  type={"campaign"}
                                  selectedId={this.state.selectedCampaignId}
                                  topbar={this.generateTopBar(7)}
                                  backButton={this.hideCampaignPage}
                                  showSetPreferenceModal={() => {
                                    this.showModal("settingAddPre")
                                  }}
                                />
                                <LeadDetailContainer
                                  type={"others"}
                                  selectedId={this.state.selectedOtherEventId}
                                  topbar={this.generateTopBar(7)}
                                  backButton={this.hideOtherEventsPage}
                                  showSetPreferenceModal={() => {
                                    this.showModal("settingAddPre")
                                  }} />
                              </NewsMain>
                              :
                              <span />
                            }
                          </FadeTransitionContainer>

                          <FadeTransitionContainer
                            in={this.props.mainTabState == 2}
                          >
                            {!this.state.isDeviceLevelLoading ?
                              <ProductsMain
                                key={"ProductsMain"}
                                topbar={this.generateTopBar(2)}
                                active={true}
                                showAccessories={this.showAccessoriesPage}
                                showCollections={this.showCollectionsPage}
                                selectedLanguage={this.props.selectedLanguage}
                                currType={this.state.showAccessories ? "accessory" : this.state.showCollections ? "collection" : "none"}
                              >
                                <LeadDetailContainer
                                  type={"accessory"}
                                  selectedId={this.state.selectedAccId}
                                  topbar={this.generateTopBar(7)}
                                  backButton={this.hideAccessoriesPage}
                                  showSetPreferenceModal={() => {
                                    this.showModal("settingAddPre")
                                  }} />

                                <LeadDetailContainer
                                  type={"collection"}
                                  selectedId={this.state.selectedColId}
                                  topbar={this.generateTopBar(7)}
                                  backButton={this.hideCollectionsPage}
                                  showSetPreferenceModal={() => {
                                    this.showModal("settingAddPre")
                                  }} />

                              </ProductsMain>
                              :
                              <span />
                            }
                          </FadeTransitionContainer>

                          <FadeTransitionContainer2
                            in={this.props.mainTabState == 3}
                          >
                            {!this.state.isDeviceLevelLoading ?
                              <VehicleMain
                                key={"VehicleMain"}
                                topbar={this.generateTopBar(3)}
                                active={true}
                                showRegisterModal={() => {
                                  this.tryLoadCatalog()
                                  this.showModal("vehicleRegister")
                                }}
                                showStatusTracker={this.showStatusTracker}
                                showNewBookingModal={this.showModal.bind(this, "bookingAdd")}
                                isShowStatusTracker={this.state.isShowStatusTracker}
                              >
                                <StatusTracker
                                  topbar={this.generateTopBar(7)}
                                  backButton={this.hideStatusTracker}
                                />
                              </VehicleMain>
                              :
                              null
                            }
                          </FadeTransitionContainer2>

                          <FadeTransitionContainer
                            in={this.props.mainTabState == 4}
                          >
                            {!this.state.isDeviceLevelLoading ?
                              <ProfileMain
                                key={"ProfileMain"}
                                topbar={this.generateTopBar(4)}
                                active={true}
                                showVehEditModal={this.showVehUpdateModal.bind(this, "vehicleEdit")}
                                showSetPreferenceModal={() => {
                                  this.showModal("settingAddPre")
                                }}
                                selectedLanguage={this.props.selectedLanguage}
                              />
                              :
                              null
                            }
                          </FadeTransitionContainer>

                          <FadeTransitionContainer
                            in={this.props.mainTabState == 5}
                          >
                            <ContactUsMain
                              key={"ContactUsMain"}
                              selectedLanguage={this.props.selectedLanguage}
                              topbar={this.generateTopBar(5)}
                              active={true}
                            />
                          </FadeTransitionContainer>
                        </div>
                      </div>
                    </div>

                    <div id="main_navigation_container">
                      <div className="main_navigation_container_child" style={{ display: this.props.selectedLanguage === "ENGLISH" ? "flex" : "none" }}>
                        <div className="main_nav_button_container" onClick={this.switchMains.bind(this, 1)}>
                          <div className="btm_nav" id="btm_nav_ico1_selected" style={{ display: this.props.mainTabState == 1 ? "block" : "none" }}></div>
                          <div className="btm_nav" id="btm_nav_ico1" style={{ display: this.props.mainTabState == 1 ? "none" : "block" }}></div>
                        </div>
                        <div className="main_nav_button_container" onClick={this.switchMains.bind(this, 2)}>
                          <div className="btm_nav" id="btm_nav_ico2_selected" style={{ display: this.props.mainTabState == 2 ? "block" : "none" }}></div>
                          <div className="btm_nav" id="btm_nav_ico2" style={{ display: this.props.mainTabState == 2 ? "none" : "block" }}></div>
                        </div>
                        <div className="main_nav_button_container" onClick={this.switchMains.bind(this, 3)}>
                          <div className="btm_nav" id="btm_nav_ico3_selected" style={{ display: this.props.mainTabState == 3 ? "block" : "none" }}></div>
                          <div className="btm_nav" id="btm_nav_ico3" style={{ display: this.props.mainTabState == 3 ? "none" : "block" }}></div>
                        </div>
                        <div className="main_nav_button_container" onClick={this.switchMains.bind(this, 4)}>
                          <div className="btm_nav" id="btm_nav_ico4_selected" style={{ display: this.props.mainTabState == 4 ? "block" : "none" }}></div>
                          <div className="btm_nav" id="btm_nav_ico4" style={{ display: this.props.mainTabState == 4 ? "none" : "block" }}></div>
                        </div>
                        <div className="main_nav_button_container" onClick={this.switchMains.bind(this, 5)}>
                          <div className="btm_nav" id="btm_nav_ico5_selected" style={{ display: this.props.mainTabState == 5 ? "block" : "none" }}></div>
                          <div className="btm_nav" id="btm_nav_ico5" style={{ display: this.props.mainTabState == 5 ? "none" : "block" }}></div>
                        </div>
                      </div>
                      <div className="main_navigation_container_child" style={{ display: this.props.selectedLanguage !== "ENGLISH" ? "flex" : "none" }}>
                        <div className="main_nav_button_container" onClick={this.switchMains.bind(this, 1)}>
                          <div className="btm_nav" id="tr_btm_nav_ico1_selected" style={{ display: this.props.mainTabState == 1 ? "block" : "none" }}></div>
                          <div className="btm_nav" id="tr_btm_nav_ico1" style={{ display: this.props.mainTabState == 1 ? "none" : "block" }}></div>
                        </div>
                        <div className="main_nav_button_container" onClick={this.switchMains.bind(this, 2)}>
                          <div className="btm_nav" id="tr_btm_nav_ico2_selected" style={{ display: this.props.mainTabState == 2 ? "block" : "none" }}></div>
                          <div className="btm_nav" id="tr_btm_nav_ico2" style={{ display: this.props.mainTabState == 2 ? "none" : "block" }}></div>
                        </div>
                        <div className="main_nav_button_container" onClick={this.switchMains.bind(this, 3)}>
                          <div className="btm_nav" id="tr_btm_nav_ico3_selected" style={{ display: this.props.mainTabState == 3 ? "block" : "none" }}></div>
                          <div className="btm_nav" id="tr_btm_nav_ico3" style={{ display: this.props.mainTabState == 3 ? "none" : "block" }}></div>
                        </div>
                        <div className="main_nav_button_container" onClick={this.switchMains.bind(this, 4)}>
                          <div className="btm_nav" id="tr_btm_nav_ico4_selected" style={{ display: this.props.mainTabState == 4 ? "block" : "none" }}></div>
                          <div className="btm_nav" id="tr_btm_nav_ico4" style={{ display: this.props.mainTabState == 4 ? "none" : "block" }}></div>
                        </div>
                        <div className="main_nav_button_container" onClick={this.switchMains.bind(this, 5)}>
                          <div className="btm_nav" id="tr_btm_nav_ico5_selected" style={{ display: this.props.mainTabState == 5 ? "block" : "none" }}></div>
                          <div className="btm_nav" id="tr_btm_nav_ico5" style={{ display: this.props.mainTabState == 5 ? "none" : "block" }}></div>
                        </div>
                      </div>
                    </div>

                  </div>


                  <Transition
                    in={this.state.modalType === "vehicleRegister"}
                    timeout={transitUpDuration}
                  >
                    {(state) => {
                      return (
                        <div style={{
                          ...transitUpStyle,
                          ...transitUpStyles[state]
                        }}>
                          <VehicleRegistration
                            topbar={this.modalTopBar}
                            closeModal={this.closeModal}
                            active={this.state.modalType === "vehicleRegister"}
                          />
                        </div>
                      )
                    }}
                  </Transition>

                  <Transition
                    in={this.state.modalType === "vehicleEdit"}
                    timeout={transitUpDuration}
                  >
                    {(state) => {
                      return (
                        <div style={{
                          ...transitUpStyle,
                          ...transitUpStyles[state]
                        }}>
                          <VehicleUpdateDetails
                            topbar={this.modalTopBar}
                            selectedid={this.state.updateVehId}
                            closeModal={this.closeModal}
                          />
                        </div>
                      )
                    }}
                  </Transition>

                  <Transition
                    in={this.state.modalType === "bookingAdd"}
                    timeout={transitUpDuration}
                    mountOnEnter={true}
                    unmountOnExit={true}
                  >
                    {(state) => {
                      return (
                        <div style={{
                          ...transitUpStyle,
                          ...transitUpStyles[state]
                        }}>
                          <NewAppointmentMain
                            transitionState={state}
                            topbar={this.modalTopBar}
                            onClickBack={this.closeNewBookingModal}
                            isActive={this.state.modalType === "bookingAdd"}>
                          </NewAppointmentMain>
                        </div>
                      )
                    }}
                  </Transition>

                  <Transition
                    in={this.state.modalType === "settingAddPre"}
                    timeout={transitUpDuration}
                    mountOnEnter={true}
                    unmountOnExit={true}
                  >
                    {(state) => {
                      return (
                        <div style={{
                          ...transitUpStyle,
                          ...transitUpStyles[state]
                        }}>
                          <DealerSettingContainer isActive={this.state.modalType === "settingAddPre"} transitionState={state} topbar={this.modalTopBar} dismissDealerSetting={this.closeModal} />
                        </div>
                      )
                    }}
                  </Transition>
                </div>
                :
                null
              }
            </div>
          </div>

        </div>
      </MuiThemeProvider>
    )
  }
}

App.contextTypes = {
  router: React.PropTypes.object.isRequired
}

function mapStateToProps(state) {
  const isLogin = state.user.isLogin
  const email = state.user.email
  const token = state.user.token
  const loading = state.loading
  return {
    isPushNotificationEnabled: state.pushNoti.enabled,
    ciamID: state.user.ciamID,
    loading: state.loading,
    isLogin,
    email,
    token,
    selectedLanguage: state.language.selectedLanguage,
    selectedDealer: state.dealer.selected,
    selectedAgent: state.agent.selected,
    selectedDate: state.booking.dates,
    selectedService: state.booking.services,
    webviewStatus: state.webview.status,
    webviewType: state.webview.type,
    isShowLegal: state.legal.toc_Show,
    othersLastLoaded: state.campaign.othersLastLoaded,
    campaignsLastLoaded: state.campaign.campaignsLastLoaded,
    accessoriesLastLoaded: state.products.accessoriesLastLoaded,
    collectionsLastLoaded: state.products.collectionsLastLoaded,
    catalogLastLoaded: state.vehicle.catalogLastLoaded,
    mainTabState: state.maintabs.mainTabState,
    lastLoginTime: state.user.lastLoginTime,
    vehListLastUpdated: state.vehicle.vehListLastUpdated,
    vehList: state.vehicle.all,
    isFirstTimeOnApp: state.legal.isFirstTimeOnApp,
  }
}

export default connect(mapStateToProps, { enablePushNotification, updatePushToken, fetchOthers, getAppointment, fReloadContent, updateMainTab, fetchAccessories, fetchCollections, fetchCampaigns, setCurrentStage, initPrefix, logout, selectLanguage, selectDate, selectAgent, updateStage, selectDealer, selectService, showLegal, hideLegal, dismissWebview, showWebview, loadingStart, loadingEnd, fetchModels })(App)
