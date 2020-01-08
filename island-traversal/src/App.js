import React, { useState, useEffect } from 'react';
import * as util from './utils';
import * as traversal_helpers from './utils/traversal_helpers';
import * as mapUtil from './utils/visualizing_map';

function App() {
  const [inputText, setInputText] = useState();
  const [mappedRooms, setMappedRooms] = useState();
  const [roomsWithCoord, setRoomsWithCoord] = useState([]);

  useEffect(() => {
    util.info.getAllRm()
      .then(res => {
        console.log('setmapped res ', res)
        setMappedRooms(res)
      })

  }, [])

  async function traverseMap() {
    // when traverseMap fires up check if we have curr room in localstorage
    // if not, fetch it from the api and set it in local storage

    // get room we are in from server
    // console.log("before currRm")
    let currRm = await util.info.getCurrRm(); // set timeout here
    let cooldown = currRm.cooldown * 1000;
    console.log(`Cooldown: ${currRm.cooldown}`);
    await util.delay(cooldown);
    while (!("room_id" in currRm)) {
      currRm = await util.info.getCurrRm();
      cooldown = currRm.cooldown * 1000;
      console.log(`Cooldown: ${currRm.cooldown}`);
      await util.delay(cooldown);
    }
    // console.log("after currRm", currRm)

    traversal_helpers.initialize(currRm)

    // create/store current room data that
    // we are in into the db (or not if exists)
    let storeRoom = await util.info.createRm(currRm)

    // move if there are open rooms
    // for(let i = 0; i < 1; i++){
    while (true) {
      cooldown = await traversal_helpers.movePlayer(currRm);
      // console.log("COOLDOWN:", cooldown);
      await util.delay(cooldown);

      //update current room
      currRm = await util.info.getCurrRm();
      cooldown = currRm.cooldown * 1000;
      await util.delay(cooldown);
    }
  }

  // traverseMap();

  console.log('mapped rooms ', mappedRooms)

  /*
  We need one queue and one array without coordinates and one array to store with coordinates
  Enqueue the first room and then dequeue
  Once we dequeue the first room, we give it the starting coordinates (0, 0)
  We enqueue the connected rooms/exits
  Dequeue the next room and check for the connected rooms to enqueue those

  */
    function addCoordinates(rmWithNoCoord) {
        let coordArr = mapUtil.mapInitialize(mappedRooms);
        console.log(coordArr);
      /*
    let queue = [],
      dequeuedArray = [],
      dequeuedObj = {},
      room0 = mappedRooms.filter(room => room['room_id'] === 0);

    console.log('room0', room0)

    // Enqueue room
    queue.push(room0)
    console.log('room 0 queue', queue)
    // Dequeue room
    dequeuedArray = queue.shift()
    dequeuedObj = dequeuedArray[0]
    console.log('dequeued Obj: ', dequeuedObj)
    console.log('queue --', queue)
    // Add to the state of roomsWithCoord with coordinates
    dequeuedObj['coord-X'] = 0
    dequeuedObj['coord-Y'] = 0
    console.log('dequeued obj coordinates', dequeuedObj)
    let roomsWithCoordCopy = [...roomsWithCoord, dequeuedObj]
    setRoomsWithCoord(roomsWithCoordCopy)
    console.log('rooms with coordinates', roomsWithCoord)
    // Enqueue the connected rooms
    // Add the connected rooms to roomsWithCoord and give coordinates based off of dequeued room

    // Dequeue the next room
    // Check to see if the room is in the room with coordinates
    // If connected rooms are not in the coordinate array...
    // Enqueue that connected room
    // Check to see if rooms are not in rooms coordinate array
    // add those rooms to roomsWithCoord and give the coordinates based off of the dequeued room
    //*/
  }
  if (mappedRooms !== undefined) {
    addCoordinates()
  }

  return (
    <div className="App">

    </div>
  );
}

export default App;
