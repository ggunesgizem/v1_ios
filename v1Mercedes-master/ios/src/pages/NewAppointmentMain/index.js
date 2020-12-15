import React, { Component } from 'react'
import { connect } from 'react-redux'
import VehicleListContainer from '../../containers/vehicleListContainer'
import TopBar from '../../components/TopBar'
import T from 'i18n-react'

import LocateDealer from '../LocateDealer'
import SelectAgent from '../SelectAgent'
import SelectDate from '../SelectDate'
import SelectService from '../SelectService'
import BookingSummary from '../BookingSummary'

import { selectDate, selectService, updateStage, setCurrentStage } from '../../actions/bookingAction'
import { selectDealer, selectAgent } from '../../actions/dealerActions'
import { updateMainTab } from '../../actions/mainTabsActions'


import '../page.css'

class NewAppointmentMain extends Component {

  constructor(props){
    super(props)
    this.switchStage = this.switchStage.bind(this)
    this.state = {
      active : true,
      isInitLoading : true,
      appointmentMessageTypeStatus : true,
      isShowingPopop : false
    }
  }

  componentWillReceiveProps(np){
    console.log("new",np);
    if(this.state.isShowingPopop===false)
    {
      if(np.latestStage===3)
      {
        //navigator.notification.confirm('Randevu talepleri ve araç servis durum takip fonksiyonu yalnızca "Periyodik Bakım" işlemleri için aktiftir.',()=>{},'Randevu Bilgisi',['Tamam']);
        //this.setState({isShowingPopop : true});
      }
    }
  }

  componentDidMount() {
    window.scrollTo(0, 0)
    this.props.updateStage(0)
    this.props.setCurrentStage(0)
    this.setState({
      isInitLoading : false,
    })
    this.checkUserData();
  }

  checkUserData(){
    if(this.props.user.mobilePhone==="" || this.props.user.mobilePhone === null)
    {
      navigator.notification.confirm('Randevu alabilmeniz için lütfen profil ayarları sayfasından cep telefonu numaranızı giriniz.',()=>{
        this.closeModalFunction();
        this.props.updateMainTab(4);
      },'GSM Numaranız Eksik',['Tamam']);
    }
  }

  switchStage(stage){
    this.props.setCurrentStage(stage)
  }

  closeModalFunction(){
    var newTopBar = {...this.props.topbar, props:{...this.props.topbar.props, title:T.translate("booking.title"), onClickClose:this.props.onClickBack}}
    newTopBar;
    this.props.onClickBack();
  }


  renderAppointmentTypeMessage()
  {
      return (
        <div style={{padding:10,backgroundColor:'black',borderWidth:'2px',borderBottomColor:'white',borderColor:'white',overflow:'hidden'}} key="hidableMessage">
                        <span style={{width:'95%',color:'white',display:'block',textAlign:'center',padding:'5px',float:'left'}}>
                          Aldığınız Randevu Periyodik Bakım İçindir.
                        </span>
                        <span onClick={()=>{
                          this.setState({ appointmentMessageTypeStatus : false })
                        }} style={{display:'block',backgroundColor:'black',color:'white',textAlign:'right',padding:'5px',float:'left'}}>
                          X
                        </span>
                      </div>
            )
  }

  render() {
    var newTopBar = {...this.props.topbar, props:{...this.props.topbar.props, title:T.translate("booking.title"), onClickClose:this.props.onClickBack}}
    
    return (
      <div id="newAppointmentMain" className="fsmodal" style={{heigth:'100%',width:'100%'}} >
          <div style={{height:'100%',width:'100%'}} key={""}>
            {
              //(this.state.appointmentMessageTypeStatus===true?this.renderAppointmentTypeMessage():null)
            }
            {newTopBar}
            {this.state.active ?
              <div style={{height:'calc(100% - var(--top-container-height))'}}>
                <LocateDealer isGeoActive={this.props.isActive} switchStage={this.switchStage} active={this.props.currentStageInBooking == 0} isInitLoading={this.state.isInitLoading}/>
                <SelectAgent switchStage={this.switchStage} active={this.props.currentStageInBooking == 1}/>
                <SelectDate switchStage={this.switchStage} active={this.props.currentStageInBooking == 2}/>
                <SelectService switchStage={this.switchStage} active={this.props.currentStageInBooking == 3}/>
                <BookingSummary switchStage={this.switchStage} closeModal={this.props.onClickBack} active={this.props.currentStageInBooking == 4}/>
              </div>
              :
              null
            }
          </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    latestStage: state.booking.latestStage,
    currentStageInBooking : state.booking.currentStageInBooking,
    user : state.user
  }
}
export default connect(mapStateToProps,{ selectDate, selectService, updateStage, updateMainTab, setCurrentStage, selectDealer, selectAgent })(NewAppointmentMain)
