import * as util from './index';

async function initialize(currRm) {
    // set current room to localstorage
    if( parseInt(util.checkIfRoomStored()) !== currRm.room_id ) {
        util.setCurrentRoom(currRm.room_id);
    }
}

async function getRmDirections(room_id) {
    console.log('getRmDirections', room_id);
    return await util.info.getRmDirections({"room_id":room_id});
}

function chooseDirection(dirs) {
    let chooseDirArr = []
    console.log(dirs, "<-- dirs")
    // first check if unexplored exists
    if (dirs.north === -1) {
        chooseDirArr.push('n')
    } 
    if (dirs.south === -1) {
        chooseDirArr.push('s')
    } 
    if (dirs.east === -1) {
        chooseDirArr.push('e')
    } 
    if (dirs.west === -1) {
        chooseDirArr.push('e')
    } 
    console.log("chooseDirArr : ", chooseDirArr)

    let idx = Math.floor((Math.random() * chooseDirArr.length))
    console.log("idx : ", idx)

    // return chosen direction
    return chooseDirArr[idx]
}

function chooseTraveledDir(dirs) {
    let revDir = {
        "n":"south",
        "s":"north",
        "w":"east",
        "e":"west"
    }
    let trvledDir = util.getTravelDir;
    console.log('trvledDir',trvledDir)
    dirs = Object.keys(dirs);
    let newDir = dirs.filter( dir => dir !== revDir[trvledDir]);
    console.log('new direction',newDir)
    let idx = Math.floor((Math.random() * newDir.length))
    console.log("idx : ", idx)

    // return chosen direction
    return newDir[idx].slice(0,1);
}


// this sets off a depth first traversal picking a randomized path
// to go down until we run out of unexplored directions
async function movePlayer(currRm) {
    let cooldown;
    // get available directions
    // using current room id in localstorage
    console.log('currRm',currRm);
    if(currRm.items.length > 0) {
        console.log('TREASURE!')
        for(let i = 0; i < currRm.items.length; i++) {
            let treasureReturn = await util.actions.getTreasure();
            cooldown = treasureReturn.cooldown * 1000;
            await util.delay(cooldown);
        }
    }

    let dirs = await getRmDirections(currRm.room_id)
    let travelDir = chooseDirection(dirs)
    console.log("starting room", currRm.room_id, "travelDir:", travelDir);
    if(travelDir === undefined) {
        travelDir = chooseTraveledDir(dirs);
        console.log('travelDir updated to', travelDir);
    }

    // set current room as previous room in localstorage
    // set direction we are moving in localstorage
    let rm_id = util.checkIfRoomStored();
    util.setPrevRoom(rm_id);
    util.setTravelDir(travelDir)

    // move to chosen direction
    let rmMove = await util.actions.moveDir(travelDir)
    console.log('New Room',rmMove);

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
    console.log('update direction',util.getPrevRoom(), rmMove.room_id, dirObj[dirTraveled])
    await util.info.updateRmDir(util.getPrevRoom(), rmMove.room_id, dirObj[dirTraveled])
    console.log('updatedirection',rmMove.room_id, util.getPrevRoom(), revDirObj[dirTraveled])
    await util.info.updateRmDir(rmMove.room_id, util.getPrevRoom(), revDirObj[dirTraveled])
    console.log('end update rooms')
    cooldown = rmMove.cooldown * 1000;
    // await util.delay(cooldown);
    return cooldown
};

export {
    initialize,
    getRmDirections,
    movePlayer
}