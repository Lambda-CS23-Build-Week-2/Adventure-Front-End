function findRoom(mappedRooms, room_id) {
    // console.log("findRoom", mappedRooms)
    let theIndex = null;
    let room = mappedRooms.filter( (room, i) => {
        theIndex = i
        return room['room_id'] === room_id;
    });
    // console.log('findroom',room)
    return [room[0], theIndex]
}

function findRoomOnly(mappedRooms, room_id) {
    // console.log("findRoom", mappedRooms)
    let theIndex = null;
    let room = mappedRooms.filter( (room, i) => {
        theIndex = i
        return room['room_id'] === room_id;
    });
    // console.log('findroom',room)
    return room[0]
}

async function mapInitialize(mappedRooms) {
    console.log("initialize", mappedRooms.length)
    let queue = [],
        roomsWithCoord = [],
        dequeuedArr = [],
        objDir = '',
        dequeuedObj = {},
        prevDequeuedObj = {},
        dirObj = {},
        coord_x = 0,
        coord_y = 0,
        currEvalRoom,
        finishedRoom = {},
        masterRmID = null;

    // console.log('room0', room0)
    currEvalRoom = await findRoom(mappedRooms, 0);
    // console.log('currEvalRoom',currEvalRoom)
    let thisRm = mappedRooms.pop(currEvalRoom[1])
    console.log("THIS ROOM",thisRm);
    console.log("MAPPED ROOMS",mappedRooms.length)
    // Enqueue room
    queue.push(currEvalRoom[0])
    // console.log('queue', queue)
    // Dequeue room
    dequeuedObj = queue.shift()
    // Add to the state of roomsWithCoord with coordinates
    dequeuedObj['coord_X'] = coord_x
    dequeuedObj['coord_Y'] = coord_y
    roomsWithCoord.push(dequeuedObj)
    finishedRoom = { [dequeuedObj.room_id] : true };
    // console.log('FINISHED ROOM',finishedRoom)
    // Enqueue the connected rooms
    dirObj = dequeuedObj['dir']
    // Add the connected rooms to roomsWithCoord and give coordinates based off of dequeued room
    for(let key in dirObj) {
        currEvalRoom = await findRoom(mappedRooms, dirObj[key]);
        queue.push([currEvalRoom[0], key, dequeuedObj.room_id]);
        mappedRooms.pop(currEvalRoom[1]);
        console.log("THIS ROOM",currEvalRoom[1]);
        console.log("MAPPED ROOMS",mappedRooms.length)
    }
    
    while (queue.length > 0){
        // Dequeue the next room
        dequeuedArr = queue.shift();
        // console.log(dequeuedArr);

        dequeuedObj = dequeuedArr[0];
        objDir = dequeuedArr[1];
        masterRmID = dequeuedArr[2]
        // console.log("OBJECT",dequeuedObj,"DIRECTION",objDir,"master ID", masterRmID);
        // console.log('FINISHED ROOM',finishedRoom)
        // console.log("BOOL",finishedRoom[dequeuedObj.room_id])
        let masterRmObj = await findRoomOnly(roomsWithCoord, masterRmID);
        // console.log("MASTERROOM",masterRmObj);
        coord_x = masterRmObj.coord_X;
        coord_y = masterRmObj.coord_Y;
        // Check to see if the room is in the room with coordinates
        let queueCopy = [...queue]
        console.log("QUEUE",queueCopy)
        let roomsWithCoordCopy = [...roomsWithCoord]
        console.log("COORDINATES",roomsWithCoordCopy)
        let mappedRoomsCopy = mappedRooms;
        console.log("MAP ROOMS", mappedRoomsCopy)
        // console.log("CURRENT OBJ", dequeuedObj);
        if(!finishedRoom[dequeuedObj.room_id]){
            // console.log("WE'RE SWITCHING!")
            // If connected rooms are not in the coordinate array...
            // give it a coordinate based off of original room?
            switch (objDir) {
                case "north":
                    dequeuedObj['coord_X'] = coord_x;
                    dequeuedObj['coord_Y'] = coord_y + 1;
                    break;
                case "south":
                    dequeuedObj['coord_X'] = coord_x;
                    dequeuedObj['coord_Y'] = coord_y - 1;
                    break;
                case "east":
                    dequeuedObj['coord_X'] = coord_x + 1;
                    dequeuedObj['coord_Y'] = coord_y;
                    break;
                case "west":
                    dequeuedObj['coord_X'] = coord_x - 1;
                    dequeuedObj['coord_Y'] = coord_y;
                    break;
            }
            roomsWithCoord.push(dequeuedObj)
            // console.log('after switch',roomsWithCoord);
            finishedRoom = { [dequeuedObj.room_id] : true };
            // Enqueue the connected rooms
            dirObj = dequeuedObj['dir']
            // Add the connected rooms to roomsWithCoord and give coordinates based off of dequeued room
            for(let key in dirObj) {
                currEvalRoom = await findRoom(mappedRooms, dirObj[key]);
                // console.log("currEvalRoom[0]",currEvalRoom[0]);
                if(currEvalRoom[0] !== undefined) {
                    queue.push([currEvalRoom[0], key, dequeuedObj.room_id]);
                }
                // console.log('currEvalRoom[1]',currEvalRoom[1])
                mappedRooms.pop(currEvalRoom[1]);
            }
        }
        // console.log("mappedrooms", mappedRooms.length)
        // console.log('end of while',roomsWithCoord.length);
    }
}

export {
    mapInitialize
}