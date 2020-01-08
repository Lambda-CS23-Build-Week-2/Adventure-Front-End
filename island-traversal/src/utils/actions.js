import * as util from './services';

const host = 'https://lambda-treasure-hunt.herokuapp.com/api';

async function moveDir(dir) {
    let moveVal =  JSON.stringify({ 'direction': dir })
    console.log('moveVal', moveVal)
    return await util.axiosWithAuth().post(`${host}/adv/move/`, moveVal)
                    .then( res => {
                        return res.data
                    })
                    .catch( err => {
                        console.error(err)
                        return err.response
                    })
}

async function quickMoveDir(dir, rmId) {
    let moveVal =  JSON.stringify({ 'direction': dir, 'next_room_id': rmId.toString() })
    console.log('moveVal', moveVal)
    return await util.axiosWithAuth().post(`${host}/adv/move/`, moveVal)
                    .then( res => {
                        return res.data
                    })
                    .catch( err => {
                        console.error(err)
                        return err.response
                    })
}

async function getTreasure() {
    console.log('GET TREASURE!')
    let takeVal = { 'name': 'treasure' }
    return await util.axiosWithAuth().post(`${host}/adv/take/`, takeVal)
                    .then( res => {
                        console.log(res);
                        return res.data;
                    })
                    .catch( err => {
                        console.err(err)
                    })
}

async function dropTreasure() {
    let dropVal = { 'name': 'treasure' }
    return await util.axiosWithAuth().post(`${host}/adv/drop/`, dropVal)
}

async function changePlayerName(name) {
    let nameVal = { "name": name}
    return await util.axiosWithAuth().post(`${host}/adv/change_name`, nameVal)
                    .then( res => {
                        console.log(res);
                        return res.data;
                    })
                    .catch( err => {
                        console.error(err);
                    })
}

async function confirmChangePlayerName(name) {
    let nameVal = { "name": name, "confirm": "aye" }
    return await util.axiosWithAuth().post(`${host}/adv/change_name`, nameVal)
                    .then( res => {
                        console.log(res);
                        return res.data;
                    })
                    .catch( err => {
                        console.error(err);
                    })
}

export {
    moveDir,
    getTreasure,
    dropTreasure,
    quickMoveDir,
    changePlayerName,
    confirmChangePlayerName
}