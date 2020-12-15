import React, { Component, PropTypes } from 'react'
import './scrollablePanel.css'

let sCount = 0

export default class ScrollablePanel extends Component {

  constructor(props){
    super(props)
    this.state = {
      extraScroll : null,
      bgClassName : 'bp_contentArea_background',
      bgOpacity : 1,
      type : this.props.type ? this.props.type : null,
      generatedId : "scrollablePanel_main_" + sCount++ + "_" + Math.floor((Math.random() * 10000)),
    }
    this.startPointYFocusPrev = 0
    this.startPointY = 0
    this.startPointYFocus = 0
    this.moveSpeed = 0
    this.scrollAnimate = null
  }

  getType(type){
    var temp = "bg_shade_black"
    if(type === "white"){
      temp = "bg_shade_white"
    }
    return "bp_contentArea_background " + temp
  }

  componentDidMount() {
    var box = document.getElementById(this.state.generatedId)

    box.addEventListener("scroll",(ev,a,b) => {

      if(this.state.extraScroll == null){
        this.setState({extraScroll : (box.scrollHeight - box.clientHeight)})
        if(box.clientHeight + box.scrollTop < box.scrollHeight){
          this.setState({bgClassName : this.getType(this)})
        }
      }

      if(box.clientHeight + box.scrollTop < box.scrollHeight){
          this.setState({bgClassName : this.getType(this)})
      }else{
          this.setState({bgClassName : ""})
      }
      var opac = (this.state.extraScroll - box.scrollTop) / this.state.extraScroll

      this.setState({bgOpacity : opac !== "NaN" ? opac : 0})

    })

    this.setState({
      bgClassName : this.getType(this.state.type),
    })

    var extraScroll = box.scrollHeight - box.clientHeight

    if(this.state.extraScroll !== extraScroll)
    {

      this.setState({extraScroll : extraScroll})

      if(box.clientHeight + box.scrollTop < box.scrollHeight){
        this.setState({bgClassName : this.getType(this.state.type)})
      }else{
        this.setState({bgClassName : ""})
      }

      var opac = (extraScroll - box.scrollTop) / extraScroll
      this.setState({bgOpacity : !isNaN(opac) ? opac : 0})
    }
  }

  componentWillReceiveProps(np){
    var box = document.getElementById(this.state.generatedId)

    var extraScroll = box.scrollHeight - box.clientHeight

    this.setState({
      type : np.type,
      extraScroll : extraScroll,
    })

  }

  componentDidUpdate(pp,np){

    var box = document.getElementById(this.state.generatedId)
    var extraScroll = box.scrollHeight - box.clientHeight

    if(this.state.extraScroll !== extraScroll)
    {

      this.setState({extraScroll : extraScroll})

      if(box.clientHeight + box.scrollTop < box.scrollHeight){
        this.setState({bgClassName : this.getType(np.type)})
      }else{
        this.setState({bgClassName : ""})
      }

      var opac = (extraScroll - box.scrollTop) / extraScroll
      this.setState({bgOpacity : !isNaN(opac) ? opac : 0})
    }

  }

  render(){
    return (
      <div className="scrollablePanel_main">

        <div className={this.getType(this.props.type)} style={{opacity:(this.state.bgOpacity)}}></div>

        <div id={this.state.generatedId} className={"scrollablePanel_content scrollablePanel_content_A"}>
          {this.props.children}
        </div>

      </div>
    )
  }
}

ScrollablePanel.propTypes = {
  type : PropTypes.oneOf(['black','white']),
}
