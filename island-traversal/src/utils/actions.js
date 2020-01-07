import * as util from './services';

const host = 'https://lambda-treasure-hunt.herokuapp.com/api';

async function moveDir(d) {
    console.log('we are at move dir');
    return await util.axiosWithAuth().post(`${host}/adv/move/`)
                    .then( res => {
                        return res.data
                    })
                    .catch( err => {
                        console.error(err)
                    })
}

export {
    moveDir
}