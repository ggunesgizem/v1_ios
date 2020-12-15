import React, { Component } from 'react'
import Loadable from 'react-loading-overlay'

export default class ExternalWebFrame extends Component {
  constructor(props){
    super(props)
    this.iFrameLoader = this.iFrameLoader.bind(this)
    this.state = {
      loadingFrame : true
    }
  }

  iFrameLoader (){
    this.setState({
      loadingFrame : false
    })
  }

  render(){

    let url  = this.props.externalWebFrameUrl
    return (
      <div id="webview" className="webview-background">
        <div className="modal-navi-bar-container">
          <button className="modal-navi-bar-backBtn" disabled={true}/>
          <button className="modal-navi-bar-crossBtn" onClick={this.props.dissmissview}/>
        </div>
        <div className="webview-iframe-container">
        { this.state.loadingFrame ?
          <Loadable
            active={true}
            spinner={true}
            animate
            style={{position:"absolute", display: "flex"}}
          />
          :
          null
        }
        {url !== "" ?
          <iframe onLoad={this.iFrameLoader} src={url} className="iframe" />
          :
          null
        }
        </div>
      </div>
    )
  }
}
