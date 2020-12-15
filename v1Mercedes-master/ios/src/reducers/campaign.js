import { FETCH_CAMPAIGNS, FETCH_OTHERS } from '../actions/campaignActions'
import ImgCache from '../cache'

const INITIAL_STATE = {
  campaignsLastLoaded:0,
  othersLastLoaded:0,
  isLoadingCampaigns:false,
  isLoadingOthers:false,
  all: [],
  others : [],
  selected: null
}

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case "START_LOAD_CAMPAIGNS" :{
      return {...state, isLoadingCampaigns: true}
    }
    case "END_LOAD_CAMPAIGNS" : {
      if(action.payload.status === "success"){
        return {...state, isLoadingCampaigns:false, campaignsLastLoaded:action.payload.time}
      }
      return {...state, isLoadingCollections:false,}
    }
    case "START_LOAD_OTHERS" :{
      return {...state, isLoadingOthers: true}
    }
    case "END_LOAD_OTHERS" : {
      if(action.payload.status === "success"){
        return {...state, isLoadingOthers:false, othersLastLoaded:action.payload.time}
      }
      return {...state, isLoadingOthers:false,}
    }
    case FETCH_OTHERS :

      // action.payload.forEach(item => {
      //   item.ImageURLs.forEach(img => {
      //
      //     ImgCache.isCached(img.Url, function(path, success) {
      //       if (success) {
      //         // already cached
      //       } else {
      //         setTimeout(()=>{
      //           ImgCache.cacheFile(img.Url, function () {
      //           })
      //         }, (Math.random() * 1000))
      //       }
      //     })
      //
      //   })
      // })

      return { ...state, others: action.payload }
    case FETCH_CAMPAIGNS:

      action.payload.forEach(item => {
        item.ImageURLs.forEach(img => {

          // ImgCache.isCached(img.Url, function(path, success) {
          //   if (success) {
          //     // already cached
          //   } else {
          //     setTimeout(() => {
          //       ImgCache.cacheFile(img.Url, function () {
          //       })
          //     }, (Math.random() * 1000))
          //   }
          // })

        })
      })

      return { ...state, all: action.payload }
    case "UPDATE_CAMPAIGN_INTEREST" : {
      var newCampaignList = state.all.map(item => {
        if(item.LeadItemID == action.payload.values.LeadItemID){
          item.InterestStatus = action.payload.data === 1 ? "True" : "False"
        }
        return item
      })
      return {...state, all : newCampaignList }
    }
    case "UPDATE_OTHER_INTEREST" : {
      var newOthersList = state.others.map(item => {
        if(item.LeadItemID == action.payload.values.LeadItemID){
          item.InterestStatus = action.payload.data === 1 ? "True" : "False"
        }
        return item
      })
      return {...state, others : newOthersList }
    }
    default:
      return state
  }
}
