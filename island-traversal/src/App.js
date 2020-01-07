import React from 'react';
import * as util from './utils';
import * as traversal_helpers from './utils/traversal_helpers';

function App() {


    async function traverseMap() {
    // when traverseMap fires up
    // check if we have curr room in localstorage
    // if not, fetch it from the api and set
    // it in local storage

    // get room we are in from server
    // console.log("before currRm")
    let currRm = await util.info.getCurrRm(); // set timeout here
    let cooldown = currRm.cooldown * 1000;
    await util.delay(cooldown);
    // console.log("after currRm")

    traversal_helpers.initialize(currRm)
  
    // create/store current room data that
    // we are in into the db (or not if exists)
    let storeRoom = await util.info.createRm(currRm)
    console.log(`storeRoom : `, storeRoom.response)

    // get available directions
    // using current room id in localstorage
    let dirs = await traversal_helpers.getRmDirections(currRm.room_id)
    console.log("dirs : ", dirs)
    

    let travelDir = traversal_helpers.chooseDirection(dirs)
    console.log("travelDir : ", travelDir)

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
    console.log("travelDir : ", travelDir)
    console.log("travelDir : ",typeof travelDir)

    let rmMove = await util.actions.moveDir(travelDir)
    console.log('rmMove', rmMove);
    cooldown = rmMove.cooldown * 1000;
    await util.delay(cooldown);
      console.log('after movement cooldown')

    
    
   



    // try and create room
      // see if we have been here before
      // if yes, then get dirs and move again
      //if no, create it
        // get dirs

    
      


    
  

  
    // if unexplored dirs exist
      // add unexplored dirs to an array
      // pick random idx number between 0 to len(array) - 1
      // choose randomly generated idx

    // else run a breadtch first search
    // for shortest path to a room
    // with unexplored dirs
    
    

    

  
    
    
    

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
