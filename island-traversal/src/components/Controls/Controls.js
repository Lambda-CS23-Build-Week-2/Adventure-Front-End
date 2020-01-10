import React, { useState, useEffect } from 'react';
import * as util from '../../utils/';
import * as traversal_helpers from '../../utils/traversal_helpers';
import * as bsf_move from '../../utils/bfs_move';

import CommDisplay from './CommDisplay/CommDisplay';
import CommInput from './CommInput/CommInput';

const ControlsDisplay = () => {
    const [currRmInfo, setCurrRmInfo] = useState();
    const [inputText, setInputText] = useState();
    const [disableCommands, setDisableCommands] = useState(false);
    const [isAutoOn, setIsAutoOn] = useState(false);

    useEffect( () => {
        async function startup() {
            let currRm = await util.info.getCurrRm(), cooldown = 0;
            console.log("CURRRM", currRm);
            if(currRm.status === 400) {
                setDisableCommands(true);
                setInputText(`Apologies, but there was an error that resulted in a cooldown of ${currRm.data.cooldown} sec(s).`)
                let cooldown = currRm.data.cooldown * 1000;
                console.log(`Cooldown: ${currRm.data.cooldown}`);
                await util.delay(cooldown);
            } else {
                cooldown = currRm.cooldown * 1000;
                console.log(`Cooldown: ${currRm.cooldown}`);
                await util.delay(cooldown);
            }
            if(currRm.status === 400) { setDisableCommands(false); }
            while (!("room_id" in currRm)) {
                currRm = await util.info.getCurrRm();
                cooldown = currRm.cooldown * 1000;
                console.log(`Initialize Cooldown: ${currRm.cooldown}`);
                await util.delay(cooldown);
            }
        
            traversal_helpers.initialize(currRm)
            setCurrRmInfo(currRm)
            setInputText(`${currRm.room_id}: ${currRm.title}\n${currRm.description}\n\nexits: ${currRm.exits} | cooldown: ${currRm.cooldown}sec(s)`)
        }
        
        startup();
    },[])

    async function autoMove(isOn) {
        let run = isOn;
        if(run) {
            console.log("START auto move")
            setDisableCommands(true);
            //update current room
            let currRm = await util.info.getCurrRm();
            let cooldown = currRm.cooldown * 1000;
            await util.delay(cooldown);
        
            while (run) {
                console.log("CURR ROOM",currRm, 'is run', run)
                currRm = await traversal_helpers.movePlayer(currRm);
                console.log('RETURNED ROOM',currRm);
                setInputText(`${currRm.room_id}: ${currRm.title}\n${currRm.description}\n\nexits: ${currRm.exits} | cooldown: ${currRm.cooldown}sec(s)`)
                cooldown = currRm.cooldown * 1000;
                console.log("COOLDOWN:", currRm.cooldown);
                await util.delay(cooldown);
                console.log("END WHILE LOOP")
            }
            setDisableCommands(false);
            console.log("END: auto move")
        }
    }


    useEffect( () => {
        let command = '', returnedRm = null;
        if( inputText ) {
            command = inputText.trim()
        }

        async function movePlayer(dir) {
            setDisableCommands(true);
            returnedRm = await traversal_helpers.moveDirection(currRmInfo, dir);
            // console.log('returnedRm', returnedRm);
            cooldown(returnedRm, 'You cannot go that way.');
        }

        async function pray() {
            setDisableCommands(true);
            returnedRm = await traversal_helpers.pray();
            cooldown(returnedRm, 'You pray, but nothing happens.');
        }

        async function gotoRm(rmNum) {
            setDisableCommands(true);
            let bfsPath = [];
            // console.log('bfsPath',bfsPath,'rmNum',rmNum)
            bfsPath = await bsf_move.bfs(currRmInfo.room_id, parseInt(rmNum));
            // console.log('bfsPath',bfsPath);
            bfsPath.shift();
            let tempCurrRm = currRmInfo;
            while(bfsPath.length > 0) {
                let nextRm = bfsPath.shift();
                returnedRm = await traversal_helpers.moveDirection(tempCurrRm, nextRm[0]);
                // console.log('returnedRm', returnedRm);
                if(currRmInfo.room_id === returnedRm.room_id) {
                    setInputText(`You cannot go that way.\n\n${returnedRm.room_id}: ${returnedRm.title}\n${returnedRm.description}\n\nexits: ${returnedRm.exits} | cooldown: ${returnedRm.cooldown}sec(s)`)
                } else {
                    setInputText(`${returnedRm.room_id}: ${returnedRm.title}\n${returnedRm.description}\n\nexits: ${returnedRm.exits} | cooldown: ${returnedRm.cooldown}sec(s)`);
                };
                tempCurrRm = returnedRm;
                await util.delay(returnedRm.cooldown * 1000);
            }
            setCurrRmInfo(returnedRm);
            setDisableCommands(false);
        }

        function displayHelp() {
            setInputText(`Commands:\nnorth / south / east / west : Walk in direction\npray : pray at a shrine\n`)
        }

        async function cooldown(returnedRm, error) {
            // console.log('returnedRm', returnedRm);
            if(currRmInfo.room_id === returnedRm.room_id) {
                setInputText(`${error}\n\n${returnedRm.room_id}: ${returnedRm.title}\n${returnedRm.description}\n\nexits: ${returnedRm.exits} | cooldown: ${returnedRm.cooldown}sec(s)`)
            } else {
                setCurrRmInfo(returnedRm);
                setInputText(`${returnedRm.room_id}: ${returnedRm.title}\n${returnedRm.description}\n\nexits: ${returnedRm.exits} | cooldown: ${returnedRm.cooldown}sec(s)`);
            };
            await util.delay(returnedRm.cooldown * 1000);
            setDisableCommands(false);
        }
        // console.log('COMMAND',command)
        if (command.length === 1) { movePlayer(command); }
        else if (command.length > 1) {
            command = command.split(' ');
            switch(command[0]) {
                case "north":
                    movePlayer('n');
                    break;
                case "south":
                    movePlayer('s');
                    break;
                case "east":
                    movePlayer('s');
                    break;
                case "west":
                    movePlayer('w');
                    break;
                case "help":
                    displayHelp();
                    break;
                case "pray":
                    pray();
                    break;
                case "goto":
                    gotoRm(command[command.length-1]);
                    break;
                case "auto":
                    setIsAutoOn(!isAutoOn);
                    break;
                default:
                    break;
            }
        }

    }, [inputText])

    // console.log("CurrRmInfo", currRmInfo);
    // console.log("CONTROL INPUT TEXT",inputText)
    // console.log('isAutoOn', isAutoOn)

    return(
        <div id="controls">
            <CommDisplay inputText={inputText} currRmInfo={currRmInfo} setInputText={setInputText} />
            <CommInput setInputText={setInputText} disableCommands={disableCommands} setIsAutoOn={setIsAutoOn} autoMove={autoMove} />
        </div>
    )
}

/*
async function traverseMap() {
    // when traverseMap fires up check if we have curr room in localstorage
    // if not, fetch it from the api and set it in local storage

    // get room we are in from server
    // console.log("before currRm")

    // create/store current room data that
    // we are in into the db (or not if exists)
    let rmRes = await util.info.createRm(currRm);
    // console.log('rmRes',rmRes)
    if (rmRes.status === 304) {
        //     console.log('update room')
        rmRes = await util.info.updateRoom(currRm);
    }

    /*
    // console.log('bfs path')
    // // Traversal to Given Destination
    let bfsPath = await bsf_move.bfs(currRm.room_id, 486)
    // console.log(bfsPath, 'path for bfs')

    traversal_helpers.moveDestination(bfsPath)
    //*/

    //mine function
    //  miner.mineCoins()

    /*
    // move if there are open rooms
    // for(let i = 0; i < 1; i++){
    while (true) {
        //update current room
        currRm = await util.info.getCurrRm();
        cooldown = currRm.cooldown * 1000;
        await util.delay(cooldown);

        cooldown = await traversal_helpers.movePlayer(currRm);
        console.log("COOLDOWN:", cooldown / 1000);
        await util.delay(cooldown);
    }//*/
//}
//*/

// traverseMap();

export default ControlsDisplay;