import React, { useState, useEffect } from 'react';
import { Graph } from "react-d3-graph";
import * as util from '../utils';

import '../scss/App.scss'
import '../scss/Rooms.scss'

function Rooms() {
    const [allRooms, setAllRooms] = useState()

    const config = {
        nodeHighlightBehavior: true,
        staticGraph: true,
        node: {
            color: "white",
            size: 300,
            highlightStrokeColor: "blue",
            renderLabel: true,
        },
        link: {
            highlightColor: "lightblue",
        },
    };


    useEffect(() => {
        async function getRooms() {
            try {
                let getAllRm = await util.info.getAllRm()
                console.log('get All Room', getAllRm)
                const arr = []
                const data = {
                    nodes: [],
                    links: []
                }
                for (let [key, value] of Object.entries(getAllRm)) {
                    arr.push(value)
                    let coordArray = value.coordinates.slice(1, value.coordinates.length - 1).split(',')

                    data.nodes.push({
                        id: String(value.room_id),
                        x: parseInt(coordArray[0] * 10),
                        y: parseInt(coordArray[1] * 10)
                    })
                    // console.log('key', key)
                    // console.log('value', value)


                    if (value.dir['south']) {
                        data.links.push({ source: String(value.room_id), target: String(value.dir['south']) })
                    }

                    if (value.dir['north']) {
                        data.links.push({ source: String(value.room_id), target: String(value.dir['north']) })
                    }

                    if (value.dir['east']) {
                        data.links.push({ source: String(value.room_id), target: String(value.dir['east']) })
                    }

                    if (value.dir['west']) {
                        data.links.push({ source: String(value.room_id), target: String(value.dir['west']) })
                    }

                }
                setAllRooms(data)
            }

            catch (err) {
                console.log(err)
            }
        }
        getRooms()


    }, [])

    return (
        <div className='map-container'>
            {console.log('all Rooms', allRooms)}
            {allRooms ? <Graph
                style={{ border: "1px solid red" }}
                id="graph-id"
                data={allRooms}
                config={config}
            />
                : null}
        </div>
    )
}

export default Rooms

