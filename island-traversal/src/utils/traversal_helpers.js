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
    console.log(dirs, "<-- dirs")
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

async function movePlayer(currRm) {
    // get available directions
    // using current room id in localstorage

    let dirs = await getRmDirections(currRm.room_id)
    let travelDir = chooseDirection(dirs)
    console.log(travelDir, "<-- travelDir")

    // this sets off a depth first traversal
    // picking a randomized path
    // to go down until we run out of 
    // unexplored directions

    // set current room as previous room in localstorage
    // set direction we are moving in localstorage
    let rm_id = util.checkIfRoomStored();
    util.setPrevRoom(rm_id);
    util.setTravelDir(travelDir)

    // move to chosen direction
    let rmMove = await util.actions.moveDir(travelDir)

    // try and create room
    util.setCurrentRoom(rmMove.room_id);
    await util.info.createRm(rmMove);
    const dirObj = {
      "n": "north",
      "s": "south",
      "e": "east",
      "w": "west"
    }
    const revDirObj = {
      "n": "south", 
      "s": "north",
      "e": "west",
      "w": "east"
    }
    const dirTraveled = util.getTravelDir();
    await util.info.updateRmDir(util.getPrevRoom(), rmMove.room_id, dirObj[dirTraveled])
    await util.info.updateRmDir(rmMove.room_id, util.getPrevRoom(), revDirObj[dirTraveled])

    let cooldown = rmMove.cooldown * 1000;
    // await util.delay(cooldown);
    return cooldown
};

export {
    initialize,
    getRmDirections,
    movePlayer
}