import React, { useState, useEffect } from 'react';

const CommandDisplay = props => {
    const [displayComm, setDisplayComm] = useState();

    function setScrollToBottom() {
        let el = document.querySelector(".shell")
        // console.log('scroll to bottom');
        setTimeout(() => { el.scrollTop = el.scrollHeight + 44}, 100)
    }

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
        // console.log("going to scroll to btm")
        setScrollToBottom();
        props.setInputText('')
    }, [props.inputText])

    return (
        <div className="comm-display">
            <div className="shell">
                <div>
                    {displayComm}
                </div>
            </div>
        </div>
    )
}

export default CommandDisplay;