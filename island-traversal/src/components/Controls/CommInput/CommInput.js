import React, { useState, useEffect } from 'react';

const CommandInput = props => {
    const [inputText, setInputText] = useState('');
    const [disabled, setDisabled] = useState(false);

    useEffect( () => {
        setDisabled(props.disableCommands);
    }, [props.disableCommands])

    // console.log("INPUT PROPS", props);
    const onSubmitHandler = e => {
        e.preventDefault();
        props.setInputText(inputText)
        setInputText('');
        return false;
    }

    const onChangeHandler = e => {
        e.preventDefault();
        setInputText(e.target.value);
        return false;
    }

    const autoOnClickHandler = () => {
        console.log("props.isAutoOn", props.isAutoOn)
        props.setIsAutoOn(!props.isAutoOn);
    }

    return (
        <div className="comm-input">
            <form onSubmit={onSubmitHandler}>
                <input disabled={disabled} type="text" id="commLine" placeholder="type 'help' for commands" onChange={onChangeHandler} value={inputText} />
                <input disabled={disabled} type="submit" value="Enter" />
            </form>
            <div onClick={autoOnClickHandler}>turn on auto-move</div>
        </div>
    )
}

export default CommandInput;