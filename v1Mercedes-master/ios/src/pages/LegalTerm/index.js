import React, { Component } from 'react'

import { connect } from 'react-redux'

import { logout } from '../../actions/initialAction'

import { hideLegal, toggleFirsttime } from '../../actions/legalAction'

import LegalModalNavigationBar from '../../components/LegalModalNavigationBar'

import LegalTermHome from '../../components/LegalTermHome'

import LegalTermToU from '../../components/LegalTermToU'

import AppDescription from '../../components/LegalTermAppDescription'

import LegalTermNotice from '../../components/LegalTermNotice'

import LegalTermFOSS from '../../components/LegalTermFOSS'

import ThirdPartyContent from '../../components/LegalTermThirdPartyContent'

import DataProtection from '../../components/LegalTermDataProtection'

import AppSupport from '../../components/LegalTermAppSupport'

import T from 'i18n-react'



import { Transition } from 'react-transition-group'

import { fadeDuration, tocFadeStyle, tocFadeStyles } from '../../pages/App/transitions'

import { selectPrefered } from '../../actions/dealerActions';





const legalComponentWraper = (legalComponent, curr, actual) => {

    return (

        <Transition

            in={curr == actual}

            timeout={fadeDuration}

            mountOnEnter={true}

            unmountOnExit={true}>



            {(state) => {

                return (

                    <div style={{

                        ...tocFadeStyle,

                        ...tocFadeStyles[state]

                    }}>

                        {legalComponent}

                    </div>

                )

            }}

        </Transition>

    )

}



class LegalTermPage extends Component {

    constructor(props) {



        super(props)

        this.handleClickDecline = this.handleClickDecline.bind(this)

        this.handleClickAccept = this.handleClickAccept.bind(this)

        this.changeToHomePage = this.changeToHomePage.bind(this)

        this.handleCloseButton = this.handleCloseButton.bind(this)

        this.handleModalCloseBtnClick = this.handleModalCloseBtnClick.bind(this)

        this.pushComponent = this.pushComponent.bind(this)

        this.popComponent = this.popComponent.bind(this)

        this.renderAboutUs = this.renderAboutUs.bind(this)

        this.initLocationService = this.initLocationService.bind(this)

        this.callMeButtons = this.callMeButtons.bind(this);



        this.state = {

            currentPageIndex: 1,

            pageStructure: [1],

            loginStatus: this.props.isUserLogedIn,

            closeButtonState: false,


            showColorFullButtons: false,


        }



        this.pageList = ['About Us', 'App Description', 'Terms of Use', 'Data Protection', 'Free and Open Source Software', 'Thrid Party Content', 'Legal Notice', 'App Support']

    }



    componentWillReceiveProps(np) {


        if (np.transitionState === "exited" || np.transitionState === "entering") {

            // if(this.state.loginStatusthis != np.isUserLogedIn){

            // if(!np.isUserLogedIn){

            // this.setState({

            // currentPageIndex: 1,

            // pageStructure: [1],

            // loginStatus: np.isUserLogedIn,

            // })

            // } else {

            // this.setState({

            // currentPageIndex: 0,

            // pageStructure: [0],

            // loginStatus: np.isUserLogedIn,

            // })

            // }

            // }

            this.setState({

                closeButtonState: np.legalState

            })

        }

    }





    callMeButtons() {



        this.setState({ showColorFullButtons: true });

    }



    componentWillMount() {

        console.log("first time ?", this.props.isFirstTimeOnApp);
        if (!this.props.isFirstTimeOnApp) {

            this.setState({

                closeButtonState: true,

                currentPageIndex: 0,

                pageStructure: [0],

            })

        }

    }



    handleClickDecline(e) {

        if (navigator.notification) {

            navigator.notification.alert(T.translate("legalTerm.declineAlert"), null, "Servisim", T.translate("notification.general.ok"))

        } else {

            window.alert(T.translate("legalTerm.declineAlert"))

        }

        e.preventDefault()

    }



    showPermission() {

        cordova.plugins.deneme.permissionCheck("permissionCheck", function (response) {





            //alert("Metod->"+response);

            //this.setState({status:response})

            //return ""+response;

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



    iospopup() {

        cordova.plugins.perm.popup("popup", function (response) {

            console.log(response);

        }, function (error) {

            console.log(error);


        });

    }



    mobilecheck() {

        if (navigator.userAgent.match(/Android/i)) {

            return "android"

        }

        else {

            if (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i)) {

                return "ios"

            }

        }

    };



    testm() {

        this.askPermission()

    }



    handleClickAccept(e) {

        //alert("Analitik izni gösterme yeri...")

        if (this.mobilecheck() === "android") {

            navigator.notification.confirm(

                'Uygulama deneyiminizi geliştirmek ve kullanıcı ihtiyaçlarına göre şekillendirmek için istatistiksel olarak uygulama kullanım alanları, sıklığı ve kapsamını aylık dönemlerde incelemekteyiz. Bu uygulamayı kullanarak bu analizde bulunmayı kabul etmiş sayılırsınız. Herhangi bir zamanda Ayarlar –> Servisim ekranından bu ayarı değiştirebilirsiniz.', // message

                () => {

                    this.testm();

                    setTimeout(() => {

                        this.handleClickAccept2(e)

                    }, 500)

                }, // callback

                ' Uygulama Analizi', // title

                ['Tamam'] // buttonName

            )

            this.showPermission();


        }

        if (this.mobilecheck() === "ios") {

            //this.iospopup();

            navigator.notification.confirm(

                'Uygulama AnaliziUygulama deneyiminizi geliştirmek ve kullanıcı ihtiyaçlarına göre şekillendirmek için istatistiksel olarak uygulama kullanım alanları, sıklığı ve kapsamını aylık dönemlerde incelemekteyiz. Bu uygulamayı kullanarak bu analizde bulunmayı kabul etmiş sayılırsınız. Herhangi bir zamanda belirtilen ayarlardan bu ayarı değiştirebilirsiniz.iOS Ayarlar > Servisim > Analitik Verisi Kullanım İzni', // message

                () => {



                    setTimeout(() => {

                        this.handleClickAccept2(e)

                    }, 500)

                }, // callback

                ' Uygulama Analizi', // title

                ['Tamam'] // buttonName

            )

        }

        /*navigator.notification.confirm("Analitik izni popup mesajı",(buttonIndex) => {
        
        if(buttonIndex != 0)
        
        {
        
        setTimeout(()=>{
        
        this.handleClickAccept2(e)
        
        },1800)
        
        }else{
        
        this.handleClickAccept(e)
        
        }
        
        },"Analitik Verileri Kullanımı Hakkında",["Tamam"])*/



    }



    handleClickAccept2(e) {

        if (navigator.notification) {

            let notiText = T.translate("notification.push notification.text")

            if (typeof (device) !== "undefined") {

                if (device.platform.toLowerCase() === "android") {

                    notiText = T.translate("notification.push notification.textAndroid")

                }

            }



            navigator.notification.confirm(notiText, (buttonIndex) => {

                if (buttonIndex != 0) {

                    setTimeout(() => {

                        this.props.initNoti()

                    }, 1)



                    setTimeout(() => {

                        this.initLocationService()

                    }, 500)

                } else {

                    this.handleClickAccept2(e)

                }

            }, T.translate("notification.push notification.title"), [T.translate("notification.push notification.reject"), T.translate("notification.push notification.accept")])

        }



        e.preventDefault()

        this.props.toggleFirsttime()



        this.setState({

            currentPageIndex: 0,

            pageStructure: [0],

        })

        this.props.showLogin()

        //alert("Analitik İzni Göster")

        //Analitik izni gösterimi yapılacak

        /*if(this.mobilecheck() === "android"){
        
        navigator.notification.confirm(
        
        'Uygulama deneyiminizi geliştirmek ve kullanıcı ihtiyaçlarına göre şekillendirmek için istatistiksel olarak uygulama kullanım alanları, sıklığı ve kapsamını aylık dönemlerde incelemekteyiz. Bu uygulamayı kullanarak bu analizde bulunmayı kabul etmiş sayılırsınız. Herhangi bir zamanda Ayarlar –> Servisim ekranından bu ayarı değiştirebilirsiniz.', // message
        
        ()=>{this.testm()}, // callback
        
        ' Uygulama Analizi', // title
        
        ['Tamam'] // buttonName
        
        ) 
        
        this.showPermission();
        
        
        }
        
        if(this.mobilecheck() === "ios"){
        
        this.iospopup();
        
        }*/

    }



    initLocationService() {



        let notiText = T.translate("notification.location.text")

        if (typeof (device) !== "undefined") {

            if (device.platform.toLowerCase() === "android") {

                notiText = T.translate("notification.location.textAndroid")

            }

        }



        navigator.notification.confirm(notiText, (buttonIndex) => {

            if (buttonIndex != 0) {

                if (navigator.geolocation) {

                    navigator.geolocation.getCurrentPosition(

                        position => { },

                        err => { },

                        { timeout: 15000 },

                    )

                }



                //Analitik izni bu kısımda da gösterilebilir. Bu kısım navigation izninden sonra gösterilecek olan kısım.



            } else {

                this.initLocationService()

            }

        }, T.translate("notification.location.title"), [T.translate("notification.location.reject"), T.translate("notification.location.accept")])

    }



    changeToHomePage() {

        //this.context.router.replace('/vehicleMain')

    }



    handleCloseButton() {

        this.setState({

            currentPageIndex: 0,

            pageStructure: [0],

        })

        this.props.hideLegal()

    }



    handleModalCloseBtnClick() {

        this.setState({

            currentPageIndex: 0,

            pageStructure: [0],

        })

        this.props.hideLegal()

    }



    handleModalBackBtnClick(previousPageIndex) {

        this.setState({

            currentPageIndex: previousPageIndex,

        })

    }



    pushComponent(pageIndex) {

        this.setState({

            pageStructure: [...this.state.pageStructure, pageIndex],

            currentPageIndex: pageIndex,

        })

    }



    popComponent(pageIndex) {

        // console.log("pageIndex to show:", pageIndex)

        // console.log(this.state.pageStructure)

        let temp = this.state.pageStructure

        temp.pop()

        this.setState({

            pageStructure: temp,

            currentPageIndex: pageIndex,

        })

    }



    renderAboutUs() {

        return (

            <LegalTermHome

                showCloseButton={false}

                showAcceptButton={!this.props.legalState}

                showDeclineButton={false}

                handleClickDecline={this.handleClickDecline}

                handleClickAccept={this.handleClickAccept}

                changeToHomePage={this.changeToHomePage}

                handleCloseButton={this.handleCloseButton}

                pushComponent={this.pushComponent}

                showPage={true}

                deviceType={this.props.deviceType}

            />

        )

    }



    renderToU() {

        let show = false

        if (this.props.isUserLogedIn) {

            show = this.props.legalState

        } else {

            show = true

        }



        let showA = !this.props.isUserLogedIn

        let showB = showA

        if (this.props.hideButtons) {

            show = true

            showA = false

            showB = false

        }

        return (

            <LegalTermToU

                showCloseButton={false}

                showAcceptButton={showA}

                showDeclineButton={showB}

                handleClickDecline={this.handleClickDecline}

                handleClickAccept={this.handleClickAccept}

                changeToHomePage={this.changeToHomePage}

                handleCloseButton={this.handleCloseButton}

                pushComponent={this.pushComponent}

                showPage={true}

                deviceType={this.props.deviceType}

                count={0}

                fnc={this.callMeButtons}

                buttonsAreActive={this.state.showColorFullButtons}

            />

        )

    }



    renderAppDescription() {

        return (

            <AppDescription

                deviceType={this.props.deviceType}

            />

        )

    }



    renderLegalNotice() {

        return (

            <LegalTermNotice

                deviceType={this.props.deviceType}

            />

        )

    }



    renderFOSS() {

        return (

            <LegalTermFOSS

                deviceType={this.props.deviceType}

            />)

    }



    render3rdParty() {

        return (

            <ThirdPartyContent

                deviceType={this.props.deviceType}

            />

        )

    }



    renderDataProtection() {

        return (

            <DataProtection

                deviceType={this.props.deviceType}

            />

        )

    }



    renderAppSupport() {

        return (

            <AppSupport

                deviceType={this.props.deviceType}

            />

        )

    }



    render() {

        return (

            <div style={{ width: "100%", height: "100%", backgroundColor: "black" }}>

                <LegalModalNavigationBar

                    backBtnClicked={this.popComponent}

                    closeBtnClicked={this.handleModalCloseBtnClick}

                    showCloseButton={this.state.closeButtonState}

                    currentPageIndex={this.state.currentPageIndex}

                    pageList={this.pageList}

                    pageStructure={this.state.pageStructure}

                />

                <div style={{ width: "100%", height: "calc(100% - var(--main-nav-height))", position: "relative" }}>

                    {legalComponentWraper(this.renderAboutUs(), this.state.currentPageIndex, 0)}

                    {legalComponentWraper(this.renderToU(), this.state.currentPageIndex, 1)}

                    {legalComponentWraper(this.renderAppDescription(), this.state.currentPageIndex, 2)}

                    {legalComponentWraper(this.renderLegalNotice(), this.state.currentPageIndex, 3)}

                    {legalComponentWraper(this.renderFOSS(), this.state.currentPageIndex, 4)}

                    {legalComponentWraper(this.render3rdParty(), this.state.currentPageIndex, 5)}

                    {legalComponentWraper(this.renderDataProtection(), this.state.currentPageIndex, 6)}

                    {legalComponentWraper(this.renderAppSupport(), this.state.currentPageIndex, 7)}

                </div>

            </div>

        )

    }

}



function mapStateToProps(state) {

    return {

        loaded: state.loading.loaded,

        selectedLanguage: state.language.selectedLanguage,

        legalState: state.legal.toc_Show,

        isUserLogedIn: state.user.isLogin,

        isFirstTimeOnApp: state.legal.isFirstTimeOnApp

    }

}



export default connect(mapStateToProps, { logout, hideLegal, toggleFirsttime })(LegalTermPage)
