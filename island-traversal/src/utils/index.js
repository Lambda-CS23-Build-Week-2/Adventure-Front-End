import * as actions from './actions';
import * as info from './info';

function setCurrentRoom(rm_id) {
    localStorage.setItem( "curr_rm_id", rm_id )
}
function setPrevRoom(prev_rm_id) {
    localStorage.setItem( "prev_rm", prev_rm_id )
}
function setTravelDir(dir) {
    localStorage.setItem( "travel_dir", dir )
}
function getPrevRoom() {
    let prevRm = null;
    if(localStorage.getItem("prev_"))
}

function checkIfRoomStored() {
    let curRoomId = null;
    if(localStorage.getItem("curr_rm_id")) {
        curRoomId = localStorage.getItem("curr_rm_id")
    }
    return curRoomId
}

export {
    setCurrentRoom,
    checkIfRoomStored,
    actions,
    info
}