function findRoom(mappedRooms, room_id) {
    console.log("findRoom", mappedRooms)
    let theIndex = null;
    let room = mappedRooms.filter( (room, i) => {
        theIndex = i
        return room['room_id'] === room_id;
    });
    console.log('findroom',room)
    return [room[0], theIndex]
}

async function mapInitialize(mappedRooms) {
    console.log("initialize", mappedRooms)
    let queue = [],
        roomsWithCoord = [],
        dequeuedObj = {},
        dirObj = {},
        currEvalRoom;

    // console.log('room0', room0)
    currEvalRoom = await findRoom(mappedRooms, 0);
    console.log('currEvalRoom',currEvalRoom)
    mappedRooms.pop(currEvalRoom[1])
    // Enqueue room
    queue.push(currEvalRoom[0])
    // console.log('queue', queue)
    // Dequeue room
    dequeuedObj = queue.shift()
    // console.log('dequeued Obj: ', dequeuedObj)
    // console.log('queue --', queue)
    // Add to the state of roomsWithCoord with coordinates
    dequeuedObj['coord-X'] = 0
    dequeuedObj['coord-Y'] = 0
    // console.log('dequeued obj coordinates', dequeuedObj)
    roomsWithCoord.push(dequeuedObj)
    // console.log("rooms with coord:", roomsWithCoord)
    // Enqueue the connected rooms
    dirObj = dequeuedObj['dir']
    console.log('dirObj: ', dirObj)
    // Add the connected rooms to roomsWithCoord and give coordinates based off of dequeued room

    // Dequeue the next room
    // Check to see if the room is in the room with coordinates
    // If connected rooms are not in the coordinate array...
    // Enqueue that connected room
    // Check to see if rooms are not in rooms coordinate array
    // add those rooms to roomsWithCoord and give the coordinates based off of the dequeued room
}

export {
    mapInitialize
}