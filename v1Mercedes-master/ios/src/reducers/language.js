import { SELECT_LANGUAGE } from '../actions/languageAction'
import $ from 'jquery'
const INITIAL_STATE = { selectedLanguage: "TURKISH" }

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SELECT_LANGUAGE:
      if(action.payload === "ENGLISH"){
        $(document).ready(function(){
          $("#google-map-script").remove()
          var s = document.createElement("script")
          s.type = "text/javascript"
          s.setAttribute("id", "google-map-script")
          s.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBUmOq5vIrtMPY-8-Zv4eRotDAENgdmlQk&language=en";
          $('#root').append(s);
        })
      } else {
        $(document).ready(function(){
          $("#google-map-script").remove()
          var s = document.createElement("script")
          s.type = "text/javascript"
          s.setAttribute("id", "google-map-script")
          s.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBUmOq5vIrtMPY-8-Zv4eRotDAENgdmlQk&language=tr";
          $('#root').append(s);
        })
      }

      return {
        ...state,
        selectedLanguage: action.payload
      }
    default:
      return {
        ...state
      }
  }
}
