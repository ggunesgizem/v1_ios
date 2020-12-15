import moment from 'moment'
import ImgCache from '../cache'

const INITIAL_STATE = {
  isLoadingAccessories : false,
  accessoriesLastLoaded : 0,
  isFirstTimeLoadingAccessories : true,
  accessories : [],
  isLoadingCollections : false,
  collectionsLastLoaded : 0,
  isFirstTimeLoadingCollections : true,
  collections : [],
}

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case "START_LOAD_ACCESSORIES" : {
      return {...state, isLoadingAccessories: true, accessoriesLastLoaded:action.payload}
    }
    case "END_LOAD_ACCESSORIES" : {
      if(action.payload.status === "success"){
        return {...state, isLoadingAccessories:false, accessoriesLastLoaded:action.payload.time, isFirstTimeLoadingAccessories : false}
      }
      return {...state, isLoadingAccessories:false,}
    }
    case "FETCH_ACCESSORIES":

      // action.payload.forEach(item => {
      //   item.ImageURLs.forEach(img => {
      //
      //     ImgCache.isCached(img.Url, function(path, success) {
      //       if (success) {
      //         // already cached
      //       } else {
      //         setTimeout(() => {
      //           ImgCache.cacheFile(img.Url, function () {
      //           })
      //         }, (Math.random() * 1000))
      //       }
      //     })
      //
      //   })
      // })

      return { ...state, accessories : action.payload }
    case "START_LOAD_COLLECTIONS" :{
      return {...state, isLoadingCollections: true, collectionsLastLoaded:action.payload}
    }
    case "END_LOAD_COLLECTIONS" : {
      if(action.payload.status === "success"){
        return {...state, isLoadingCollections:false, collectionsLastLoaded:action.payload.time, isFirstTimeLoadingAccessories : false}
      }
      return {...state, isLoadingCollections:false,}
    }
    case "FETCH_COLLECTINS" :

      // action.payload.forEach(item => {
      //   item.ImageURLs.forEach(img => {
      //
      //     ImgCache.isCached(img.Url, function(path, success) {
      //       if (success) {
      //         // already cached
      //       } else {
      //         setTimeout(() => {
      //           ImgCache.cacheFile(img.Url, function (a,b,c) {
      //             console.log("inside collection");
      //             console.log(a,b,c);
      //           })
      //         }, (Math.random() * 1000))
      //       }
      //     })
      //
      //   })
      //
      // })

      return { ...state, collections : action.payload }
    case "UPDATE_ACCESSORIES_INTEREST" : {
      var newAccesoriesList = state.accessories.map(item => {
        if(item.id == action.payload.values.LeadItemID){
          item.InterestStatus = action.payload.data === 1 ? "True" : "False"
        }
        return item
      })
      return {...state, accessories : newAccesoriesList }
    }
    case "UPDATE_COLLECTIONS_INTEREST" : {
        var newCollectionList = state.collections.map(item => {
          if(item.id == action.payload.values.LeadItemID){
            item.InterestStatus = action.payload.data === 1 ? "True" : "False"
          }
          return item
        })
        return {...state, collections : newCollectionList }
    }
    default :
      return state;
  }
}
