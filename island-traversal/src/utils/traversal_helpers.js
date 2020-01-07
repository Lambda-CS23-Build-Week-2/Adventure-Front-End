import * as util from './index';

async function initialize(currRm) {
    // set current room to localstorage
        if( parseInt(util.checkIfRoomStored()) !== currRm.room_id ) {
              util.setCurrentRoom(currRm.room_id);
              console.log(`currRm if stmt : ${currRm}`)
        }
  }

async function getRmDirections(room_id) {
      return await util.info.getRmDirections({"room_id":room_id});
}

function chooseDirection(dirs) {
    let chooseDirArr = []
    // first check if unexplored exists
    if (dirs.north === -1) {
        // add to an array
        chooseDirArr.push('n')

    } 
    if (dirs.south === -1) {
        // add to an array
        chooseDirArr.push('s')

    } 
    if (dirs.east === -1) {
        // add to an array
        chooseDirArr.push('e')

    } 
    if (dirs.west === -1) {
        // add to an array
        chooseDirArr.push('e')

    } 
    console.log("chooseDirArr : ", chooseDirArr)

    let idx = Math.floor((Math.random() * chooseDirArr.length))
    console.log("idx : ", idx)

    // return chosen direction
    return chooseDirArr[idx]

}



export {
    initialize,
    getRmDirections,
    chooseDirection
}