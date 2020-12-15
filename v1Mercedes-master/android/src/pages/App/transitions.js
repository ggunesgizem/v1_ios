import React from 'react'
import { Transition } from 'react-transition-group'

export const fadeDuration = 200

export const tocFadeStyle = {
  position : 'absolute',
  width : '100%',
  height : '100%',
  transition: `opacity ${fadeDuration}ms ease-in`,
  zIndex:10,
}

export const tocFadeStyles = {
  entering: { opacity: 0, zIndex:11 },
  entered:  { opacity: 1 },
  exiting: {  opacity: 1 },
  exited: {  opacity: 0, zIndex: 9 },
};

export const defaultFadeStyle = {
  position : 'absolute',
  width : '100%',
  height : '100%',
  transition: `opacity ${fadeDuration}ms ease-in`,
}

export const fixFadeStyle = {
  transition: `opacity ${fadeDuration}ms ease-in`,
}

export const transitionfadeStyles = {
  entering: { opacity: 0 },
  entered:  { opacity: 1 },
  exiting: {  opacity: 1 },
  exited: {  opacity: 0 },
};

export const transitUpDuration = 300

export const transitUpStyle = {
  position : 'fixed',
  width : '100%',
  height : '100%',
  transition: `transform ${transitUpDuration}ms linear`,
  zIndex : '18',
}

export const transitUpDefaultStyle = {
  width : '100%',
  height : '100%',
  transition: `top ${transitUpDuration}ms linear`,
  zIndex : '18',
}

export const transitUpStyles = {
  entering: { transform: 'translate(0, 100%)' },
  entered:  { transform: 'translate(0, 0%)' },
  exiting: {  transform: 'translate(0, 0%)' },
  exited: {  transform: 'translate(0, 100%)' },
}


export const transitLeftDuration = 300

export const transitLeftStyle = {
  width:'100%',
  height:'100%',
  position : 'fixed',
  top:'0',
  transition: `transform ${transitLeftDuration}ms linear`,
  zIndex : '18',
}

export const transitLeftStyles = {
  entering: { transform: 'translate(100%)' },
  entered:  { transform: 'translate(0%)' },
  exiting: {  transform: 'translate(0%)' },
  exited: {  transform: 'translate(100%)' },
}

const mainMenuFadeStyle = {
  width: '100%',
  height: '100%',
  position : 'absolute',
  top : '0px',
  left: '0px',
  transition: `opacity ${fadeDuration}ms ease-in`,
  zIndex : 0
}

export const mainMenuFadeStyles = {
  entering: { opacity: 0, zIndex : 0, display: "flex" },
  entered:  { opacity: 1, zIndex : 0 },
  exiting: {  opacity: 1, zIndex : -1 },
  exited: { opacity: 0, zIndex : -1, display: "none"},
}

export const FadeTransitionContainer = (props) => {
  return (
    <Transition
      in={props.in}
      timeout={fadeDuration}
    >
    {(state) => {
      return (
        <div style={{
          ...mainMenuFadeStyle,
          ...mainMenuFadeStyles[state]
        }}>
          {props.children}
        </div>
      )
    }}
    </Transition>
  )
}

export const mainMenuFadeStyles2 = {
  entering: { opacity: 0, zIndex : 0 },
  entered:  { opacity: 1, zIndex : 0 },
  exiting: {  opacity: 1, zIndex : -1 },
  exited: { opacity: 0, zIndex : -1 },
}

export const FadeTransitionContainer2 = (props) => {
  return (
    <Transition
      in={props.in}
      timeout={fadeDuration}
    >
    {(state) => {
      return (
        <div style={{
          ...mainMenuFadeStyle,
          ...mainMenuFadeStyles2[state]
        }}>
          {props.children}
        </div>
      )
    }}
    </Transition>
  )
}
