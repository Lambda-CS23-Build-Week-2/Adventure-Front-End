import * as actions from './actions';
import * as info from './info';

// control room for our player

// sets curr room in local storage
function setCurrentRoom(rm_id) {
    localStorage.setItem( "curr_rm_id", rm_id )
}


// sets prev room in local storage
function setPrevRoom(prev_rm_id) {
    localStorage.setItem( "prev_rm", prev_rm_id )
}

// sets travel dir in local storage
function setTravelDir(dir) {
    localStorage.setItem( "travel_dir", dir )
}

// gets travel dir
function getTravelDir() {
    let travelDir = null
    if(localStorage.getItem("travel_dir")) {
        travelDir = localStorage.getItem("travel_dir")
    }
    return travelDir
}

// gets prev room from local storage
function getPrevRoom() {
    let prevRm = null;
    if(localStorage.getItem("prev_rm")) {
        prevRm = localStorage.getItem("prev_rm")
    }
    return prevRm
}

// returns current room, queried in App
function checkIfRoomStored() {
    let curRoomId = null;
    if(localStorage.getItem("curr_rm_id")) {
        curRoomId = localStorage.getItem("curr_rm_id")
    }
    return curRoomId
}

function delay(n) {  
    n = n || 2000;
    return new Promise(done => {
        setTimeout(() => {
            done();
        }, n);
    });
}

export {
    setCurrentRoom,
    setPrevRoom,
    setTravelDir,
    getTravelDir,
    getPrevRoom,
    checkIfRoomStored,
    actions,
    info,
    delay
}