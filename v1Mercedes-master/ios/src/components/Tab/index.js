import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import T from 'i18n-react'
import Tabs from '../../components/CustomReactSwipeableTabs';
import ScrollablePanel from '../ScrollablePanel'
import { Transition } from 'react-transition-group'
import { fadeDuration, fixFadeStyle, transitionfadeStyles, mainMenuFadeStyles } from '../../pages/App/transitions'

import './tab.css'

export default class Tab extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tabSize : this.props.list.length,
      currentTab : 0,
      list : this.props.list,
      activeItemIndex: 0,
      stiffness: 170,
      resistanceCoeffiecent: 0.5,
      damping: 26,
      safeMargin: 60,
      items : this.props.list.map(item => { return {title : item.tabname} }),
      selectedLanguage : props.selectedLanguage,
    }
  }

  componentWillReceiveProps(np){
    if(np.selectedLanguage !== this.state.selectedLanguage){
      this.setState({
        items : np.list.map(item => { return {title : item.tabname} }),
        selectedLanguage : np.selectedLanguage,
      })
    }
  }

  render(){
    return(
      <div className="tabContainer">
        <div className="tabHeader">
          <div className="tabHeaderInner">
            <Tabs
              noFirstLeftPadding={false}
              noLastRightPadding={false}
              paddingTopBottomSize={this.props.paddingTopBottomSize}
              paddingLeftRightSize={this.props.paddingLeftRightSize}
              fitItems={false}
              resistanceCoeffiecent={this.state.resistanceCoeffiecent}
              stiffness={this.state.stiffness}
              damping={this.state.damping}
              safeMargin={this.state.safeMargin}
              borderWidthRatio={1}
              activeItemIndex={this.state.activeItemIndex}
              onItemClick={(item, index) => {
                if(this.props.triggerStats){
                  this.props.triggerStats(this.state.list[index].aaname)
                }
                this.setState({ activeItemIndex: index })
              }}
              items={this.state.items}
              borderPosition="bottom"
              borderThickness={2}
              borderColor="#00adef"
              activeStyle={{
                color: '#ffffff'
              }}
            />
          </div>
        </div>
        <div className="tabSpace"></div>
        <div className="tabContent">
          { this.state.list.map((item, index) => {
            return (
              <Transition
                in={this.state.activeItemIndex === index}
                timeout={fadeDuration}
                key={item.tabname+index}
              >
              {
                (state) => {
                  return (
                    <div style={{overflow:"auto",width:"100%",height:"100%", position:"absolute", ...fixFadeStyle, ...mainMenuFadeStyles[state]}}>
                      {item.component}
                    </div>
                  )
                }
              }

              </Transition>
            )
          })}
        </div>
      </div>
    )}
}

Tab.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      tabname: PropTypes.string,
      component: PropTypes.object,
    })
  ).isRequired,
  paddingTopBottomSize : PropTypes.string,
  paddingLeftRightSize : PropTypes.string,
}
