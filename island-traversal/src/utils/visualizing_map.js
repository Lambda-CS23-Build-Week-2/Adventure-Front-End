function mapInitialize(mappedRooms) {
    let queue = [],
        roomsWithCoord = [],
        dequeuedObj = {},
        room0 = mappedRooms.filter(room => room['room_id'] === 0);

    console.log('room0', room0)

    // Enqueue room
    queue.push(room0[0])
    console.log('room 0 queue', queue)
    // Dequeue room
    dequeuedObj = queue.shift()
    console.log('dequeued Obj: ', dequeuedObj)
    console.log('queue --', queue)
    // Add to the state of roomsWithCoord with coordinates
    dequeuedObj['coord-X'] = 0
    dequeuedObj['coord-Y'] = 0
    console.log('dequeued obj coordinates', dequeuedObj)
    roomsWithCoord.push(dequeuedObj)
    console.log("rooms with coord:", roomsWithCoord)
    // Enqueue the connected rooms
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