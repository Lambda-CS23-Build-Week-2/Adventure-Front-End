import React, { useState, useEffect } from 'react';
import * as util from '../utils';

function Rooms() {
    const [allRooms, setAllRooms] = useState([])


    useEffect(async () => {
        let getAllRm = await util.info.getAllRm()
        setAllRooms(getAllRm)
    }, [])

    console.log(allRooms, 'all Rooms')

    return (
        <div>
            {
                allRooms.map(room =>
                    <div className={room.room_id}>{room.title} </div>)
            }
        </div>
    )
}

export default Rooms