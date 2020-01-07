import * as util from './services';

const host = 'https://lambda-treasure-hunt.herokuapp.com/api';

async function moveDir(dir) {
    // console.log('we are at move dir');
    let moveVal = { 'direction': dir}
    // console.log('moveVal', moveVal)
    return await util.axiosWithAuth().post(`${host}/adv/move/`, moveVal)
                    .then( res => {
                        return res.data
                    })
                    .catch( err => {
                        console.error(err)
                    })
}

async function getTreasure() {
    let takeVal = { 'name': 'treasure' }
    return await util.axiosWithAuth().post(`${host}/adv/take/`, takeVal)
}

async function dropTreasure() {
    let dropVal = { 'name': 'treasure' }
    return await util.axiosWithAuth().post(`${host}/adv/drop/`, dropVal)
}

export {
    moveDir
}