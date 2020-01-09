import React, { useState, useEffect } from 'react';
import * as util from './utils';
import * as traversal_helpers from './utils/traversal_helpers';
import * as bsf_move from './utils/bfs_move'

function App() {
//     const [inputText, setInputText] = useState();

//     async function traverseMap() {
//     // when traverseMap fires up check if we have curr room in localstorage
//     // if not, fetch it from the api and set it in local storage

//     // get room we are in from server
//     // console.log("before currRm")
//     let currRm = await util.info.getCurrRm(); // set timeout here
//     let cooldown = currRm.cooldown * 1000;
//     await util.delay(cooldown);
//     // console.log("after currRm")

//     traversal_helpers.initialize(currRm)

//     // create/store current room data that
//     // we are in into the db (or not if exists)

//     // let storeRoom = await util.info.createRm(currRm)
     
//     // Traversal to Given Destination
//     let bfsPath = await bsf_move.bfs(currRm.room_id, 358)
//     // console.log(bfsPath, 'path for bfs')

//     // 169 Fully
//     //243 Linh

//     traversal_helpers.moveDestination(bfsPath)

//     // move if there are open rooms
//     // Random Traversal
//     // let ct = 0
//     // while (ct < 1) {

//     //   cooldown = await traversal_helpers.movePlayer(currRm);
//     //   // console.log("COOLDOWN:", cooldown);
//     //   await util.delay(cooldown);

//     //   //update current room
//     //   currRm = await util.info.getCurrRm();
//     //   cooldown = currRm.cooldown * 1000;
//     //   await util.delay(cooldown);
//     //   ct++
//     // }

//     /*
//     // test DIRECTIONS
//     // let directions = await getRmDirections(util.checkIfRoomStored())
//     // console.log('rmDirections',directions);
//     // let newRoom = await util.actions.moveDir('s')
//     // console.log('NEW ROOM', newRoom)
//     // let rm = await util.info.createRm(newRoom);
//     // console.log('createRm return',rm);
//     // let updateDir = await util.info.updateRmDir(2, 0, 'north')
//     // console.log('updateDir',updateDir);

//    */
//   }
  
//     traverseMap();

    // call mine with proof

    util.actions.mine(4266296.723993056)




    return (
        <div className="App">
            <header className="App-header">
                <h1> Welcome </h1>
            </header>
        </div>
    );
}

export default App;