import * as util from './index';

function findRoom(mappedRooms, room_id) {
    // console.log("find room", room_id)
    let theIndex = null;
    let room = mappedRooms.filter( (room, i) => {
        if(room['room_id'] === room_id) {
            let roomCpy = room;
            // mappedRooms.splice(i,1);
            return roomCpy;
        }
    });
    // console.log('findroom',room)
    return room[0]
}

function findRoomOnly(mappedRooms, room_id) {
    // console.log("findRoom", mappedRooms)
    let theIndex = null;
    let room = mappedRooms.filter( (room, i) => room['room_id'] === room_id );
    // console.log('findroom',room)
    return room[0]
}

async function mapInitialize(mappedRooms) {
    let mappedRoomsCopy = [...mappedRooms]
    console.log('initialized',mappedRooms.length)

    let queue = [], roomsWithCoord = [], roomFinished = {},
        currEvalRm = {}, dequeuedObj = {}, dirObj = {};

    currEvalRm = findRoom( mappedRooms, 0 );

    // add start coords to Rm 0
    currEvalRm["coord_X"] = 0;
    currEvalRm["coord_Y"] = 0;
    queue.push([currEvalRm, 'none', currEvalRm.coord_X, currEvalRm.coord_Y, currEvalRm.room_id]);

    while(queue.length > 0) {
        // let queueCopy = [...queue];
        // console.log("QUEUE",queueCopy);
        dequeuedObj = queue.shift();
        // console.log("dequeuedObj", dequeuedObj);
        let objDir = dequeuedObj[1];
        // console.log("objDir",objDir)
        switch (objDir) {
            case "north":
                dequeuedObj[0]['coord_X'] = dequeuedObj[2];
                dequeuedObj[0]['coord_Y'] = dequeuedObj[3] + 1;
                break;
            case "south":
                dequeuedObj[0]['coord_X'] = dequeuedObj[2];
                dequeuedObj[0]['coord_Y'] = dequeuedObj[3] - 1;
                break;
            case "east":
                dequeuedObj[0]['coord_X'] = dequeuedObj[2] + 1;
                dequeuedObj[0]['coord_Y'] = dequeuedObj[3];
                break;
            case "west":
                dequeuedObj[0]['coord_X'] = dequeuedObj[2] - 1;
                dequeuedObj[0]['coord_Y'] = dequeuedObj[3];
                break;
            default:
                break;
        }
        if(!roomFinished[dequeuedObj[0].room_id]) {
            roomsWithCoord.push(dequeuedObj[0])
        }
        roomFinished = {...roomFinished, [dequeuedObj[0].room_id] : true };
        // console.log('DEQUEUED OBJ', dequeuedObj[0])
        dirObj = dequeuedObj[0]['dir']
        // Add the connected rooms to roomsWithCoord and give coordinates based off of dequeued room
        // console.log('roomFinished',roomFinished);
        for(let key in dirObj) {
            if(roomFinished[dirObj[key]] === undefined) {
                let dirRoom = await findRoom(mappedRooms, dirObj[key]);
                await queue.push([dirRoom, key, dequeuedObj[0].coord_X, dequeuedObj[0].coord_Y, dequeuedObj[0].room_id]);
                await util.delay(75);
            }
        }
        // console.log("Count:", roomsWithCoord.length);
        await util.delay(75);
    }
    let roomsWithCoordCopy = [...roomsWithCoord];
    console.log('roomsWithCoordCopy COPY',roomsWithCoordCopy)

}

export {
    mapInitialize
}