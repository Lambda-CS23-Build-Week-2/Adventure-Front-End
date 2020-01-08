import * as util from './index';
let count = 0;


async function initialize(currRm) {
    // set current room to localstorage
    if( parseInt(util.checkIfRoomStored()) !== currRm.room_id ) {
        util.setCurrentRoom(currRm.room_id);
    }
}

async function getRmDirections(room_id) {
    // console.log('getRmDirections', room_id);
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
        chooseDirArr.push('w')
    } 
    // console.log("chooseDirArr : ", chooseDirArr)

    let idx = Math.floor((Math.random() * chooseDirArr.length))
    // console.log("idx : ", idx)

    // return chosen direction
    return chooseDirArr[idx]
}

// choose direction if no unexplored
async function chooseTraveledDir(dirs) { 


    let revDir = {
        "n":"south",
        "s":"north",
        "w":"east",
        "e":"west"
    }
    let trvledDir = await util.getTravelDir();
    dirs = Object.keys(dirs);
    let newDir = dirs;
    if( dirs.length > 1 ) {
        newDir = dirs.filter( dir => dir !== revDir[trvledDir]);
    }
    let idx = Math.floor((Math.random() * newDir.length))

    // return chosen direction
    return newDir[idx];
}


// this sets off a depth first traversal picking a randomized path
// to go down until we run out of unexplored directions
async function movePlayer(currRm) {
    let cooldown;
    // get available directions
    // using current room id in localstorage
    console.log('currRm',currRm);

    let titleLen = currRm.title.length;
    let isShrine = currRm.title.slice(titleLen-6, titleLen);
    // console.log(isShrine)
    if(isShrine === "Shrine") {
        let prayedAtShrine = await util.actions.prayAtShrine();
        console.log('PRAYED AT SHRINE',prayedAtShrine);
        cooldown = prayedAtShrine.cooldown * 1000;
        console.log(`Cooldown: ${prayedAtShrine.cooldown}`)
        await util.delay(cooldown);
    }

    if(currRm.title == "Pirate Ry's") {
        let playerInv = await util.info.getInv();
        let wantedName = process.env.REACT_APP_MY_NAME
        if(playerInv.gold >= 1000 && playerInv.name !== wantedName) {
            let returnConfirm = await util.actions.changePlayerName(wantedName);
            console.log("change name",returnConfirm)
            cooldown = returnConfirm.cooldown * 1000;
            console.log(`Cooldown: ${returnConfirm.cooldown}`)
            await util.delay(cooldown);
            let confirmedReturn = await util.actions.confirmChangePlayerName(wantedName);
            console.log("confirmed change name", confirmedReturn);
            cooldown = confirmedReturn.cooldown * 1000;
            console.log(`Cooldown: ${confirmedReturn.cooldown}`)
            await util.delay(cooldown);
        }
    }

    let dirs = await getRmDirections(currRm.room_id)
    let travelDir = await chooseDirection(dirs)
    let longDir = '';
    // console.log("starting room", currRm.room_id, "travelDir:", travelDir);
    if(travelDir === undefined) {
        longDir = await chooseTraveledDir(dirs);
        travelDir = longDir.slice(0,1);
        // console.log('travelDir updated to', travelDir);
    }

    // set current room as previous room in localstorage
    // set direction we are moving in localstorage
    let rm_id = util.checkIfRoomStored();
    await util.setPrevRoom(rm_id);
    await util.setTravelDir(travelDir)

    // move to chosen direction
    let rmMove;
    if(longDir == "") {
        rmMove = await util.actions.moveDir(travelDir)
    } else {
        let dir_rm_id = dirs[longDir];
        rmMove = await util.actions.quickMoveDir(travelDir, dir_rm_id)
    }
    // console.log('New Room',rmMove);

    // try and create room
    await util.setCurrentRoom(rmMove.room_id);
    let rmRes = await util.info.createRm(rmMove);
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
    // console.log(rmRes)
    count++
    console.log('new room',rmMove)

    const dirTraveled = util.getTravelDir();
    await util.info.updateRmDir(util.getPrevRoom(), rmMove.room_id, dirObj[dirTraveled])
    await util.info.updateRmDir(rmMove.room_id, util.getPrevRoom(), revDirObj[dirTraveled])
    cooldown = rmMove.cooldown * 1000;
    console.log(`Cooldown: ${rmMove.cooldown}`)
    console.log(`\n~~~~~~COUNT: ${count}~~~~~~~\n\n`);
    return cooldown
};

export {
    initialize,
    getRmDirections,
    movePlayer
}