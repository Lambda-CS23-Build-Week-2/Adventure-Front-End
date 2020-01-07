import * as util from './services';
import axios from 'axios';

const apiKey = process.env.REACT_APP_API_KEY;
const host = 'https://lambda-treasure-hunt.herokuapp.com/api'
const ourHost = 'https://adventure-island-cs23.herokuapp.com'

async function getCurrRm() {
    console.log('get current room', apiKey);
    return await util.axiosWithAuth().get(`${host}/adv/init/`)
                    .then( res => {
                        console.log(res);
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

async function createRm(room_id) {
    
}

export {
    getCurrRm,
    getRmDirections
}