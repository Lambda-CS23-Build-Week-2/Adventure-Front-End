import React from 'react';

import * as util from './utils';

function App() {

  async function getRmDirections(room_id) {
    return await util.info.getRmDirections({"room_id": room_id});
  }

  async function traverseMap() {
    // when traverseMap fires up
    // check if we have curr room in localstorage
    // if not, fetch it from the api and set
    // it in local storage

  
    let currRm = await util.info.getCurrRm();
    if( util.checkIfRoomStored() !== currRm.room_id ) {
      util.setCurrentRoom(currRm.room_id);
      console.log(`currRm if stmt : ${currRm}`)
    }
    console.log(`currRm : ${currRm}`)

    // we need room data:
      // available directions
      // available treasure

    // test DIRECTIONS
    // let directions = await getRmDirections(util.checkIfRoomStored())
    // console.log('rmDirections',directions);
    // let newRoom = await util.actions.moveDir('s')
    // console.log('NEW ROOM', newRoom)
    // let rm = await util.info.createRm(newRoom);
    // console.log('createRm return',rm);
    // let updateDir = await util.info.updateRmDir(2, 0, 'north')
    // console.log('updateDir',updateDir);

    // create room
    // pick a direction not traveled
        // travel direction
    // if all directions traveled
        // get all rooms
        // find room with unexplored directions
        // find quickest route there
            // store route and travel to room
    // add room
  }
  
  traverseMap();




  return (
    <div className="App">
      <header className="App-header">
        <h1> Welcome </h1>
      </header>
    </div>
  );
}

export default App;
