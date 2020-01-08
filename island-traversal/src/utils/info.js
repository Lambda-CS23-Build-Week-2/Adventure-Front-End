import * as util from './services';
import axios from 'axios';

const host = 'https://lambda-treasure-hunt.herokuapp.com/api'
const ourHost = 'https://adventure-island-cs23.herokuapp.com'

async function getCurrRm() {
    // console.log('get current room', apiKey);
    return await util.axiosWithAuth().get(`${host}/adv/init/`)
                    .then( res => {
                        // console.log("resolved : ", res);
                        return res.data;
                    })
                    .catch( err => {
                        console.error(err)
                    })
}

async function getRmDirections(room_id) {
    // console.log('room_id',room_id)
    return await axios.post(`${ourHost}/rooms/directions/`, room_id)
                    .then( res => {
                        // console.log('getRmDirections', res)
                        return res.data
                    })
                    .catch( err => {
                        console.error(err)
                    })
}

async function createRm(room_info) {
    let rmType = '';
    let titleLen = room_info.title.length;
    let isShrine = room_info.title.slice(titleLen-6, titleLen);
    
    if (room_info.title === "shop") {
        rmType = "shop"
    } else if (room_info.title === "Wishing Well") {
        rmType = "wishing_well"
    } else if (room_info.title === "Pirate Ry's") {
        rmType = "name_changer"
    } else if(isShrine === "Shrine") {
        rmType = "shrine"
    } else {
        rmType = "room"
    }
    let rmDir = {};
    if(room_info.exits.includes("n")) {
        rmDir['north'] = -1
    }
    if(room_info.exits.includes("s")) {
        rmDir['south'] = -1
    }
    if(room_info.exits.includes("e")) {
        rmDir['east'] = -1
    }
    if(room_info.exits.includes("w")) {
        rmDir['west'] = -1
    }
    let roomVal = {
        'room_id': room_info.room_id,
        'type': rmType,
        'title': room_info.title,
        ...rmDir
    }
    return await axios.post(`${ourHost}/rooms/`, roomVal)
                    .then( res => {
                        // console.log(`creatRm res : ${res}`)
                        return res
                    })
                    .catch( err => {
                        console.error(`createRm err : ${err}`)
                        return err
                    })
}

async function updateRmDir(room_id, dir_rm_id, direction) {
    let updateVal = {
        "room_id": room_id,
        "dir_room_id": dir_rm_id,
        "direction": direction
    }
    // console.log('updateRmDir',updateRmDir);
    return await axios.post(`${ourHost}/rooms/directions/update`, updateVal)
                    .then( res => {
                        // console.log('update dir val', res)
                        return res
                    })
                    .catch( err => {
                        console.error(err);
                    })
}

export {
    getCurrRm,
    getRmDirections,
    createRm,
    updateRmDir
}