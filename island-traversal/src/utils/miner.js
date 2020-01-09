import * as actions from './actions';
import * as util from './index';
import { sha256 } from 'js-sha256';

async function mineCoins() {
    let difficulty = 0;
    console.log("mine coins")

    ///*
    function valid_proof(last_hash, proof) {
        // console.log("difficulty", difficulty, "PROOF", proof)
        let thingToHash = encodeURI(last_hash + proof);
        let newProofHash = sha256(thingToHash)
        console.log("NEWPROOFHASH", newProofHash)


        let firstCheck = newProofHash.slice(0, difficulty);
        let checkAgainst = ''
        for(let i = 0; i < difficulty; i++) {
            checkAgainst += "0"
        }
        console.log("checkAgainst",checkAgainst,"firstCheck",firstCheck, "bool", checkAgainst === firstCheck)

        return firstCheck === checkAgainst
    }

    async function proof_of_work(last_proof) {
        // console.log('~~~~~~~~~~~~proof of work\n')
        let count = 0;
        let my_Rand = Math.random()
        let my_multi = Math.round(10000 * Math.random())
        let proof = my_Rand * my_multi
        console.log('proof', proof)
        let run = true
        while (run) {
            // console.log('PROOF',proof)
            let isValid = valid_proof(last_proof, proof)
            if (!isValid) {
                my_Rand = Math.random()
                my_multi = Math.round(10000 * Math.random())
                proof = my_Rand * my_multi
            } else {
                run = false;
                // console.log('THE PROOF', proof)
            }
            count++
            console.log("COUNT:",count)
            await util.delay(75);
            
        }
        console.log('PoW: found proof', proof)
        return proof
        // console.log(`Proof found: ${proof}`)
    }
    //*/
    for( let i=0; i < 1; i++) {
        let lastProofRes = await actions.getLastProof();
        let lastProof = lastProofRes.proof;
        difficulty = lastProofRes.difficulty;
        // console.log('the last proof',lastProofRes);

        let new_proof = await proof_of_work(lastProof);
        console.log('new proof',new_proof)
        let submittedProof = await actions.mineCoin(new_proof);
        console.log('submittedProof',submittedProof)
    }


}

export {
    mineCoins
}