import React, { Component } from "react";

import { connect } from "react-redux";

import _ from "lodash";

import { showWebview, dismissWebview } from "../../actions/webDisplayAction";

//import { loadingStart } from '../../actions/loadingActions'

import { validateUser } from "../../actions/userActions";

import { logout } from "../../actions/initialAction";

import Loadable from "react-loading-overlay";

import "./Webview.css";

import axios from "axios";

import {
  loadingStart,
  loadingSuccess,
  loadingFail
} from "../../actions/loadingActions";

import {
  updateJWT,
  initialLoad,
  fReloadContent
} from "../../actions/initialAction";

//import { showWebview } from '../../webDisplayAction'

const USER_PROFILE_CREATE = "USER_PROFILE_CREATE";

const USER_PROFILE_DELETE = "USER_PROFILE_DELETE";

const USER_PROFILE_UPDATE = "USER_PROFILE_UPDATE";

const USER_PROFILE_GET = "USER_PROFILE_GET";

const USER_AUTH_CODE = "USER_AUTH_CODE";

const USER_CIAM_ID = "USER_CIAM_ID";

const SHOW_REGISTRATION_PAGE = "SHOW_REGISTRATION_PAGE";

const HIDE_REGISTRATION_PAGE = "HIDE_REGISTRATION_PAGE";

class WebDisplay extends Component {
  constructor(props) {
    super(props);

    this.parseiFrameMessage = this.parseiFrameMessage.bind(this);

    this.state = {
      iframeHeight: 200,

      loadingFrame: false,

      pType: "",

      welcomeMessage: false
    };

    this.iFrameLoader = this.iFrameLoader.bind(this);

    this.mybrowser = this.mybrowser.bind(this);

    this.loadingStopFunction = this.loadingStopFunction.bind(this);

    this.loadingStartFunction = this.loadingStartFunction.bind(this);
  }

  componentWillReceiveProps(np) {
    if (this.props.type !== this.state.pType) {
      this.setState({
        pType: this.props.type,

        loadingFrame: true
      });
    }
  }

  deleteBrowser() { }

  componentWillMount() {
    var url = `${configs.CIAM_POINT_API
      }/oidc10/auth/oauth/v2/authorize?response_type=code&client_id=${configs.CIAM_CLIENTID
      }&redirect_uri=https%3A%2F%2F${configs.WEBAPP_ENDPOINT_SHORT
      }%2Flogin-cb&scope=openid%20ciam-uid%20phone%20email%20profile&ui_locales=tr`;
    alert(url);
    this.mybrowser(
      encodeURI(url),
      this.props,
      this.loadingStopFunction,
      this.loadingStartFunction
    );
  }

  componentDidMount() {
    if (this.props.type === "inv_login") {
      this.props.loadingStart();
    }

    window.addEventListener("message", this.parseiFrameMessage);

    this.setState({
      pType: this.props.type,

      loadingFrame: false
    });

    if (this.state.welcomeMessage === false) {
      this.setState({ welcomeMessage: true });
    }

    //default loadingFrame is true
  }

  componentWillUnmount() {
    window.removeEventListener("message", this.parseiFrameMessage);

    //window.removeEventListener('loadstop');

    alert("message listener durdu");
  }

  loadingStopFunction() {
    this.setState({ welcomeMessage: false });

    //alert("loading frame : "+this.state.loadingFrame);
  }

  loadingStartFunction() {
    this.setState({ welcomeMessage: true });

    //alert("Start function : "+this.state.loadingFrame);
  }

  browserAc(url) {
    window.open(url, "_blank", "location=yes");

    return false;
  }

  mybrowser(url, prp, stopCallback, startCallback) {
    var target = "_blank";
    var inappBrowser = window.cordova.InAppBrowser.open(
      url,
      target,
      "location=yes"
    );

    inappBrowser.addEventListener("loadstop", function (event) {
      //startCallback();

      //default location=yes

      if (event.url.indexOf("code") != -1) {
        var startCode = event.url.indexOf("code") + 5; // 'code=' -> 5 character

        var codeUrl = event.url;

        var codeUrlCallback = event.url.substring(startCode, codeUrl.length);

        let deviceTT = 0;

        if (device.platform.toLowerCase() === "ios") {
          deviceTT = 2;
        } else if (device.platform.toLowerCase() === "android") {
          deviceTT = 1;
        }

        prp.validateUser(
          codeUrlCallback,
          deviceTT,
          null,
          prp.type === "inv_login"
        );

        inappBrowser.hide();

        inappBrowser.hide();

        inappBrowser.close();

        setTimeout(() => {
          stopCallback();

          prp.dismissWebview();

          inappBrowser.close();
        }, 5000);

        inappBrowser.close();
      } else if (event.url.indexOf("logout") != -1) {
        prp.logout();

        inappBrowser.close();

        /*inappBrowser.hide();

prp.dismissWebview();

inappBrowser.hide();

inappBrowser.close();*/
      } else if (event.url.indexOf("ciam-callback") != -1) {
        inappBrowser.close();

        prp.dismissWebview();

        prp.logout();

        inappBrowser.close();
      } else if (event.url === null || event.url === "") {
        inappBrowser.close();
      } else if (
        event.url === "https://login.secure.mercedes-benz.com/wl/login"
      ) {
        inappBrowser.hide();
      }
    });

    inappBrowser.addEventListener("exit", function (event) {
      //alert("çıkış");

      prp.dismissWebview();

      inappBrowser.close();

      prp.dismissWebview();
    });

    /*inappBrowser.addEventListener("loadstart",function(event){

alert("start event");

inappBrowser.executeScript({ code: deneme2() }, function(param){alert("script çalıştı...")});

});*/

    //inappBrowser.addEventListener('message',this.parseiFrameMessage);
  }

  parseiFrameMessage(e) {
    alert("parseiFrameMessage");

    //console.log("rcv something", JSON.parse(e.data));

    // IMPORTANT: Check the origin of the data!

    if (~e.origin.indexOf("https://" + configs.WEBAPP_ENDPOINT_SHORT)) {
      // Message is coming from web app

      console.log("mobile app receive message:");

      console.log(JSON.stringify(e.data));


      if (typeof e.data.url !== "undefined") {

        switch (e.data.url) {
          case "/login-cb":
            console.log("mobile app: ", e.data.code);
            if (typeof e.data.code !== "undefined") {
              if (this.props.authCode !== e.data.code) {
                // should login the user

                if (typeof device !== "undefined") {
                  console.log(device.cordova);

                  console.log(device.platform);

                  console.log(device.uuid);

                  let deviceTT = 0;

                  if (device.platform.toLowerCase() === "ios") {
                    deviceTT = 2;
                  } else if (device.platform.toLowerCase() === "android") {
                    deviceTT = 1;
                  }

                  console.log(window.registerID);

                  console.log("reducer point");

                  console.log(this.props.pushToken);

                  this.props.validateUser(
                    e.data.code,
                    deviceTT,
                    this.props.pushToken,
                    this.props.type === "inv_login"
                  );
                } else {
                  this.props.validateUser(
                    e.data.code,
                    0,
                    null,
                    this.props.type === "inv_login"
                  );
                }

                this.props.dismissWebview();
              }
            } else if (typeof e.data.status !== "undefined") {
              if (e.data.status == "101200") {

                this.props.dismissWebview();

                this.props.showWebview("inv_login");
              }
            }


            break;


          case "/postlogout":
            // should logout the user

            this.props.logout();

            //this.props.dismissWebview()

            break;

          case "/ciam-callback-auth":
            switch (e.data.code) {
              case "0":
                // "user-authenticated"

                this.props.dismissWebview();

                break;

              case "1":
                // "reset-password-success"

                this.props.dismissWebview();

                break;

              case "2":
                // "email-change-success"

                //this.props.loadingStart()

                this.props.dismissWebview();

                this.props.showWebview("inv_login");

                break;

              case "3":
                // "confirm-registration-success"

                this.props.dismissWebview();

                break;

              case "5":
                // "mobile-change-success"

                //this.props.loadingStart()

                this.props.dismissWebview();

                this.props.showWebview("inv_login");

                break;

              case "3000":
                // "user-updated"

                // retrieve new auth code

                //this.props.loadingStart()

                this.props.dismissWebview();

                this.props.showWebview("inv_login");

                break;

              case "3001":
                // "password-updated"

                this.props.dismissWebview();

                break;

              default:
                this.props.dismissWebview();

                break;
            }

            break;

          case "/ciam-callback":
            switch (e.data.code) {
              case "1001":
                // "auth-error"

                this.props.dismissWebview();

                break;

              case "1002":
                // "reset-password-init"

                this.props.dismissWebview();

                break;

              case "1003":
                // "confirm-registration-init"

                this.props.dismissWebview();

                break;

              case "1004":
                // "email-change-init"

                // this.props.dismissWebview()

                this.props.dismissWebview();

                this.props.showWebview("logout");

                break;

              case "1005":
                // "token-error"

                this.props.dismissWebview();

                break;

              case "2000":
                // "user-canceled"

                this.props.dismissWebview();

                break;

              case "2001":
                // "user-logged-out"

                this.props.dismissWebview();

                break;

              case "2002":
                // "user-removed"

                this.props.dismissWebview();

                break;

              case "2003":
                // "user-unlinked"

                this.props.dismissWebview();

                break;

              case "2004":
                // "session-missing"

                this.props.dismissWebview();

                break;

              default:
                this.props.dismissWebview();

                break;
            }

            break;

          default:
            this.props.dismissWebview();

            break;
        }
      }
    } else {
      // message is coming from CIAM

      let data = null;

      try {
        data = JSON.parse(e.data);
      } catch (err) {
        data = null;
      }

      if (data) {
        this.setState({
          iframeWidth: data.width,

          iframeHeight: data.height + 60
        });
      }
    }
  }

  iFrameLoader() {
    console.log("iframe loaded");

    this.setState({
      pType: "",

      loadingFrame: false
    });
  }

  //test method calling here

  render() {
    let url = "";

    let lang = "tr-TUR";

    if (this.props.lang === "TURKISH") {
      lang = "tr";
    }

    // console.log(this.context.router.location.pathname)

    switch (this.props.type) {
      case "inv_login":
        url = `${configs.CIAM_POINT_API
          }/oidc10/auth/oauth/v2/authorize?response_type=code&client_id=${configs.CIAM_CLIENTID
          }&redirect_uri=https%3A%2F%2F${configs.WEBAPP_ENDPOINT_SHORT
          }%2Flogin-cb&scope=openid%20ciam-uid%20phone%20email%20profile&ui_locales=${lang}`;

        break;

      case "login":
        //https://login.secure.mercedes- benz.com/wl/level-10

        url = `${configs.CIAM_POINT_API
          }/oidc10/auth/oauth/v2/authorize?response_type=code&client_id=${configs.CIAM_CLIENTID
          }&redirect_uri=https%3A%2F%2F${configs.WEBAPP_ENDPOINT_SHORT
          }%2Flogin-cb&scope=openid%20ciam-uid%20phone%20email%20profile&ui_locales=${lang}`;

        //url=`https://login.secure.mercedes-benz.com/wl/level-10?response_type=code&client_id=${configs.CIAM_CLIENTID}&redirect_uri=https%3A%2F%2F${configs.WEBAPP_ENDPOINT_SHORT}%2Flogin-cb&scope=openid%20ciam-uid%20phone%20email%20profile&ui_locales=${lang}`

        break;

      case "register":
        url = `${configs.CIAM_POINT_LOGIN}/profile/register?app-id=${configs.CIAM_APP_ID
          }&amp;style=responsive&lang=${lang}`;

        break;

      case "logout":
        url = `${configs.CIAM_POINT_API}/ciam/logout?client_id=${configs.CIAM_CLIENTID
          }&post_logout_redirect_uri=https%3A%2F%2F${configs.WEBAPP_ENDPOINT_SHORT
          }%2Fpostlogout&app-id=${configs.CIAM_APP_ID}&ui_locales=${lang}`;

        break;

      case "change-email":
        url = `${configs.CIAM_POINT_LOGIN}/profile/edit/email?app-id=${configs.CIAM_APP_ID
          }&lang=${lang}`;

        break;

      case "change-name":
        url = `${configs.CIAM_POINT_LOGIN}/profile/edit/data?app-id=${configs.CIAM_APP_ID
          }&lang=${lang}`;

        break;

      case "change-password":
        url = `${configs.CIAM_POINT_LOGIN}/profile/edit/password?app-id=${configs.CIAM_APP_ID
          }&lang=${lang}`;

        break;

      case "change-mobile":
        url = `${configs.CIAM_POINT_LOGIN}/profile/edit/mobile?app-id=${configs.CIAM_APP_ID
          }&lang=${lang}`;

        break;

      default:
        break;
    }

    return (
      <div style={{ width: "100%", height: "100%" }}>
        {this.props.type === "inv_login" ? (
          <div id={"webviewInvs"}>
            {/*<iframe src={url} style={{display:"none"}} />*/}

            {
              //
              //window.open(url,'_blank','location=yes')
              //this.browserAc(url)
            }
          </div>
        ) : (
            <div
              id={"webview"}
              className={
                this.props.type === "logout"
                  ? "webview-logout-background"
                  : "webview-background"
              }
            >
              {this.props.topbar}

              <div className="webview-iframe-container">
                {/*

<div style={{ color:"orange",fontSize:18,alignItems:'center', }}>

Sizi Mercedes-Benz'in Ayrıcalıklı Dünyasına Bağlıyoruz...

</div>*/}

                {this.state.loadingFrame ? (
                  <Loadable
                    text="Sizi Mercedes-Benz'in Ayrıcalıklı Dünyasına Bağlıyoruz..."
                    active={false}
                    spinner={true}
                    animate
                    style={{ position: "absolute", display: "flex" }}
                  />
                ) : null}

                {/*this.state.welcomeMessage ?

<Loadable

text="Sizi Mercedes-Benz'in Ayrıcalıklı Dünyasına Bağlıyoruz..."

active={true}

spinner={true}

animate

style={{position:"absolute", display: "flex"}}

/>

:

null*/}

                {/*<iframe onLoad={this.iFrameLoader} src={url} className="iframe" style={{height:this.state.iframeHeight}} />*/}

                {this.mybrowser(
                  url,
                  this.props,
                  this.loadingStopFunction,
                  this.loadingStartFunction
                )

                  //window.open(url,'_blank','location=yes')

                  //this.browserAc(url)
                }
              </div>
            </div>
          )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    type: state.webview.type,

    authCode: state.user.authCode,

    lang: state.language.selectedLanguage,

    pushToken: state.pushNoti.pushToken
  };
}

WebDisplay.contextTypes = {
  // router: React.PropTypes.object.isRequired,ßßßßß
  // location: React.PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  { showWebview, dismissWebview, validateUser, logout, loadingStart }
)(WebDisplay);
