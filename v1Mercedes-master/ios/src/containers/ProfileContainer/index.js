
import React, { Component } from 'react'

import { connect } from 'react-redux'

import T from 'i18n-react'

import WebDisplay from '../../components/CIAM/WebDisplay'

import { dismissWebview, showWebview } from '../../actions/webDisplayAction'

import TextButton from '../../components/TextButton'

import { Transition } from 'react-transition-group'

import { transitUpStyles, transitUpStyle, transitUpDuration } from '../../pages/App/transitions'

import './profile.css'

import Loadable from 'react-loading-overlay'

import { logout } from '../../actions/initialAction'



class ProfileContainer extends Component {



    constructor(props) {

        super(props)

        this.state = { welcomeMessage: false }

        this.mybrowser = this.mybrowser.bind(this);

        this.loadingStopFunction = this.loadingStopFunction.bind(this);

        this.loadingStartFunction = this.loadingStartFunction.bind(this);

    }



    componentDidMount() {

    }



    loadingStopFunction() {

        this.setState({ welcomeMessage: false });

        //alert("loading frame : "+this.state.loadingFrame);

    }


    loadingStartFunction() {

        this.setState({ welcomeMessage: true });

        //alert("Start function : "+this.state.loadingFrame);

    }



    mybrowser(prp, stopCallback, startCallback, urlType) {

        let lang = 'tr-TUR'

        if (this.props.lang === "TURKISH") {

            lang = 'tr'

        }

        var url = "";

        if (urlType === "change-name") {

            url = configs.CIAM_POINT_LOGIN + "/profile/edit/data?app-id=" + configs.CIAM_APP_ID + "&lang=" + "tr-TUR";

        } else if (urlType === "change-email") {

            //logout

            url = configs.CIAM_POINT_LOGIN + "/profile/edit/email?app-id=" + configs.CIAM_APP_ID + "&lang=" + "tr-TUR";

        }

        else if (urlType === "change-mobile") {

            url = configs.CIAM_POINT_LOGIN + "/profile/edit/mobile?app-id=" + configs.CIAM_APP_ID + "&lang=" + "tr-TUR";

        }

        else if (urlType === "change-password") {

            url = configs.CIAM_POINT_LOGIN + "/profile/edit/password?app-id=" + configs.CIAM_APP_ID + "&lang=" + "tr-TUR";

        }

        //var loginUrl = configs.CIAM_POINT_API+"/oidc10/auth/oauth/v2/authorize?response_type=code&client_id="+configs.CIAM_CLIENTID+"&redirect_uri=https%3A%2F%2F"+configs.WEBAPP_ENDPOINT_SHORT+"%2Flogin-cb&scope=openid%20ciam-uid%20phone%20email%20profile&ui_locales="+lang;

        //var registerUrl = configs.CIAM_POINT_LOGIN+"/profile/register?app-id="+configs.CIAM_APP_ID+"&amp;style=responsive&lang="+lang;


        var inp = cordova.InAppBrowser.open(url, '_blank', 'location=no,closebuttoncolor=#02afff,closebuttoncaption=Kapat,toolbarcolor=#ffffff');

        inp.addEventListener('loadstop', function (event) {


            if (event.url.indexOf("code") != -1) {

                startCallback();

                var startCode = event.url.indexOf("code") + 5; // 'code=' -> 5 character

                var codeUrl = event.url;

                var codeUrlCallback = event.url.substring(startCode, codeUrl.length);

                let deviceTT = 0

                if (device.platform.toLowerCase() === "ios") {

                    deviceTT = 2

                } else if (device.platform.toLowerCase() === "android") {

                    deviceTT = 1

                }


                prp.validateUser(codeUrlCallback, deviceTT, null, prp.type === "inv_login");

                inp.hide();


                setTimeout(() => {

                    //prp.dismissWebview();

                    stopCallback();

                    inp.hide();

                    inp.close();

                }, 5000);

                inp.close();

            }

            /*else if(event.url.indexOf("logout")!=-1)
            
            {
            
            prp.logout();
            
            prp.dismissWebview();
            
            setTimeout(()=>{
            
            inappBrowser.close();
            
            prp.dismissWebview();
            
            },2000);
            
            
            }*/

            else if (event.url.indexOf("login-cb") != -1) {

                startCallback();

                inp.hide();

                setTimeout(() => {

                    stopCallback();

                    inp.close();

                }, 1000);

                if (urlType === "change-email") {

                    navigator.notification.alert("Profil bilgilerinizin güncellenebilmesi için tekrar giriş yapmanız gerekmektedir.", () => prp.logout(), "Uyarı", "Tamam")

                }
                else if (urlType === "change-name") {

                    navigator.notification.alert("Profil bilgilerinizin güncellenebilmesi için tekrar giriş yapmanız gerekmektedir.", () => prp.logout(), "Uyarı", "Tamam")


                }
                else if (urlType === "change-mobile") {

                    navigator.notification.alert("Profil bilgilerinizin güncellenebilmesi için tekrar giriş yapmanız gerekmektedir.", () => prp.logout(), "Uyarı", "Tamam")



                }
                else if (urlType === "change-password") {
                    navigator.notification.alert("Profil bilgilerinizin güncellenebilmesi için tekrar giriş yapmanız gerekmektedir.", () => prp.logout(), "Uyarı", "Tamam")

                }




            }

            else if (event.url === null || event.url === "") {

                inp.close();

            }


        });


    }



    render() {

        // console.log(this.props.user)

        return (

            <div>

                <div className="settings-container">

                    <div className="settings-group-container">

                        <div className="settings-group-sub-header">

                            {T.translate("profile.personal.name")}

                        </div>

                        <div className="settings-group-preferred-container">

                            <div className="settings-group-preferred-text">

                                {this.props.user ? `${this.props.user.firstName} ${this.props.user.lastName}` : '-'}

                            </div>

                            <TextButton

                                buttonText={T.translate("profile.personal.button.edit")}

                                paddingTop={true}

                                paddingLeft={true}

                                paddingRight={true}

                                paddingBottom={true}

                                //onclick={()=>this.props.showWebview('change-name')}

                                onclick={() => { this.mybrowser(this.props, this.loadingStopFunction, this.loadingStartFunction, "change-name") }}

                            />

                        </div>

                    </div>

                    <div className="settings-group-container">

                        <div className="settings-group-sub-header">

                            {T.translate("profile.personal.email address")}

                        </div>

                        <div className="settings-group-preferred-container">

                            <div className="settings-group-preferred-text">

                                {this.props.user && this.props.user.email ? `${this.props.user.email}` : '-'}

                            </div>

                            <TextButton

                                buttonText={T.translate("profile.personal.button.edit")}

                                paddingTop={true}

                                paddingLeft={true}

                                paddingRight={true}

                                paddingBottom={true}

                                //onclick={()=>this.props.showWebview('change-email')}

                                onclick={() => { this.mybrowser(this.props, this.loadingStopFunction, this.loadingStartFunction, "change-email") }}

                            />

                        </div>

                    </div>

                    <div className="settings-group-container">

                        <div className="settings-group-sub-header">

                            {T.translate("profile.personal.mobile number")}

                        </div>

                        <div className="settings-group-preferred-container">

                            <div className="settings-group-preferred-text">

                                {this.props.user && this.props.user.mobilePhone ? `${this.props.user.mobilePhone}` : '-'}

                            </div>

                            <TextButton

                                buttonText={T.translate("profile.personal.button.edit")}

                                paddingTop={true}

                                paddingLeft={true}

                                paddingRight={true}

                                paddingBottom={true}

                                //onclick={()=>this.props.showWebview('change-mobile')}

                                onclick={() => { this.mybrowser(this.props, this.loadingStopFunction, this.loadingStartFunction, "change-mobile") }}

                            />

                        </div>

                    </div>

                    <div className="settings-group-container">

                        <div className="settings-group-sub-header">

                            {T.translate("profile.personal.password")}

                        </div>

                        <div className="settings-group-preferred-container">

                            <div className="settings-group-preferred-text">

                                **********

</div>

                            <TextButton

                                buttonText={T.translate("profile.personal.button.change")}

                                paddingTop={true}

                                paddingLeft={true}

                                paddingRight={true}

                                paddingBottom={true}

                                //onclick={()=>this.props.showWebview('change-password')}

                                onclick={() => { this.mybrowser(this.props, this.loadingStopFunction, this.loadingStartFunction, "change-password") }}

                            />

                        </div>

                    </div>

                </div>

            </div>

        )

    }

}



function mapStateToProps(state) {

    return {

        selectedLanguage: state.language.selectedLanguage,

        webviewStatus: state.webview.status,

        user: state.user,

    }

}



export default connect(mapStateToProps, { dismissWebview, showWebview, logout })(ProfileContainer)
