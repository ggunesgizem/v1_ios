import {
  CLEAR_DEALERS,
  ALL_DEALERS,
  DEALER_GET,
  DEALER_SELECT,
  PREFERED_SELECT,
  SEARCH_DEALER,
  GET_CITY,
  START_GET_NEARBY_DEALERS,
  END_GET_NEARBY_DEALERS,
  GET_NEARBY_DEALERS
} from "../actions/dealerActions";
import ImgCache from "../cache";

const INITIAL_STATE = {
  fullList: [],
  all: [],
  selected: null,
  prefered: null,
  citylist: [],
  cityListLastLoaded: 0,
  isLoadingNearBy: false,
  nearbyDealerList: [],
  nearbyDealerListBase: null
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ALL_DEALERS: {
      // action.payload.forEach(item => {
      //   ImgCache.isCached(item.ImageURL, function(path, success) {
      //     if (success) {
      //       // already cached
      //     } else {
      //       ImgCache.cacheFile(item.ImageURL, function () {
      //       }, () => {
      //
      //       })
      //     }
      //   })
      //
      //   item.ServiceAgents.forEach(sa => {
      //     ImgCache.isCached(sa.ImageURL, function(path, success) {
      //       if (success) {
      //         // already cached
      //       } else {
      //         ImgCache.cacheFile(sa.ImageURL, function () {
      //         },() => {
      //
      //         })
      //       }
      //     })
      //   })
      // })
      var data=action.payload;

      var uniqdata = new Array();
      uniqdata.push(data[0]);
      data.map(item => {
        var durum = 0;

        uniqdata.map(item2 => {
          if (item2.OutletID == item.OutletID) {
            durum = 1;
          }
        });

        if (durum == 0) {
          uniqdata.push(item);
        }
      });

      return {
      
        ...state,
        fullList: uniqdata
      };
    }
    case DEALER_GET:
   
      // console.log("DEALER_GET",action.payload)
      return {
        ...state,
        all: action.payload
      };
    case DEALER_SELECT:
      return {
        ...state,
        selected: action.payload
      };
    case PREFERED_SELECT: {
      return {
        ...state,
        prefered: action.payload
      };
    }
    case SEARCH_DEALER: {
      // console.log("SEARCH_DEALER",action.payload)
      var data=action.payload;
      var uniqdata = new Array();
       if(data!==null){
    
      uniqdata.push(data[0]);
      data.map(item => {
        var durum = 0;
 
        uniqdata.map(item2 => {
          if (item2.OutletID == item.OutletID) {
            durum = 1;
          }
        });
 
        if (durum == 0) {
          uniqdata.push(item);
        }
      });
    }
       return {
         ...state,
         all: uniqdata?uniqdata:action.payload
       };
    }
    case GET_CITY: {
   
      return {
        ...state,
        
        citylist: action.payload.data,
        cityListLastLoaded: action.payload.timeRequest
      };
    }
    case CLEAR_DEALERS: {
      return {
        ...state,
        all: []
      };
    }
    case START_GET_NEARBY_DEALERS: {
      return { ...state, isLoadingNearBy: true };
    }
    case END_GET_NEARBY_DEALERS: {
      console.log("changing loadnearby to false");
      return { ...state, isLoadingNearBy: false };
    }
    case GET_NEARBY_DEALERS: {
      console.log("found dealers nearby");
      var data=action.payload.data;

      var uniqdata = new Array();
      uniqdata.push(data[0]);
      data.map(item => {
        var durum = 0;

        uniqdata.map(item2 => {
          if (item2.OutletID == item.OutletID) {
            durum = 1;
          }
        });

        if (durum == 0) {
          uniqdata.push(item);
        }
      });

      return {
        ...state,
        nearbyDealerList: uniqdata,
        nearbyDealerListBase: action.payload.location
      };
    }
    default:
      return state;
  }
}
