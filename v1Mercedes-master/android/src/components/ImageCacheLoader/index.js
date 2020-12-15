import React, { Component } from 'react'
import Img from 'react-image'
import ImgCache, { isCacheUp, blobURL } from '../../cache'
import Loadable from 'react-loading-overlay'
import * as ImageDL from './controller'

import './imgLoader.css'

let imageCount = 0
let imageMap = new Map()

export default class ImageCacheLoader extends Component {

  constructor(props){
    super(props)
    this.loader = this.buildLoader()
    this.setImage = this.setImage.bind(this)
    this.state = {
      src : props.src,
      isLoaded : false,
      target : this.loader,
      inView : false,
      inViewBefore: false,
      imgId : "image"+ imageCount++,
    }
  }

  buildLoader(){
    return (
      <Loadable
        active={true}
        spinner={true}
        animate
        background={"rgba(0,0,0,0.3)"}
        style={{position:"absolute",width:"100%", height:"100%"}}
      />
    )
  }

  componentWillReceiveProps(np){
    if(np.src !== this.state.src){

      this.processImage(np.src)
      this.setState({
        isLoaded : false,
        src : np.src,
      })
    }

  }

  processImage(src){

    var setI = (src,key) =>{
      if(src){
        imageMap.set(key,src)
      }
      document.getElementById(this.state.imgId).src = src ? src : this.state.src
      document.getElementById(this.state.imgId).setAttribute("class","imgFadeIn")
    }

    var usedImage = imageMap.get(this.state.src)
    if(usedImage){
      setI(usedImage,this.state.src)
    }else{
      var worker = new Worker(blobURL)

      worker.onmessage = function(e) {
        //console.log(e.data);
        var e = JSON.parse(e.data)
        if(e.status === 'success'){
          setI(e.srs,e.key)
        }else{
          setI()
        }
      }

      worker.postMessage({ src : src });
    }
  }


  setImage(src){
    this.setState({
      target : <Img style={{width:'100%',height:'100%',objectFit: this.props.fit ? this.props.fit : ""}} src={[src]} loader={this.loader}/>
    })
  }

  componentDidMount(){
    document.getElementById(this.state.imgId).onload = (e) => {
      this.setState({
        isLoaded : true,
      })
    }

    this.processImage(this.state.src)
    // if(isCacheUp){
    //
    //
    //     ImgCache.isCached(this.state.src, (path, success) => {
    //
    //       if (success) {
    //         // already cached
    //         ImgCache.getCachedFileURL(path,(originSrc,cacheSrc) => {
    //           this.setState({
    //             target : <Img style={{width:'100%',height:'100%', objectFit: this.props.fit ? this.props.fit : ""}} src={[cacheSrc,originSrc]} loader={this.loader}/>
    //           })
    //         })
    //
    //       } else {
    //
    //         setTimeout(() => {
    //           // not there, need to cache the image
    //           ImgCache.cacheFile(path, (a,b,c) => {
    //             ImgCache.getCachedFileURL(path, (originSrc,cacheSrc) => {
    //               this.setState({
    //                 target : <Img style={{width:'100%',height:'100%',objectFit: this.props.fit ? this.props.fit : ""}} src={[cacheSrc,originSrc]} loader={this.loader}/>
    //               })
    //             })
    //           }, (err) => {
    //             this.setState({
    //               target : <Img style={{width:'100%',height:'100%', objectFit: this.props.fit ? this.props.fit : ""}} src={path} loader={this.loader}/>
    //             })
    //           })
    //         }, Math.floor((Math.random() * 2000)))
    //
    //       }
    //     })
    //
    //
    // }else{
    //   console.log("is not cache");
    //   this.setState({
    //     target : <Img style={{width:'100%',height:'100%', objectFit: this.props.fit ? this.props.fit : ""}} src={[this.state.src]} loader={this.loader}/>
    //   })
    // }

    // var random = Math.floor((Math.random() * 2000))
    // console.log("inside", random);
    // var blob = new Blob(["onmessage = function(e) { postMessage('"+random+ " msg from worker'); }"]);
    //
    // // Obtain a blob URL reference to our worker 'file'.
    // var blobURL = window.URL.createObjectURL(blob);
    //
    // var worker = new Worker(blobURL);
    // worker.onmessage = function(e) {
    //   console.log(random, " msg");
    //   console.log(e.data);
    // };
    // worker.postMessage({}); // Start the worker.

    // new Promise((resolve, reject) => {
    //   if(isCacheUp){
    //
    //       ImgCache.isCached(this.state.src, (path, success) => {
    //
    //         if (success) {
    //           // already cached
    //           ImgCache.getCachedFileURL(path,(originSrc,cacheSrc) => {
    //             this.setState({
    //               target : <Img style={{width:'100%',height:'100%', objectFit: this.props.fit ? this.props.fit : ""}} src={[cacheSrc,originSrc]} loader={this.loader}/>
    //             })
    //           })
    //
    //         } else {
    //
    //           setTimeout(() => {
    //             // not there, need to cache the image
    //             ImgCache.cacheFile(path, (a,b,c) => {
    //               ImgCache.getCachedFileURL(path, (originSrc,cacheSrc) => {
    //                 this.setState({
    //                   target : <Img style={{width:'100%',height:'100%',objectFit: this.props.fit ? this.props.fit : ""}} src={[cacheSrc,originSrc]} loader={this.loader}/>
    //                 })
    //               })
    //             }, (err) => {
    //               this.setState({
    //                 target : <Img style={{width:'100%',height:'100%', objectFit: this.props.fit ? this.props.fit : ""}} src={path} loader={this.loader}/>
    //               })
    //             })
    //           }, Math.floor((Math.random() * 2000)))
    //
    //         }
    //       })
    //
    //
    //   }else{
    //     console.log("is not cache");
    //     this.setState({
    //       target : <Img style={{width:'100%',height:'100%', objectFit: this.props.fit ? this.props.fit : ""}} src={[this.state.src]} loader={this.loader}/>
    //     })
    //   }
    // })

    // ImageDL.addItem(this.state.src, ()=> {
    //   return new Promise((resolve, reject) => {
    //
    //     if(isCacheUp){
    //
    //       ImgCache.isCached(this.state.src, (path, success) => {
    //         if (success) {
    //
    //           // already cached
    //           ImgCache.getCachedFileURL(path,(originSrc,cacheSrc) => {
    //             this.setState({
    //               target : <Img style={{width:'100%',height:'100%', objectFit: this.props.fit ? this.props.fit : ""}} src={[cacheSrc,originSrc]} loader={this.loader}/>
    //             })
    //           })
    //           resolve(path)
    //
    //         } else {
    //
    //           ImgCache.cacheFile(path, (a,b,c) => {
    //
    //             ImgCache.getCachedFileURL(path, (originSrc,cacheSrc) => {
    //               this.setState({
    //                 target : <Img style={{width:'100%',height:'100%',objectFit: this.props.fit ? this.props.fit : ""}} src={[cacheSrc,originSrc]} loader={this.loader}/>
    //               })
    //             })
    //             resolve(path)
    //
    //           }, (err) => {
    //
    //             this.setState({
    //               target : <Img style={{width:'100%',height:'100%', objectFit: this.props.fit ? this.props.fit : ""}} src={path} loader={this.loader}/>
    //             })
    //             reject(err)
    //
    //           })
    //
    //         }
    //       })
    //
    //
    //     }else{
    //       console.log("is not cache");
    //       this.setState({
    //         target : <Img style={{width:'100%',height:'100%', objectFit: this.props.fit ? this.props.fit : ""}} src={[this.state.src]} loader={this.loader}/>
    //       })
    //       resolve(this.state.src)
    //     }
    //
    //   })
    // })

  }

  render() {
    return (
      <div style={{...this.props.style}}>
        <div style={{width:"100%", height :"100%", position:"relative"}}>
          <div className={"imgLoader"} style={{width:"100%", height:"100%",  display : this.state.isLoaded ? "none":"block"}}/>
          <img id={this.state.imgId} style={{width:"100%", height:"100%", objectFit: this.props.fit ? this.props.fit : "", display : this.state.isLoaded ? "block":"none"}}/>
        </div>
      </div>
    )
  }
}

ImageCacheLoader.defaultProps = {
  priority : 5,
};
