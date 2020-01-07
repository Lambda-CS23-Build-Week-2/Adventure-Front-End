import * as util from './services';

const host = 'https://lambda-treasure-hunt.herokuapp.com/api';

async function moveDir(dir) {
    let moveVal =  JSON.stringify({ 'direction': dir})
    console.log('moveVal', moveVal)
    return await util.axiosWithAuth().post(`${host}/adv/move/`, { 'direction': dir})
                    .then( res => {
                        let cooldown = res.data.cooldown * 1000
                        setTimeout(() => {
                            return res.data
                        }, cooldown)
                        // return res.data
                    })
                    .catch( err => {
                        console.error(err)
                        return err.response
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