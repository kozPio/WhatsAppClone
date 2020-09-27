import { Button } from '@material-ui/core'
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import setInput from './actions/settingInput';
import './scss/EmojiArray.scss';





function EmojiArray({ emojis }) {

    const input = useSelector(state => state.input);
    const dispatcher = useDispatch();





    return (
        <div className="emoji">
            {emojis && emojis.map((emoji, index) => (
                <Button key={index} className="emoji__container" onClick={() => dispatcher(setInput(input + emojis[index]))}>{emoji}</Button>
            ))
            }
        </div >
    )
}

export default EmojiArray
