import * as actions from './actions';
import * as info from './info';

function setCurrentRoom(rm_id) {
    localStorage.setItem( "curr_rm_id", rm_id )
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