import React, { Component } from "react";

import { connect } from "react-redux";

import { Transition } from "react-transition-group";

import {
  transitUpStyles,
  transitUpStyle,
  transitUpDuration
} from "../../pages/App/transitions";

import T from "i18n-react";

import { selectLanguage } from "../../actions/languageAction";

import { showWebview } from "../../actions/webDisplayAction";

import TextButton from "../../components/TextButton";

import "./setting.css";

import { logout } from "../../actions/initialAction";

import Loadable from "react-loading-overlay";

import axios from "axios";

export const LOG_OUT = "LOG_OUT";

class SettingsContainer extends Component {
  constructor(props) {
    super(props);

    // console.log("SettingsContainer",props);

    this.showDealerSetting = this.showDealerSetting.bind(this);

    this.dismissDealerSetting = this.dismissDealerSetting.bind(this);

    this.toggleLanguage = this.toggleLanguage.bind(this);

    this.mybrowser = this.mybrowser.bind(this);

    this.loadingStopFunction = this.loadingStopFunction.bind(this);

    this.loadingStartFunction = this.loadingStartFunction.bind(this);

    this.ulogout = this.ulogout.bind(this);

    this.state = {
      showDealerSetting: false,
      scm : cordova.InAppBrowser,
      welcomeMessage: false
    };
  }

  componentDidMount() {}
  

   ulogout() {
    try{
     this.props.logout().then((data)=>{
          if(data !== "undefined")
          {
            this.state.scm.close();
          }
     });
    }catch(e){
      
    }
  }

  loadingStopFunction() {
    this.setState({ welcomeMessage: false });

    //alert("loading frame : "+this.state.loadingFrame);
  }

  loadingStartFunction() {
    this.setState({ welcomeMessage: true });

    //alert("Start function : "+this.state.loadingFrame);
  }

  mybrowser(prp, stopCallback, startCallback, urlType, logoutCallback) {

    

    let lang = "en_US";

    if (this.props.lang === "TURKISH") {
      lang = "tr";
    }

    var url =
      configs.CIAM_POINT_API +
      "/ciam/logout?client_id=" +
      configs.CIAM_CLIENTID +
      "&post_logout_redirect_uri=https%3A%2F%2F" +
      configs.WEBAPP_ENDPOINT_SHORT +
      "%2Fpostlogout&app-id=" +
      configs.CIAM_APP_ID +
      "&ui_locales=" +
      lang;

    var inp = this.state.scm.open(url, "_blank", "location=no,closebuttoncolor=#02afff,closebuttoncaption=Kapat,toolbarcolor=#ffffff");

    inp.addEventListener("loadstart", function(event) {
      //login işlemi yapılırken loadstart 'a göre url listen yapılmalıdır.

      //loadstop eventi çalışmıyor!.

      //alert("load start : "+event.url);

      if (event.url.indexOf("postlogout") != -1) {
        startCallback();

        //inp.hide();

        setTimeout(() => {
          stopCallback();
          logoutCallback();
          //alert("setTimeout");
        }, 10000);

        inp.close();

        //logoutCallback().then( ()=> { alert("logout bitti") });

        
      }
    });

    inp.addEventListener("loadstop", function(event) {
      startCallback();

      if (event.url.indexOf("logout") != -1) {
        prp.logout();

        inp.hide();

        setTimeout(() => {
          stopCallback();

          inp.hide();
        }, 3000);

        inp.close();
      }

      /*else if(event.url.indexOf("ciam-callback")!=-1)

{

startCallback();

inp.hide();

setTimeout(()=>{

stopCallback();

inp.close();

},1000);


}

else if(event.url === null || event.url==="")

{

inp.close();

}*/
    });

    inp.addEventListener("loaderror", function(event) {
      //alert("load error : "+JSON.stringify(event));
      /*if(event.code === -999)

{

inp.hide();

mybrowser(prp,stopCallback,startCallback,"logout");

alert("diğer browser");

}*/
    });
  }

  showDealerSetting() {
    this.setState({
      showDealerSetting: true
    });
  }

  dismissDealerSetting() {
    this.setState({
      showDealerSetting: false
    });
  }

  toggleLanguage() {
    if (this.props.selectedLanguage === "TURKISH") {
      return "ENGLISH";
    } else return "TURKISH";
  }

  render() {

    
    return (
      <div>
        <div className="settings-container">
          <div className="settings-group-container">
            <div className="settings-group-sub-header">
              {T.translate("profile.settings.workshop")}
            </div>

            <div className="settings-group-preferred-container">
              <div className="settings-group-preferred-text">
                <div className="settings-group-help-text">
                  {T.translate("profile.settings.workshop preferred")}
                </div>

                {this.props.preferredDealer
                  ? this.props.preferredDealer.Name
                  : "-"}
              </div>

              <TextButton
                buttonText={T.translate("profile.settings.button.edit")}
                paddingTop={true}
                paddingLeft={true}
                paddingRight={true}
                paddingBottom={true}
                onclick={this.props.showSetPreferenceModal}
              />
            </div>

            <div className="settings-group-sub-header">
              {T.translate("profile.settings.service advisor")}
            </div>

            <div className="settings-group-preferred-container">
              <div className="settings-group-preferred-text">
                <div className="settings-group-help-text">
                  {T.translate("profile.settings.service advisor preferred")}
                </div>

                {this.props.preferredAgent
                  ? `${this.props.preferredAgent.FirstName} ${
                      this.props.preferredAgent.LastName
                    }`
                  : "-"}
              </div>

              <TextButton
                buttonText={T.translate("profile.settings.button.edit")}
                paddingTop={true}
                paddingLeft={true}
                paddingRight={true}
                paddingBottom={true}
                onclick={this.props.showSetPreferenceModal}
              />
            </div>
          </div>
        </div>

        {this.state.welcomeMessage ? (
          <Loadable
            text="Çıkış Yapılıyor"
            active={true}
            spinner={true}
            animate
            style={{
              position: "absolute",
              opacity: 1,
              background: "black",
              display: "flex"
            }}
          />
        ) : null}

        {/*<button className="button_logout" onClick={()=>this.props.showWebview('logout')} style={{"width":"90%","position":"fixed","bottom":"80px","left":"5%"}}>

{T.translate("profile.settings.button.logout")}

</button>*/}

        <button
          className="button_logout"
          onClick={() => {
            this.mybrowser(
              this.props,
              this.loadingStopFunction,
              this.loadingStartFunction,
              "logout",
              this.ulogout
            );
          }}
          style={{
            width: "90%",
            position: "fixed",
            bottom: "80px",
            left: "5%"
          }}
        >
          {T.translate("profile.settings.button.logout")}
        </button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    selectedLanguage: state.language.selectedLanguage,

    vehicleList: state.vehicle.all,

    preferredDealer: state.dealer.prefered,

    preferredAgent: state.agent.preferred,

    webviewStatus: state.webview.status
  };
}

export default connect(
  mapStateToProps,
  { selectLanguage, showWebview, logout }
)(SettingsContainer);
