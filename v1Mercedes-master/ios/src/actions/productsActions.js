import axios from 'axios'
import { loadingSuccess, loadingFail, loadingStart } from './loadingActions'

function startLoadingAccessories(payload){
  return {
    type : "START_LOAD_ACCESSORIES",
    payload: payload,
  }
}

function endLoadingAccessories(payload){
  return {
    type : "END_LOAD_ACCESSORIES",
    payload : payload,
  }
}

export function fetchAccessories(cTime) {
  return dispatch => {
    dispatch(startLoadingAccessories(cTime))
    axios.get(`leaditem`,{
      headers: {
        Type : "Accessories",
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
            type: "FETCH_ACCESSORIES",
            payload: clist,
          })

        }else{
        }
        dispatch(endLoadingAccessories({status:"success" ,time : cTime}))
      })
      .catch(err => dispatch(endLoadingAccessories({status:"error" , error :err})))
  }
}

function startLoadingCollections(payload){
  return {
    type : "START_LOAD_COLLECTIONS",
    payload : payload,
  }
}

function endLoadingCollections(payload){
  return {
    type : "END_LOAD_COLLECTIONS",
    payload : payload,
  }
}

export function fetchCollections(cTime) {
  return dispatch => {
    dispatch(startLoadingCollections(cTime))
    axios.get(`leaditem`, {
        headers: {
          Type : "Collection"
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
              imgList = item.ImageURLs
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
            type: "FETCH_COLLECTINS",
            payload: clist,
          })

        }else{
        }
        dispatch(endLoadingCollections({status:"success" ,time : cTime}))
      })
      .catch(err => dispatch(endLoadingCollections({status:"error" , error :err})))
  }
}


function startLoadingAccessoriesInterest(){
  return {
    type : "START_LOAD_ACCESSORIES_INTEREST",
  }
}

function endLoadingAccessoriesInterest(payload){
  return {
    type : "END_LOAD_ACCESSORIES_INTEREST",
    payload : payload,
  }
}

export function toggleInterestAccessories(value, callback, errcallback){
  var newValue = {
    LeadItemID : value.LeadItemID,
    Interest : (value.InterestStatus ? 1 : 0),
    WorkshopId : value.WorkshopId,
    }
  return dispatch => {
    dispatch(loadingStart())
    dispatch(startLoadingAccessoriesInterest())
    axios.post(`lead`, {...newValue})
      .then(res => {
        dispatch(loadingSuccess())
        if(typeof res.data === "object"){
          dispatch({
            type: "UPDATE_ACCESSORIES_INTEREST",
            payload: {
              data : res.data.Interest,
              values : value,
            }
          })
        }else{
          if(res.data === "success"){
            dispatch({
              type: "UPDATE_ACCESSORIES_INTEREST",
              payload: {
                data : (value.InterestStatus ? 1 : 0),
                values : value,
              }
            })
            if(value.InterestStatus){
              callback()
            }

          }
        }
        dispatch(endLoadingAccessoriesInterest({status:"success" ,item : value}))
      })
      .catch(err => {
        dispatch(endLoadingAccessoriesInterest({status:"error" , error :err}))
        errcallback()
      })
  }
}

function startLoadingCollectionsInterest(){
  return {
    type : "START_LOAD_COLLECTIONS_INTEREST",
  }
}

function endLoadingCollectionsInterest(payload){
  return {
    type : "END_LOAD_COLLECTIONS_INTEREST",
    payload : payload,
  }
}

export function toggleInterestCollections(value, callback, errcallback){
  var newValue = {
    LeadItemID : value.LeadItemID,
    Interest : (value.InterestStatus ? 1 : 0),
    WorkshopId : value.WorkshopId,
    }
  return dispatch => {
    dispatch(loadingStart())
    dispatch(startLoadingCollectionsInterest())
    axios.post(`lead`, {...newValue})
      .then(res => {
        dispatch(loadingSuccess())
        if(typeof res.data === "object"){
          dispatch({
            type: "UPDATE_COLLECTIONS_INTEREST",
            payload: {
              data : res.data.Interest,
              values : value,
            }
          })
        }else{
          if(res.data === "success"){
            dispatch({
              type: "UPDATE_COLLECTIONS_INTEREST",
              payload: {
                data : (value.InterestStatus ? 1 : 0),
                values : value,
              }
            })
            if(value.InterestStatus){
              callback()
            }
          }
        }
        dispatch(endLoadingCollectionsInterest({status:"success" ,item : value}))
      })
      .catch(err => {
        dispatch(endLoadingCollectionsInterest({status:"error" , error :err}))
        errcallback()
      })
  }
}
