import React, { Component } from 'react'

import { connect } from 'react-redux'

import T from 'i18n-react'

import { logout, patchDeviceID, } from '../../actions/initialAction'

import { validateUser } from '../../actions/userActions'

import { selectLanguage } from '../../actions/languageAction'

// import { showRegistrationPage, hideRegistrationPage } from '../../actions/userActions'

import WebDisplay from '../../components/CIAM/WebDisplay'

import TopBar from '../../components/TopBar'

import TextButton from '../../components/TextButton'

import { dismissWebview, showWebview } from '../../actions/webDisplayAction'

import './login.css'

import Loadable from 'react-loading-overlay'



var durum = "asdasdasd";

class LoginContainer extends Component {

    constructor(props) {

        super(props)

        this.state = { status: "A", isPopupShown: false, welcomeMessage: false }

        this.mybrowser = this.mybrowser.bind(this);

        this.loadingStopFunction = this.loadingStopFunction.bind(this);

        this.loadingStartFunction = this.loadingStartFunction.bind(this);

    }



    iospopup() {

        cordova.plugins.perm.popup("popup", function (response) {

            console.log(response);

        }, function (error) {

            console.log(error);


        });

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


        let lang = 'en_US'

        if (this.props.lang === "TURKISH") {

            lang = 'tr'

        }

        var url = "";

        if (urlType === "login") {

            url = configs.CIAM_POINT_API + "/oidc10/auth/oauth/v2/authorize?response_type=code&client_id=" + configs.CIAM_CLIENTID + "&redirect_uri=https%3A%2F%2F" + configs.WEBAPP_ENDPOINT_SHORT + "%2Flogin-cb&scope=openid%20ciam-uid%20phone%20email%20profile&ui_locales=" + "tr-TUR";

        } else if (urlType === "register") {

            url = configs.CIAM_POINT_LOGIN + "/profile/register?app-id=" + configs.CIAM_APP_ID + "&amp;style=responsive&lang=" + "tr-TUR";

        }

        //var loginUrl = configs.CIAM_POINT_API+"/oidc10/auth/oauth/v2/authorize?response_type=code&client_id="+configs.CIAM_CLIENTID+"&redirect_uri=https%3A%2F%2F"+configs.WEBAPP_ENDPOINT_SHORT+"%2Flogin-cb&scope=openid%20ciam-uid%20phone%20email%20profile&ui_locales="+lang;

        //var registerUrl = configs.CIAM_POINT_LOGIN+"/profile/register?app-id="+configs.CIAM_APP_ID+"&amp;style=responsive&lang="+lang;



        var inp = cordova.InAppBrowser.open(url, '_blank', 'location=no,toolbar=yes,closebuttoncolor=#02afff,closebuttoncaption=Kapat,toolbarcolor=#ffffff,clearcache=yes,clearsessioncache=yes');

        inp.addEventListener('loadstop', function (event) {



            if (event.url.indexOf("code") != -1) {



                var startCode = event.url.indexOf("code") + 5; // 'code=' -> 5 character

                var codeUrl = event.url;

                var codeUrlCallback = event.url.substring(startCode, codeUrl.length);

                let deviceTT = 0

                if (device.platform.toLowerCase() === "ios") {

                    deviceTT = 2

                } else if (device.platform.toLowerCase() === "android") {

                    deviceTT = 1

                }


                prp.validateUser(codeUrlCallback, deviceTT, window.registerID, prp.type === "inv_login");
                startCallback();
                inp.hide();


                setTimeout(() => {

                    //prp.dismissWebview();

                    stopCallback();


                }, 8000);

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

            else if (event.url.indexOf("ciam-callback") != -1) {

                startCallback();

                inp.hide();

                setTimeout(() => {

                    stopCallback();

                    inp.close();

                }, 1000);

                prp.logout();



            }

            else if (event.url === null || event.url === "") {

                inp.close();

            }



        });

        inp.addEventListener('loaderror', function (event) {
            alert(JSON.stringify(event));
        });



    }







    showPermission() {

        cordova.plugins.deneme.permissionCheck("permissionCheck", function (response) {


        });

    }





    askPermission() {

        cordova.plugins.deneme.permissionAsk("permissionAsk", function (response) {

            console.log(response);

            //alert(response);

        }, function (error) {

            console.log(error);

            //alert(error);

        });

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


    iab_controller = (function () {
        var ref, isOpen = false;

        return {
            open: function (url) {
                ref = cordova.InAppBrowser.open(url, '_blank', 'location=no,closebuttoncolor=#02afff,closebuttoncaption=Kapat,toolbarcolor=#ffffff');
                isOpen = true;
                return ref;
            },
            close: function () {
                if (isOpen) {
                    ref.close();
                    ref = null;
                    isOpen = false;
                }
            },
            isOpen: function () {
                return isOpen;
            },
            isClosed: function () {
                return !isOpen;
            }
        };

    })();


    testm() {

        this.askPermission()

    }



    componentDidMount() {
        //var br = cordova.InAppBrowser.open(null,'_blank','location=no,toolbar=no,clearcache=yes,clearsessioncache=yes');
        //br.close();
        //alert(this.iab_controller.isClosed())


    }



    componentWillMount() {


        //alert("Popup Shown : "+this.props.showAcceptButton);

        /*
        
        if(this.state.isPopupShown === false)
        
        {
        
        if(this.mobilecheck() === "android"){
        
        navigator.notification.confirm(
        
        'Uygulama deneyiminizi geliştirmek ve kullanıcı ihtiyaçlarına göre şekillendirmek için istatistiksel olarak uygulama kullanım alanları, sıklığı ve kapsamını aylık dönemlerde incelemekteyiz. Bu uygulamayı kullanarak bu analizde bulunmayı kabul etmiş sayılırsınız. Herhangi bir zamanda Ayarlar –> Servisim ekranından bu ayarı değiştirebilirsiniz.', // message
        
        ()=>{this.testm()}, // callback
        
        ' Uygulama Analizi',// title
        
        ['Tamam'] // buttonName
        
        ) 
        
        this.showPermission();
        
        
        }
        
        if(this.mobilecheck() === "ios"){
        
        this.iospopup();
        
        }
        
        this.setState({ isPopupShown : true });
        
        
        
        }
        
        */


    }








    // closeRegistration() {

    // this.props.hideRegistrationPage()

    // }



    render() {

        if (this.state.status !== 'A') {

            alert("is this working?.." + this.state.status)

        }

        return (

            <div id="login-container" className="login-container">

                <div style={{ "height": "100%" }}>



                    {this.props.topbar}



                    <div className="login-title-button-container">

                        <div className="login-title-group">

                            <div className="login-icon" />

                            <div className="login-title">

                                <T.span text='login.title' />

                            </div>

                        </div>

                        <div className="login-input-group">

                            <TextButton

                                buttonText={T.translate("login.register")}

                                paddingTop={true}

                                paddingLeft={true}

                                paddingRight={true}

                                paddingBottom={true}

                                onclick={() => { this.mybrowser(this.props, this.loadingStopFunction, this.loadingStartFunction, "register") }}

                            />

                            {

                                /*
                                
                                <button type="button" className="login-btn tocMani" onClick={() => this.props.showWebview('login')}></button> 
                                
                                */

                            }



                            {this.state.welcomeMessage ?

                                <Loadable

                                    text="Sizi Mercedes-Benz'in Ayrıcalıklı Dünyasına Bağlıyoruz..."

                                    active={true}

                                    spinner={false}

                                    animate

                                    style={{ position: "absolute", opacity: 1, background: 'black', zIndex: 9000, display: "flex" }}

                                />

                                :

                                null

                            }



                            <button type="button" className="login-btn tocMani" onClick={() => { this.mybrowser(this.props, this.loadingStopFunction, this.loadingStartFunction, "login") }}>

                                <T.span text='login.login' />

                            </button>



                        </div>

                    </div>



                </div>

            </div>

        )

    }

}



LoginContainer.contextTypes = {

    router: React.PropTypes.object.isRequired

}



LoginContainer.propTypes = {

    logout: React.PropTypes.func,

    login: React.PropTypes.func,

    isLogin: React.PropTypes.bool,

    vehicles: React.PropTypes.array,

}



function mapStateToProps(state) {

    return {

        vehicles: state.vehicle.all,

        isLogin: state.user.isLogin,

        loaded: state.loading.loaded,

        email: state.user.email,

        selectedLanguage: state.language.selectedLanguage,

        webviewStatus: state.webview.status,

        webviewType: state.webview.type,

        // registrationView: state.user.registrationRequired,

    }

}

export default connect(mapStateToProps, { logout, selectLanguage, dismissWebview, showWebview, validateUser })(LoginContainer)