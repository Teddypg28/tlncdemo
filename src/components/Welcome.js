import React from 'react';

import '../css/Welcome.css'

function Welcome({numOfPlayers, setNumOfPlayers, names, setNames, setReadyToStart}) {

    console.log(names)

    const handleInputChange = (e) => {
        setNames({...names, [e.target.name]: e.target.value})
    }

    let inputs = []
    const generateInputs = () => {
        for (let i=0; i<numOfPlayers; i++) {
            inputs.push(<input autoComplete='off' key={i+1} name={`player-${i+1}`} onChange={handleInputChange} className='welcomeNameInput' placeholder={`Player ${i + 1} name`} />)
        }
        return inputs
    }

    const handleFormSubmit = (e) => {
        const keys = Object.keys(names)
        if (inputs.length !== keys.length) {
            alert('All names must be entered in order to enter the casino!')
            e.preventDefault()
        } else {
            setReadyToStart(val => !val)
            e.preventDefault()
        }
    }

    const handleIncrease = () => {
        setNumOfPlayers(numOfPlayers + 1)
    }

    const handleDecrease = () => {
        if (numOfPlayers !== 1) {
            delete names[`player-${numOfPlayers}`]
            setNumOfPlayers(numOfPlayers - 1)

        } 
    }

    return (
        <div className='welcomeContainer'>
            <h1 className='welcomeHeading'>Welcome to TLNC!</h1>
            <p style={{fontSize: 23, marginTop: 7}}>How many players will be participating today?</p>
            <div className='welcomeAddRemoveContainer'>
                <div onClick={handleDecrease} className='welcomeNumOfPlayersDecreaseBtn'>-</div>
                <div className='welcomeInput'>{numOfPlayers}</div>
                <div onClick={handleIncrease} className='welcomeNumOfPlayersIncreaseBtn'>+</div>
            </div>
            {numOfPlayers !== '' && numOfPlayers !== '0' &&
            <form onSubmit={handleFormSubmit} style={{width: 500}}>
                <div className='welcomeInputContainer'>
                    {generateInputs()}
                </div> 
                <button className='welcomeStartGameBtn'>Enter the Casino!</button>
            </form>
            }
        </div>
    );
}

export default Welcome;