import React, { useState, useEffect } from 'react';
import * as util from './utils';
import * as traversal_helpers from './utils/traversal_helpers';
import * as bsf_move from './utils/bfs_move'

function App() {
    const [inputText, setInputText] = useState();

    async function traverseMap() {
        // when traverseMap fires up check if we have curr room in localstorage
        // if not, fetch it from the api and set it in local storage

        // get room we are in from server
        // console.log("before currRm")
        let currRm = await util.info.getCurrRm(); // set timeout here
        let cooldown = currRm.cooldown * 1000;
        console.log(`Cooldown: ${currRm.cooldown}`);
        await util.delay(cooldown);
        while (!("room_id" in currRm)) {
            currRm = await util.info.getCurrRm();
            cooldown = currRm.cooldown * 1000;
            console.log(`Cooldown: ${currRm.cooldown}`);
            await util.delay(cooldown);
        }
        // console.log("after currRm", currRm)

        traversal_helpers.initialize(currRm)

        // create/store current room data that
        // we are in into the db (or not if exists)
        let rmRes = await util.info.createRm(currRm);
        // console.log('rmRes',rmRes)
        if(rmRes.status === 304) {
        //     console.log('update room')
            rmRes = await util.info.updateRoom(currRm);
        }

        // move if there are open rooms
        // for(let i = 0; i < 1; i++){
        while(true) {
            //update current room
            currRm = await util.info.getCurrRm();
            cooldown = currRm.cooldown * 1000;
            await util.delay(cooldown);

            cooldown = await traversal_helpers.movePlayer(currRm);
            console.log("COOLDOWN:", cooldown/1000);
            await util.delay(cooldown);
        }
    }
  
    traverseMap();

    return (
        <div className="App">
            <header className="App-header">
                <h1> Welcome </h1>
            </header>
        </div>
    );
}

export default App;
