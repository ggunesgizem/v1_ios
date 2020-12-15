import React, { Component } from 'react'
import { connect } from 'react-redux'
import './leadDetailContainer.css'
import ButtonPage from  '../../components/ButtonPage'
import DealerSettingContainer from '../../containers/DealerSettingContainer'
import Slider from 'react-slick'
import T from 'i18n-react'

import { Transition } from 'react-transition-group'
import { transitUpStyles, transitUpStyle , transitUpDuration } from '../../pages/App/transitions'

import { toggleInterestCampaign, toggleInterestOthers } from '../../actions/campaignActions'
import { toggleInterestAccessories, toggleInterestCollections } from '../../actions/productsActions'

import ImageCacheLoader from '../../components/ImageCacheLoader'
import { updateMainTab } from '../../actions/mainTabsActions'

const ImageSet = (key,imageSet) => {
  return(
    <div key={key} className={"leadDetailImageSet"}>
      <ImageCacheLoader style={{width:"100%",height:"100%"}} src={imageSet}/>
    </div>
  )
}

class LeadDetailComponent extends Component {

  constructor(props){
    super(props)
    this.state = {
      cHeight : 0,

    }
  }

  mobilecheck(){
    if( navigator.userAgent.match(/Android/i)){
      
      return "android";
    }
    else{
      if(navigator.userAgent.match(/iPhone/i)){
        return "ios";
      }
    }
  };

  //ConvertHref Metodu
  convertHref(text) {

    var myText= text;
    var begin=0;
    var firstIndex=0;
    var secondIndex=0;
    var firstString='<a href="';
    var firstString2='<a href ="';
    var lastString='"';
    if(myText.indexOf(firstString)==-1 && myText.indexOf(firstString2)!=-1) 
    {
     firstString=firstString2;
    } 

    while(firstIndex!=-1)
    {
      firstIndex= myText.indexOf(firstString,begin);
      if(firstIndex == -1)
      {
        break;
      }
      else
      {
        secondIndex= myText.indexOf(lastString,firstIndex+firstString.length);
        var url=myText.substring(firstIndex+firstString.length,secondIndex);
        myText=myText.replace(url,"#");
        myText=myText.substring(0,firstIndex+2)+` onclick="window.open('` + url + `','_system') "` + myText.substring(firstIndex+3);
        begin=secondIndex;
      }

    }
     return myText;
  }

  componentWillReceiveProps(np){
  }

  componentDidMount() {
   
     /*if(window.ADB){
       window.ADB.trackState("Lead detail", {'sleadtype':this.props.type,'sleadid':this.props.item.LeadItemID,'sleadname':this.props.item.LeadItemName});
     }*/

     if(this.mobilecheck()==="android"){
      cordova.plugins.deneme.permissionCheck("permissionCheck", function(response){

 
        if(window.ADB && response==="PermissionIsOpen"){
          window.ADB.trackState("Lead detail", {'sleadtype':this.props.type,'sleadid':this.props.item.LeadItemID,'sleadname':this.props.item.LeadItemName});
         }
        
       });
    
    }
    if(this.mobilecheck()==="ios"){
      cordova.plugins.perm.permCheck("permCheck", function(response){

 
        if(window.ADB && response==="True"){
          window.ADB.trackState("Lead detail", {'sleadtype':this.props.type,'sleadid':this.props.item.LeadItemID,'sleadname':this.props.item.LeadItemName});
         }
        
       });
    
    }

    var cHeight = window.screen.width * 0.5625
    if(this.props.type === "collection"){
      cHeight = window.screen.width
    }
    this.setState({
      cHeight : cHeight,
    })
  }



  imageSlider(imageSet){
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      afterChange: this.imageSwap,
      arrows: false,
    }

    if(typeof imageSet === "string"){
      return ImageSet(0,imageSet)
    }else{
      var c = 0
      var temp = imageSet.map(item =>{
        return ImageSet("imageKey"+c++,item)
      })

      if (temp.length > 0) {
        return (
          <Slider {...settings}>
          {temp}
          </Slider>
        )
      }else{
        return(<span></span>)
      }
    }
  }

  formatHtml(text){
    while(text.indexOf("\n") > 0){
      text= text.replace("\n", "<br/>");
    }
    return text
  }

  render() {
    const interestState = this.props.item.InterestStatus === "True"
    var item = this.imageSlider(this.props.item.imageUrl)
    return (
      
      <div className="leadDetailMain">
        <div className="leadDetailImage" style={{height: this.state.cHeight+"px"}}>
          {item}
          { interestState ?
            <div className="leadDetailInterestBar ">
              <div className="interestedIcon_white"></div>
              &nbsp;
              {T.translate("mb world.interest.interested")}
            </div>
            :
            null
          }
        </div>
        { this.props.item.ProductNumber ?
          <div className="leadDetailContent_ProductNumber">
            {this.props.item.ProductNumber}
          </div>
          :
          null
        }
        { this.props.lang === "ENGLISH" ?
            this.props.item.Description ?
              <div className="laedDetailContent" dangerouslySetInnerHTML={{__html : this.formatHtml(this.convertHref(this.props.item.Description))}}></div>
              :
              null
          : 
            this.props.item.DescriptionSecondLang ?
              <div className="laedDetailContent" dangerouslySetInnerHTML={{__html : this.formatHtml(this.convertHref(this.props.item.DescriptionSecondLang))}}></div>
              :
              null
        }
        { this.props.item.Price ?
          <div className="laedDetailContent">
            {T.translate("mb world.lead.recommended price") } : {this.props.item.Price}₺
          </div>
          :
          null
        }
        <div className="leadDetailContent_toc">
          {
            this.props.type !== "others" ?
            <span>
            {T.translate("mb world.lead.toc 1")}
            <br/>
            {T.translate("mb world.lead.toc 2")}
            <br/>
            {T.translate("mb world.lead.toc 3")}
            <br/>
            </span>
            :
            null
          }
          {T.translate("mb world.lead.toc 4")}
        </div>
      </div>
    )
  }
}

class LeadDetailContainer extends Component {
  constructor(props){
    super(props)
    let selectedItem = this.findItemById(props.type,props.selectedId)
    this.state = {
      selectedId : props.selectedId,
      selectedItem : selectedItem,
      content : selectedItem != null ? <LeadDetailComponent key={selectedItem.LeadItemID} type={props.type} item={selectedItem} lang={props.selectedLanguage}/> : ""
    }

    this.handleButtonClick = this.handleButtonClick.bind(this)
    this.expressSuccessCallBack = this.expressSuccessCallBack.bind(this)
    this.expressErrorCallBack = this.expressErrorCallBack.bind(this)
    this.unExpressSuccessCallBack = this.unExpressSuccessCallBack.bind(this)
    this.unExpressErrorCallBack = this.unExpressErrorCallBack.bind(this)

    this.proceedToExpress = this.proceedToExpress.bind(this)
    this.unexpressLead = this.unexpressLead.bind(this)
    this.sendLead = this.sendLead.bind(this)
  }

  componentWillReceiveProps(np){
    if(this.state.selectedId !== np.type,np.selectedId){
      let selectedItem = this.findItemById(np.type,np.selectedId)
      this.setState({
        selectedItem : selectedItem,
        content : selectedItem != null ? <LeadDetailComponent key={selectedItem.LeadItemID} type={np.type} item={selectedItem} lang={np.selectedLanguage}/> : ""
      })
    }
  }

  findItemById(type,id){
    var list = []

    switch(type){
      case "others" : {
        list = this.props.others
        break
      }
      case "campaign" : {
        list = this.props.campaign
        break
      }
      case "accessory" : {
        list = this.props.accessories
        break
      }
      case "collection" : {
        list = this.props.collections
        break
      }
      default :
      break
    }

    for(var i = 0; i < list.length; i ++){
      if(list[i].id == id){
        return list[i]
      }
    }
    return null
  }

  handleButtonClick(){
    if(this.props.user.mobilePhone==="" || this.props.user.mobilePhone === null)
    {
      navigator.notification.confirm('Kampanyadan yararlanmak için lütfen profil ayarları sayfasından cep telefonu numaranızı giriniz.',()=>{
        //this.closeModalFunction();
        this.props.updateMainTab(4);
      },'GSM Numaranız Eksik',['Tamam']);
    }else{
        if(this.state.selectedItem.InterestStatus === "False"){
          if(this.props.preferredDealer === null){
            this.props.showSetPreferenceModal()
    
          }else{
            this.proceedToExpress()
          }
        }else{
          this.proceedToExpress()
        }
    }
    
  }

  closeModalFunction(){
    var newTopBar =  {...this.props.topbar, props:{...this.props.topbar.props, onClickBack:this.props.backButton}}
    newTopBar;
    this.props.onClickBack();
  }

  proceedToExpress(){
    var currentinterest = this.state.selectedItem.InterestStatus === "True"
    var lead = this.props.preferredDealer ?  {
      LeadItemID : this.state.selectedItem.id,
      InterestStatus : !currentinterest,
      WorkshopId : this.props.preferredDealer.WorkshopId,
    }
    :
    {
      LeadItemID : this.state.selectedItem.id,
      InterestStatus : !currentinterest,
    }

    if(navigator.notification){
      if(currentinterest){
        navigator.notification.confirm(T.translate("mb world.remove interest.text"), (buttonIndex)=>{
          if(buttonIndex === 2){
          } else if(buttonIndex === 1){
            this.unexpressLead(lead)
          }
        }, T.translate("mb world.remove interest.title"),[T.translate("mb world.remove interest.accept"),T.translate("mb world.remove interest.reject")])
      }else{
        this.sendLead(lead)
      }
    }else{
        if(currentinterest){
          this.unexpressLead(lead)
        }else{
          this.sendLead(lead)
        }
    }
  }

  sendLead(lead){
    switch(this.props.type){
      case "others" : {
        this.props.toggleInterestOthers(lead, this.expressSuccessCallBack, this.expressErrorCallBack)
        return
      }
      case "campaign" : {
        this.props.toggleInterestCampaign(lead, this.expressSuccessCallBack, this.expressErrorCallBack)
        return
      }
      case "accessory" : {
        this.props.toggleInterestAccessories(lead, this.expressSuccessCallBack, this.expressErrorCallBack)
        return
      }
      case "collection" : {
        this.props.toggleInterestCollections(lead, this.expressSuccessCallBack, this.expressErrorCallBack)
        return
      }
    }
  }

  unexpressLead(lead){
    switch(this.props.type){
      case "others" : {
        this.props.toggleInterestOthers(lead, this.unExpressSuccessCallBack, this.unExpressErrorCallBack)
        return
      }
      case "campaign" : {
        this.props.toggleInterestCampaign(lead, this.expressSuccessCallBack, this.expressErrorCallBack)
        return
      }
      case "accessory" : {
        this.props.toggleInterestAccessories(lead, this.expressSuccessCallBack, this.expressErrorCallBack)
        return
      }
      case "collection" : {
        this.props.toggleInterestCollections(lead, this.expressSuccessCallBack, this.expressErrorCallBack)
        return
      }
    }
  }

  expressSuccessCallBack(){
    //AAnalytics
    console.log("express",this.props);
    /*if(window.ADB){
      window.ADB.trackAction("express lead", {'leadtype':this.props.type,'leadid':this.props.selectedId});
     }*/

     if(this.mobilecheck()==="android"){
      cordova.plugins.deneme.permissionCheck("permissionCheck", function(response){

 
        if(window.ADB && response==="PermissionIsOpen"){
          window.ADB.trackAction("express lead", {'leadtype':this.props.type,'leadid':this.props.selectedId});
         }
        
       });
    
    }
    if(this.mobilecheck()==="ios"){
      cordova.plugins.perm.permCheck("permCheck", function(response){

 
        if(window.ADB && response==="True"){
          window.ADB.trackAction("express lead", {'leadtype':this.props.type,'leadid':this.props.selectedId});
         }
        
       });
    
    }

  }

  expressErrorCallBack(){

  }

  unExpressSuccessCallBack(){
    /*if(window.ADB){
       window.ADB.trackAction("unexpress lead", {'leadtype':this.props.type,'leadid':this.props.selectedId});
    }*/

    if(this.mobilecheck()==="android"){
      cordova.plugins.deneme.permissionCheck("permissionCheck", function(response){

 
        if(window.ADB && response==="PermissionIsOpen"){
          window.ADB.trackAction("unexpress lead", {'leadtype':this.props.type,'leadid':this.props.selectedId});
         }
        
       });
    
    }
    if(this.mobilecheck()==="ios"){
      cordova.plugins.perm.permCheck("permCheck", function(response){

 
        if(window.ADB && response==="True"){
          window.ADB.trackAction("unexpress lead", {'leadtype':this.props.type,'leadid':this.props.selectedId});
         }
        
       });
    
    }

  }

  unExpressErrorCallBack(){

  }




  render(){

    if(this.state.selectedItem == null){
        var newTopBar =  {...this.props.topbar, props:{...this.props.topbar.props, onClickBack:this.props.backButton}}
        return(
          <div id="leadMain">
            <div id="leadMain_topbar">
              {newTopBar}
            </div>
            <div id="leadMain_content">
              Something went wrong, please contact your service advisor
            </div>
          </div>
        )
    }

    const interestState = this.state.selectedItem.InterestStatus === "True"
    var newTopBar = {...this.props.topbar, props:{...this.props.topbar.props, title:this.props.selectedLanguage === "ENGLISH" ? this.state.selectedItem.LeadItemName : this.state.selectedItem.LeadItemNameSecondLang, onClickBack:this.props.backButton}}

    return (
      <div style={{width:"100%", height:"100%"}}>

        <div id="leadMain_topbar">
          {newTopBar}
        </div>
        <div id="leadMain_content">
          <div className="leadDetailMain">
          {this.state.content !== null ?
              <ButtonPage
                onclick={this.handleButtonClick}
                buttonState={!interestState}
                buttonText={T.translate("mb world.interest.express interest")}
                buttonText_disbaled={T.translate("mb world.remove interest.title")}
                content={this.state.content}
                expressButtonStyle={true}
                hideButton={this.props.type==="others"?true:false}
              />
              :
              null
            }
            
          </div>
        </div>
      </div>
    )

  }
}

function mapStateToProps(state) {
  return {
    selectedLanguage: state.language.selectedLanguage,
    campaign : state.campaign.all,
    others : state.campaign.others,
    accessories : state.products.accessories,
    collections : state.products.collections,
    preferredAgent : state.agent.preferred,
    preferredDealer: state.dealer.prefered,
    isLoadingCampaigns:state.campaign.isLoadingCampaigns,
    isLoadingOthers:state.campaign.isLoadingOthers,
    user : state.user
  }
}

export default connect(mapStateToProps, { updateMainTab,toggleInterestCampaign,toggleInterestOthers,toggleInterestAccessories, toggleInterestCollections  } )(LeadDetailContainer)
