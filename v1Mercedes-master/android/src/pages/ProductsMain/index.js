import React, { Component } from 'react'
import TopBar from '../../components/TopBar'
import '../page.css'
import Tab from '../../components/Tab'
import AccessoriesContainer from '../../containers/AccessoriesContainer'
import CollectionsContainer from '../../containers/CollectionsContainer'
import { Transition } from 'react-transition-group'
import { transitLeftDuration, transitLeftStyle, transitLeftStyles } from '../../pages/App/transitions'
import DealerSettingContainer from '../../containers/DealerSettingContainer'
import T from 'i18n-react'

const ChildTransition = (child, status) => {
  return (
    <Transition
      in={child.props.type === status}
      unmountOnExit={false}
      mountOnEnter={false}
      timeout={transitLeftDuration}
    >
      {(state) => {
        return (
          <div style={{
             ...transitLeftStyle,
             ...transitLeftStyles[state]
           }}>
            {child}
          </div>
        )
      }}
      </Transition>
  )
}

export default class ProductsMain extends Component {

  constructor(props){
    super(props)
    this.triggerStats = this.triggerStats.bind(this)
  }

  mobilecheck () {
    if( navigator.userAgent.match(/Android/i)){
      return "android"
    }
    else{
      if(navigator.userAgent.match(/iPhone/i)){
        return "ios"
      }
    }
  };

  componentDidMount() {
  }

  triggerStats(item){
    //AAnalytics
   /*if(window.ADB){
      window.ADB.trackState('products',{'subtab':item})
     }*/


     if(this.mobilecheck()==="android"){
      cordova.plugins.deneme.permissionCheck("permissionCheck", function(response){

 
        if(window.ADB && response==="PermissionIsOpen"){
          window.ADB.trackState('products',{'subtab':item})
         }
        
       });
    
    }
    if(this.mobilecheck()==="ios"){
      cordova.plugins.perm.permCheck("permCheck", function(response){

 
        if(window.ADB && response==="True"){
          window.ADB.trackState('products',{'subtab':item})
         }
        
       });
    
    }



  }

  render() {
    const style = {
      display : this.props.active ? "flex" : "none"
    }
    let items = [{
      aaname: "accessories",
      tabname : T.translate("products.accessories"),
      component : <AccessoriesContainer
                    router={this.props.router}
                    topbar={this.props.topbar}
                    showAccessories={this.props.showAccessories}
                    />
    },
    {
      aaname: "collections",
      tabname : T.translate("products.collections"),
      component : <CollectionsContainer
        router={this.props.router}
        topbar={this.props.topbar}
        showCollections={this.props.showCollections}/>
    },]

    return (
      <div className="productsMainContainer" style={style}>
        <Transition
          in={"accessory" === this.props.currType}
          unmountOnExit={false}
          mountOnEnter={false}
          timeout={transitLeftDuration}
        >
          {(state) => {
            return (
              <div style={{
                 ...transitLeftStyle,
                 ...transitLeftStyles[state],
                 height:"calc(100% - var(--main-nav-height))",
               }}>
                {this.props.children[0]}
              </div>
            )
          }}
          </Transition>

          <Transition
            in={"collection" === this.props.currType}
            unmountOnExit={false}
            mountOnEnter={false}
            timeout={transitLeftDuration}
          >
            {(state) => {
              return (
                <div style={{
                   ...transitLeftStyle,
                   ...transitLeftStyles[state],
                   height:"calc(100% - var(--main-nav-height))",
                 }}>
                  {this.props.children[1]}
                </div>
              )
            }}
            </Transition>
          <div className="productsMains">
            <Tab
              triggerStats={this.triggerStats}
              list={items}
              paddingTopBottomSize={"4px"}
              paddingLeftRightSize={"12px"}
              selectedLanguage={this.props.selectedLanguage}
              />
          </div>
      </div>
    )
  }
}
