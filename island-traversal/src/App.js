import React from 'react';

import * as util from './utils';

function App() {

  async function getRmDirections(room_id) {
    return await util.info.getRmDirections({"room_id": room_id});
  }

  async function traverseMap() {
    let currRm;
    // if you don't know where you are
        // init to get room id
    if( util.checkIfRoomStored() === null ) {
      console.log("current_room_id not set!")
      currRm = await util.info.getCurrRm();
      console.log('currRm',currRm)
      util.setCurrentRoom(currRm.room_id);
    } else {
      console.log( util.checkIfRoomStored() )
    }

    // test DIRECTIONS
    // let directions = await getRmDirections(util.checkIfRoomStored())
    // console.log('rmDirections',directions);
    // let newRoom = await util.actions.moveDir('s')
    // console.log('NEW ROOM', newRoom)

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
