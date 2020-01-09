import React, { useEffect } from "react";



// display to user current room details
    // curr room
// display form with input field

export default (props) => {
    console.log("Display props : ", props);
    console.log("Display props.room : ", props.room);

    // query api for data
    // set it to state

    if (!props.room){
        return <div>Hold on brah</div>
    }

     

    return(
        <div>
            <div>title : {props.room.title} </div>
            <div>room id: {props.room.room_id}</div>
            <div>description: {props.room.description}</div>
            <div>items: {props.room.items}</div>
            <div>exits: {props.room.exits}</div>
            <div>cooldown: {props.room.cooldown}sec</div>
        </div>
    )







}