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

async function getRmDirections(dir) {
    return await axios.post(`${ourHost}/rooms/directions/`, {'directions': dir})
                    .then( res => {
                        console.log(res)
                    })
                    .catch( err => {
                        console.error(err)
                    })
}

export {
    getCurrRm,
    getRmDirections
}