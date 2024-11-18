import React from 'react';

import '../css/Welcome.css'

function Welcome({names, setNames, setReadyToStart}) {

    // Updates input fields of the player names

    const handleInputChange = (e) => {
        const index = e.target.id
        const updatedNames = [...names]
        updatedNames[index] = e.target.value.trim()
        setNames(updatedNames)
    }

    // generates inputs based on the number of names (players)

    let inputs = []
    const generateInputs = () => {
        for (let i=0; i<names.length; i++) {
            inputs.push(
                <input 
                autoComplete='off' 
                key={i}
                id={i}
                name={`player-${i+1}`} 
                onChange={handleInputChange} 
                className='welcomeNameInput' 
                placeholder={`Player ${i + 1} name`} 
                />
            )
        }
        return inputs
    }

    // Ensures that no names are empty before starting the game

    const handleFormSubmit = (e) => {
        e.preventDefault()
        if (names.includes('')) {
            alert('All names must be entered!')
        } else {
            setReadyToStart(true)
        }
    }

    // Increase or decrease amount of players

    const handleIncrease = () => {
        setNames([...names, ''])
    }

    const handleDecrease = () => {
        const updatedNames = [...names]
        updatedNames.pop()
        setNames(updatedNames)
    }

    return (
        <div className='welcomeContainer'>
            <h1 className='welcomeHeading'>Welcome to TLNC!</h1>
            <p className='welcomeSubheading'>How many players will be participating today?</p>
            <div className='welcomeAddRemoveContainer'>
                <button 
                disabled={names.length === 1}
                onClick={handleDecrease} 
                className='welcomeNumOfPlayersDecreaseBtn'>
                    -
                </button>
                <div className='welcomeInput'>{names.length}</div>
                <button 
                onClick={handleIncrease} 
                className='welcomeNumOfPlayersIncreaseBtn'>
                    +
                </button>
            </div>
            <form onSubmit={handleFormSubmit} className='formContainer'>
                <div className='welcomeInputContainer'>
                    {generateInputs()}
                </div> 
                <button className='welcomeStartGameBtn'>Enter the Casino!</button>
            </form>
        </div>
    );
}

export default Welcome;