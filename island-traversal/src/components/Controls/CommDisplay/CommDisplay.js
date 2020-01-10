import React, { useState, useEffect } from 'react';

const CommandDisplay = props => {
    const [displayComm, setDisplayComm] = useState();

    useEffect( () => {
        let newCommands =''
        if (displayComm && props.inputText) {
            newCommands = `${displayComm}\n\n${props.inputText}`;
        } else if (displayComm) {
            newCommands = `\n\n${displayComm}`;
        } else if (props.inputText) {
            newCommands = `\n\n${props.inputText}`;
        }
        setDisplayComm(newCommands);
        props.setInputText('')
    }, [props.inputText])

    return (
        <div className="comm-display">
            <div>
                {displayComm}
            </div>
        </div>
    )
}

export default CommandDisplay;