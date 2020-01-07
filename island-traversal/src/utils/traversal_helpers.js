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

export {
    initialize,
    getRmDirections
}