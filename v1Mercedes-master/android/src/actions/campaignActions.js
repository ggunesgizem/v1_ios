import axios from 'axios'
import { loadingSuccess, loadingFail, loadingStart } from './loadingActions'


export const FETCH_OTHERS = 'FETCH_OTHERS'
export const FETCH_CAMPAIGNS = 'FETCH_CAMPAIGNS'

function startLoadingCampaigns(){
  return {
    type : "START_LOAD_CAMPAIGNS",
  }
}

function endLoadingCampaigns(payload){
  return {
    type : "END_LOAD_CAMPAIGNS",
    payload : payload,
  }
}

export function fetchCampaigns(cTime) {
  return dispatch => {
    dispatch(startLoadingCampaigns())
    axios.get(`leaditem`,{
      headers: {
        Type : "Campaign",

      }
    })
      .then(res => {
        if(res.status == 200){
          var clist = res.data.map(item => {
            var imgList = null
            if(typeof item.ImageURLs === "object"){
              imgList = item.ImageURLs.map(img => {
                return img.Url
              })
              if(imgList.length == 1){
                imgList = imgList[0]
              }
            }else{
              imgList = item.imageURL
            }
            return {
              ...item,
              id: item.LeadItemID,
              name: item.LeadItemName,
              content: item.Description,
              imageUrl: imgList,
            }
          })

          dispatch({
            type: FETCH_CAMPAIGNS,
            payload: clist,
          })

        }else{
        }
        dispatch(endLoadingCampaigns({status:"success" ,time : cTime}))
      })
      .catch(err => dispatch(endLoadingCampaigns({status:"error" , error :err})))
  }
}

function startLoadingOthers(){
  return {
    type : "START_LOAD_OTHERS",
  }
}

function endLoadingOthers(payload){
  return {
    type : "END_LOAD_OTHERS",
    payload : payload,
  }
}

export function fetchOthers(cTime) {
  return dispatch => {
    dispatch(startLoadingOthers())
    axios.get(`leaditem`,{
      headers: {
        Type : "Others",

      }
    })
      .then(res => {
        if(res.status == 200){
          var clist = res.data.map(item => {
            var imgList = null
            if(typeof item.ImageURLs === "object"){
              imgList = item.ImageURLs.map(img => {
                return img.Url
              })
              if(imgList.length == 1){
                imgList = imgList[0]
              }
            }else{
              imgList = item.imageURL
            }
            return {
              ...item,
              id: item.LeadItemID,
              name: item.LeadItemName,
              content: item.Description,
              imageUrl: imgList,
            }
          })

          dispatch({
            type: FETCH_OTHERS,
            payload: clist,
          })

        }else{
        }
        dispatch(endLoadingOthers({status:"success" ,time : cTime}))
      })
      .catch(err => dispatch(endLoadingOthers({status:"error" , error :err})))
  }
}

function startLoadingCampaignsInterest(){
  return {
    type : "START_LOAD_CAMPAIGNS_INTEREST",
  }
}

function endLoadingCampaignsInterest(payload){
  return {
    type : "END_LOAD_CAMPAIGNS_INTEREST",
    payload : payload,
  }
}

export function toggleInterestCampaign(value, successCallBack, errorCallBack){
  var newValue = {
    LeadItemID : value.LeadItemID,
    Interest : (value.InterestStatus ? 1 : 0),
    WorkshopId : value.WorkshopId,
  }
  return dispatch => {
    dispatch(loadingStart())
    dispatch(startLoadingCampaignsInterest())
    axios.post(`lead`, {...newValue}
      )
      .then(res => {
        dispatch(loadingSuccess())
        if(typeof res.data === "object"){
          dispatch({
            type: "UPDATE_CAMPAIGN_INTEREST",
            payload: {
              data : res.data.Interest,
              values : value,
            }
          })

          if(value.InterestStatus){
            successCallBack()
          }

        }else{
          if(res.data === "success"){
            dispatch({
              type: "UPDATE_CAMPAIGN_INTEREST",
              payload: {
                data : (value.InterestStatus ? 1 : 0),
                values : value,
              }
            })

            //only for interest that becomes interested
            if(value.InterestStatus){
              successCallBack()
            }

          }
        }
        dispatch(endLoadingCampaignsInterest({status:"success" ,item : value}))
      })
      .catch(err => {
        dispatch(endLoadingCampaignsInterest({status:"error" , error :err}))
        errorCallBack()
      })
  }
}

function startLoadingOtherInterest(){
  return {
    type : "START_LOAD_OTHER_INTEREST",
  }
}

function endLoadingOtherInterest(payload){
  return {
    type : "END_LOAD_OTHER_INTEREST",
    payload : payload,
  }
}

export function toggleInterestOthers(value, successCallBack, errorCallBack){
  var newValue = {
    LeadItemID : value.LeadItemID,
    Interest : (value.InterestStatus ? 1 : 0),
    WorkshopId : value.WorkshopId,
  }
  return dispatch => {
    dispatch(loadingStart())
    dispatch(startLoadingOtherInterest())
    axios.post(`lead`, {...newValue}
      )
      .then(res => {
        dispatch(loadingSuccess())
        if(typeof res.data === "object"){
          dispatch({
            type: "UPDATE_OTHER_INTEREST",
            payload: {
              data : res.data.Interest,
              values : value,
            }
          })
        }else{
          if(res.data === "success"){
            dispatch({
              type: "UPDATE_OTHER_INTEREST",
              payload: {
                data : (value.InterestStatus ? 1 : 0),
                values : value,
              }
            })

            //only for interest that becomes interested
            if(value.InterestStatus){
              successCallBack()
            }
          }
        }
        dispatch(endLoadingOtherInterest({status:"success" ,item : value}))
      })
      .catch(err => {
        dispatch(endLoadingOtherInterest({status:"error" , error :err}))
        errorCallBack()
      })
  }
}
