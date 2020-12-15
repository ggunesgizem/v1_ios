import _ from 'lodash'

var downloadList = []
var downloadedBeforeList = []

var timer = null
const qLength = 2
var currentDownloadQ = 0


let dlList = []
let dlTime = null

export const addItem2 = (item, priority, promiseee) => {
  var itemToAdd = {item : item, pro : promiseee, priority:priority}
  dlList = [...dlList, itemToAdd]
  if(dlTime == null){
    dlTime = setTimeout(()=>{
      console.log("starting to process list", dlList.length);
      let pList = [...dlList]
      dlList = []
      processList(pList)
    }, 3000)
  }
  return true
}

let pListC = 0
const processList = (pList) => {
  //conPList(pList, 0)

  Promise.all(pList.map(i => i.pro())).then(values => {
    console.log(values);
  }, reason => {
    console.log(reason)
  });

}

const conPList  = (list, index) => {
  if(index < list.length) {
    console.log(index,list[index]);
    list[index].pro()
    .then(res => {
      conPList(list, (index + 1))
    })
    .catch(err => {
      conPList(list, (index + 1))
    })
  }else{
    //finish
    console.log("done already");
    dlTime = null
  }
}

export const addItem = (item, priority, promiseee) => {

  // return false
  // var index = _.indexOf(downloadedBeforeList, item)
  // if(index > -1){
  //   return false
  // }
  //
  // var indexToInsert = _.sortedIndexBy(downloadList, item)
  // downloadedBeforeList.splice(indexToInsert, 0, item)

  //process pq

  var itemToAdd = {item : item, pro : promiseee, priority:priority}
  var iInsert = _.sortedIndexBy(dlList, itemToAdd, (o)=>{
    return o.priority
  })

  dlList.splice(iInsert, 0, itemToAdd)

  //downloadList = [...downloadList, itemToAdd]
  // if(downloadList.length > 0 && timer == null){
  //   timer = setInterval(processQ, 1000)
  // }
  //var itemToAdd = {item : item, pro : promiseee, priority:priority}
  //dlList = [...dlList, itemToAdd]

  if(dlTime == null){
    dlTime = setTimeout(()=>{
      console.log("starting to process list", dlList.length);
      let pList = [...dlList]
      dlList = []
      processList(pList)
    }, 3000)
  }
  return true

}

export const reduceQLength = () => {
  currentDownloadQ--
}

const processQ = () => {

  while(currentDownloadQ < qLength && downloadList.length > 0){
    currentDownloadQ++
    var itemToProcess = downloadList.splice(0,1)[0]

    itemToProcess.pro()
    .then(res => {
      reduceQLength()
    })
    .catch(err => {
      reduceQLength()
    })
  }

  if(downloadList.length == 0){
    clearTimeout(timer)
    timer = null
  }

}
